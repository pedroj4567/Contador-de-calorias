import { useMemo } from "react";
import { CaloriesTrackerProps } from "../types/main";
import { CalorieseDisplay } from "./CaloriieDisplay";

export const CalorieTracker = ({ activities }: CaloriesTrackerProps) => {
  const caloriesConsumend = useMemo(
    () =>
      activities.reduce((acc, activity) => {
        return activity.category === 1 ? acc + activity.calories : acc;
      }, 0),
    [activities]
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce((acc, activity) => {
        return activity.category === 2 ? acc + activity.calories : acc;
      }, 0),
    [activities]
  );

  const netCalories = useMemo(
    () => caloriesConsumend - caloriesBurned,
    [caloriesConsumend, caloriesBurned]
  );
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center mb-8">
        Resumen de calorias:
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 ">
        <CalorieseDisplay calories={caloriesConsumend} message="Consumidas" />
        <CalorieseDisplay calories={caloriesBurned} message="Quemadas" />
        <CalorieseDisplay calories={netCalories} message="Diferencia" />
      </div>
    </>
  );
};
