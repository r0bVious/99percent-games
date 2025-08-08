import { motion } from "motion/react";

interface ModalProps {
  gameName: string;
  modalInfo: { win: boolean; message: string } | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      opacity: { ease: "linear" as const },
      scale: { type: "spring" as const, stiffness: 500 },
      y: { type: "spring" as const, stiffness: 500 },
    },
  },
  exit: { opacity: 0, scale: 0.95, y: -15 },
};

const Modal: React.FC<ModalProps> = ({ gameName, modalInfo, onClose }) => {
  return (
    <motion.div
      className="absolute inset-0 size-full bg-black/25 backdrop-blur-[1.5px] flex justify-center items-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="flex flex-col justify-between items-center text-center bg-white h-3/5 w-2/3 border-2 rounded-lg overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="w-full bg-gray-700 p-2 text-white text-2xl font-bold">
          {gameName}
        </h1>
        <div className="flex flex-col p-4 flex-grow justify-center gap-2">
          <h2 className="text-xl animate-pulse">
            {modalInfo?.win ? "You won!" : "You lose!"}
          </h2>
          <div>{modalInfo?.message}</div>
        </div>
        <button
          className="px-8 py-4 bg-blue-500 text-white border-2 border-white rounded-lg mb-4"
          onClick={onClose}
        >
          Confirm
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
