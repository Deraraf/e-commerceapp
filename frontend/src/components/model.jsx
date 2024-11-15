import PropsTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50">
            <div className="absolute top-[45%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
              <button
                className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
                onClick={onClose}
              >
                X
              </button>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropsTypes.bool.isRequired,
  onClose: PropsTypes.func.isRequired,
  children: PropsTypes.node.isRequired,
};

export default Modal;
