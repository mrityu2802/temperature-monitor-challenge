import { useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import GetStatus from "./components/GetStatus";
import Loader from "./components/Loader";

const App = () => {
  const [currentReading, setCurrentReading] = useState(null);
  const [lastReadings, setLastReadings] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => setConnectionStatus(true));
    socket.on("disconnect", () => setConnectionStatus(false));

    socket.on("temperature_reading", (reading) => {
      setCurrentReading(reading);
    });

    socket.on("rocords", (records) => {
      console.log(records);
      setLastReadings(records);
    });

    socket.on("processed_reading", (processedReading) => {
      setCurrentReading(processedReading);
    });

    return () => {
      socket.disconnect();
      clearTimeout();
    };
  }, []);

  return (
    <div className="bg-slate-100 h-screen p-8 flex flex-col gap-4 overflow-auto">
      <div className="flex items-center justify-between px-4">
        <h1 className="font-bold text-2xl">Temperature Monitor</h1>
        <div className="flex items-center gap-2">
          {connectionStatus ? (
            <>
              <div className="size-4 rounded-full bg-green-400"></div>
              <span>Connected</span>
            </>
          ) : (
            <>
              <div className="size-4 rounded-full bg-red-400"></div>
              <span>Disconnected</span>
            </>
          )}
        </div>
      </div>
      {/* card */}

      <div className=" w-full shadow-lg min-h-[15rem] rounded-sm flex flex-col items-center p-8 gap-4 overflow-auto">
        <span className="text-slate-400 font-semibold text-xl">
          Current Temperature
        </span>
        {currentReading ? (
          <>
            <h3 className="font-bold text-5xl">
              {currentReading?.temperature}°C
            </h3>
            <div className="flex gap-2 flex-wrap">
              <span className="font-semibold text-green-500">NORMAL</span>•
              <span>
                Last updated: {moment(currentReading?.timestamp).fromNow()}
              </span>
            </div>
          </>
        ) : (
          <Loader className={"size-12"} />
        )}
      </div>

      {/* ... other components */}
      <div className="shadow-lg py-3 rounded-sm flex flex-col gap-4 h-full min-h-[20rem] overflow-auto">
        <div className="font-bold px-4 text-xl border-b border-gray-300 py-3">
          Recent Readings
        </div>
        <ul className="px-4 flex flex-col gap-2 h-full">
          {lastReadings.map((reading) => (
            <li
              className="flex-1 flex items-center max-h-[6rem] justify-between px-4 py-2 bg-slate-300/20 rounded-xs"
              key={reading.id}
            >
              <div>
                <h4 className="font-semibold text-xl">
                  {reading.temperature}°C
                </h4>
                <span className="text-sm text-slate-400">
                  {moment(reading.processedAt).fromNow()}
                </span>
              </div>
              {reading?.status ? (
                <GetStatus status={reading.status} />
              ) : (
                <Loader className={"size-5"} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
