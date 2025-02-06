import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";

const Loader = ({ className }) => {
  return (
    <div>
      <Loader2 className={`animate-spin ${className}`} />
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
