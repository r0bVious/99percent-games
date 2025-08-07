const RainbowPillar = ({ isSpinning }: { isSpinning: boolean }) => {
  return (
    <div
      className={`w-3 rounded-full transition-all duration-300 ${
        isSpinning
          ? "bg-[linear-gradient(to_bottom,_red,_orange,_yellow,_green,_blue,_indigo,_violet,_indigo,_blue,_green,_yellow,_orange,_red)] bg-[length:100%_400%] animate-[var(--animate-rainbowDown)]"
          : "bg-gray-600"
      }`}
    />
  );
};

export default RainbowPillar;
