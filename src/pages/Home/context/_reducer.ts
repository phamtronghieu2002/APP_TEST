import { Iaction } from "@/pages/Home/context/_actions";
import { Istate } from "@/pages/Home/context/DataProvider";

const reducer = (state: Istate, action: Iaction) => {
  switch (action.type) {
    case "SET_Q":
      return { ...state, q: action.payload };
    case "SET_LIMIT":
      return {
        ...state,
        pagination: { ...state.pagination, limit: action.payload },
      };
    case "SET_OFFSET":
      return {
        ...state,
        pagination: { ...state.pagination, offset: action.payload },
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        pagination: { ...state.pagination, current: action.payload, offset: (action.payload-1) * state.pagination.limit },
      };

    case "SET_DATA":
      return { ...state, data: action.payload };

    case "SET_TAB":
      return { ...state, tab: action.payload };

    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };

    case "RESET_STATE":
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
