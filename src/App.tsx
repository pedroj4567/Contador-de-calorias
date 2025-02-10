import { Form } from "./components/Form";
import { useEffect, useMemo, useReducer } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import { ActivityList } from "./components/ActivityList";
import { CalorieTracker } from "./components/CalorieTracker";
function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(
    () => state.activities.length > 0,
    [state.activities]
  );
  return (
    <>
      <header className="bg-lime-600 py-6 md:py-5 md:px-5">
        <div className=" min-w-[220px] max-w-4xl mx-auto block md:flex  md:justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorias
          </h1>

          <div className="flex justify-center py-2">
            <button
              disabled={!canRestartApp}
              className=" p-2 rounded-2xl bg-white font-black   cursor-pointer hover:bg-orange-400 transition-all ease-in hover:text-white disabled:opacity-20 disabled:cursor-not-allowed "
              onClick={() => {
                dispatch({ type: "restart-app" });
              }}
            >
              Reiniciar Contador
            </button>
          </div>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className="bg-slate-700 py-25 px-5">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={state.activities} />
        </div>
      </section>

      <section className=" p-10 mx-auto max-w-4xl  ">
        <div>
          <ActivityList activities={state.activities} dispatch={dispatch} />
        </div>
      </section>
    </>
  );
}

export default App;
