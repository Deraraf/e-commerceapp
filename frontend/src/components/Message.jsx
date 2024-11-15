import PropTypes from "prop-types";

const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-green-500 text-white";
    }
  };
  return (
    <div className={`p-4 rounded-lg ${getVariantClass()}`}>{children}</div>
  );
};

Message.propTypes = {
  variant: PropTypes.oneOf(["success", "error", "warning", "info"]),
  children: PropTypes.node.isRequired,
};

export default Message;
