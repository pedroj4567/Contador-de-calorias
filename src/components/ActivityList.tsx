import { Activity, ActivityListProps } from "../types/main";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const getCategoryName = (category: Activity["category"]) => {
    return categories.map((cat) => {
      return cat.id === category ? cat.name : "";
    });
  };

  const categoryName = useMemo(() => getCategoryName, []);

  const isEmptyActivities = useMemo(
    () => activities.length === 0,
    [activities]
  );

  return (
    <>
      <h2 className="text-center mt-4 text-4xl font-bold text-slate-600">
        Comida y Actividades
      </h2>

      {isEmptyActivities ? (
        <p className="text-center mt-8">No hay actividades aun....</p>
      ) : (
        activities.map((activity) => {
          return (
            <div
              key={activity.id}
              className="px-5 py-10 bg-white mt-7 flex justify-between border border-slate-50 shadow-lg"
            >
              <div className=" space-y-2 relative">
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 shadow-2xl text-white uppercase font-bold ${
                    activity.category === 1 ? "bg-lime-500" : "bg-orange-600"
                  }`}
                >
                  {categoryName(+activity.category)}
                </p>
                <p className="text-2xl fonto-bold pt-5 font-black">
                  {activity.name}
                </p>
                <p className="font-black text-4xl text-lime-500">
                  {activity.calories} {""}
                  <span>Calorias</span>
                </p>
              </div>

              <div className="flex gap-5 items-center">
                <button
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: {
                        id: activity.id,
                      },
                    })
                  }
                >
                  <PencilSquareIcon className="h-8 w-8  text-gray-800" />
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: {
                        id: activity.id,
                      },
                    })
                  }
                >
                  <XCircleIcon className="h-8 w-8  text-red-500" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};
