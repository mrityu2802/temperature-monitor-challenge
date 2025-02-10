import PropTypes from "prop-types";
import Loader from "./Loader";

const GetStatus = ({ status, card }) => {
  if (!status) return <Loader className={"size-5"} />;
  return (
    <span
      className={`rounded-full font-semibold ${card ? "" : "p-2"} ${
        status === "HIGH"
          ? `text-yellow-500 ${card ? "" : "bg-yellow-300/20"}`
          : `text-green-500 ${card ? "" : "bg-green-300/20"}`
      }`}
    >
      {status}
    </span>
  );
};

GetStatus.propTypes = {
  status: PropTypes.oneOf(["HIGH", "NORMAL", undefined]).isRequired,
  card: PropTypes.bool.isRequired,
};

export default GetStatus;
