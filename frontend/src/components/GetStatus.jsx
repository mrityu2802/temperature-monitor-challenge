import PropTypes from "prop-types";
import Loader from "./Loader";

const GetStatus = ({ status }) => {
  if (!status) return <Loader className={"size-5"} />;
  return (
    <span
      className={`p-2 rounded-full ${
        status === "HIGH"
          ? "text-yellow-600 bg-yellow-300/20"
          : "text-green-600 bg-green-300/20"
      }`}
    >
      {status}
    </span>
  );
};

GetStatus.propTypes = {
  status: PropTypes.oneOf(["HIGH", "NORMAL", undefined]).isRequired,
};

export default GetStatus;
