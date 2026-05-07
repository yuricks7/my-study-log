export const initialState = {
  list: [],
  title: "",
  time: 0,
  sum: 0
};

export function studyLogReducer(state, action) {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };

    case "SET_TIME":
      return { ...state, time: action.payload };

    case "SET_LIST":
      return { ...state, list: action.payload };

    case "ADD":
      return { ...state, list: [...state.list, action.payload] };

    case "UPDATE":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        )
      };

    case "DELETE":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload)
      };

    case "CALC_SUM":
      return {
        ...state,
        sum: state.list.reduce((s, r) => s + r.time, 0)
      };

    default:
      return state;
  }
}