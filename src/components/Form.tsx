import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import { Activity } from "../types/main";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

export const Form = ({ dispatch, state }: FormProps) => {
  //buena idea para maenjar el state al comienzo

  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  //validamos para que no se renderice a cada rato
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  //nueva manera para manejar el state de multiples campos de un formulario
  const handlerChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValid = (): boolean =>
    activity.name.trim() !== "" && activity.calories > 0;

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "save-activity",
      payload: {
        newActivity: activity,
      },
    });

    resetForm();
  };

  const resetForm = () =>
    setActivity({
      ...initialState,
      id: uuidv4(),
    });

  return (
    <form
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handlerSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category">Categoria: </label>
        <select
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white "
          value={activity.category}
          onChange={handlerChange}
        >
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity" className="font-bold">
          Actividad:{" "}
        </label>
        <input
          type="text"
          id="name"
          placeholder="Ej: Comida, Jugo de Naranja, Pesas, Bicicleta, etc.."
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.name}
          onChange={handlerChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:{" "}
        </label>
        <input
          type="number"
          id="calories"
          placeholder="Calorias. Ej: 300 o 500"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.calories}
          onChange={handlerChange}
        />
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValid()}
        className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer text-sm md:text-lg whitespace-break-spaces disabled:bg-gray-400  disabled:cursor-not-allowed"
      />
    </form>
  );
};
