// conpuesto del reducer
//actrions -> describen que es l oque apssa en la app
// estado inicial -> valor de incio
// llamda de las acciones

import { Activity } from "../types/main";

//funciones de logica
export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      type: "restart-app";
    };
//tipado del estate inicial
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

//verificaicon en localStorage

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};
//state inicial
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

//esta esa la funcio nque se encarga de manejar la logica complicada del state
//esto lo hace segun el type que se tenga disponible
//manejasmo copias del state SIEMPRE
export const activityReducer = (
  state: ActivityState = initialState,
  actions: ActivityActions
) => {
  if (actions.type === "save-activity") {
    let updatedActivity: Activity[] = [];
    if (state.activeId) {
      updatedActivity = state.activities.map((activity) => {
        return activity.id === state.activeId
          ? actions.payload.newActivity
          : activity;
      });
    } else {
      updatedActivity = [...state.activities, actions.payload.newActivity];
    }

    return {
      ...state,
      activities: updatedActivity,
      activeId: "",
    };
  }

  if (actions.type === "set-activeId") {
    return {
      ...state,
      activeId: actions.payload.id,
    };
  }

  if (actions.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== actions.payload.id
      ),
    };
  }

  if (actions.type === "restart-app") {
    return {
      ...state,
      activities: [],
      activeId: "",
    };
  }

  return state;
};
