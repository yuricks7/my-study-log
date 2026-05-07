import {
  SET_TITLE,
  SET_TIME,
  LOGS_REPLACED,
  LOG_ADDED,
  LOG_UPDATED,
  LOG_REMOVED,
  FORM_RESET,
  UPDATE_START,
  UPDATE_END
} from "./actions";

import { updateList, calcSum } from "./utils";
import { initialState } from "./initialState";

export function studyLogReducer(state, action) {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.title };

    case SET_TIME:
      return { ...state, time: action.time };

    case LOGS_REPLACED:
    case LOG_ADDED:
    case LOG_UPDATED:
    case LOG_REMOVED: {
      const newList = updateList(state.list, action);
      return { ...state, list: newList, sum: calcSum(newList) };
    }

    case FORM_RESET:
      return {...state, title: "", time: 0};

    case UPDATE_START:
      return { ...state, isUpdating: true };

    case UPDATE_END:
      return { ...state, isUpdating: false };

    default:
      return state;
  }
}