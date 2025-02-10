import { Dispatch } from "react";
import { ActivityActions } from "../reducers/activity-reducer";

export interface Category {
  id: number;
  name: string;
}

export type Activity = {
  id: string;
  category: number;
  name: string;
  calories: number;
};

export type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export type CaloriesTrackerProps = {
  activities: Activity[];
};
