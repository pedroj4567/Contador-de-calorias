type CalorieDisplayProps = {
  calories: number;
  message: string;
};

export const CalorieseDisplay = ({
  calories,
  message,
}: CalorieDisplayProps) => {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">
      <span className="font-black text-6xl  text-orange ">{calories}</span>
      {message}
    </p>
  );
};
