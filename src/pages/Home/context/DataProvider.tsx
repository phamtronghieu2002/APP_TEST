import userApis from "@/apis/userAPIs";
import { Iaction } from "@/pages/Home/context/_actions";
import reducer from "@/pages/Home/context/_reducer";
import { Iuser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useReducer } from "react";

export interface Icontext {
  dispatch: (action: Iaction) => void;
  state: Istate;
}

export interface Istate {
  q: string;
  data: any;
  isLoading: boolean;
  isError: boolean;
  tab: string;
  pagination: {
    limit: number;
    offset: number;
    total: number;
    current: number;
  };
  filter: {
    role: string;
  };
}

export const initialState: Istate = {
  q: "",
  isLoading: false,
  isError: false,
  tab: "0",
  pagination: {
    limit: 10,
    offset: 0,
    total: 0,
    current: 1,
  },
  filter: {
    role: "",
  },

  data: [],
};

export const myContext = React.createContext<Icontext>({
  state: initialState,
  dispatch: () => {},
});

const processData = (data: any): Iuser[] => {
  return data
    ? data?.map((item: any) => ({
        key: item.id,
        id: item.id,
        name: item.firstName,
        email: item.email,
        status: item.age > 30,
        balance: item.age,
        role: item.role,
        gender: item.gender,
        registerAt: item.birthDate,
      }))
    : [];
};

interface AuthProviderProps {
  children: React.ReactNode;
}
const DataProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "users",
      state.pagination.offset,
      state.pagination.limit,
      state.q,
      state.filter.role,
      state.tab,
    ],

    queryFn: () => {
      if (state.filter.role) {
        return userApis.filterUser({
          q: state.q,
          key:
            Object.keys(state.filter).find(
              (key) => state.filter[key] === state.filter.role
            ) || "",
          value: state.filter.role || state.filter.gender,
        });
      }
      return userApis.getUser({
        limit: state.pagination.limit,
        offset: state.pagination.offset,
        q: state.q,
      });
    },
  });
  console.log("state", state);
  useEffect(() => {
    const dataProcess = processData(data?.users);

    if (state.tab == "1") {
      if (state.filter.role || state.q) {
        return dispatch({ type: "SET_DATA", payload: dataProcess });
      }
      return dispatch({
        type: "SET_DATA",
        payload: [...state.data, ...dataProcess],
      });
    }
    return dispatch({ type: "SET_DATA", payload: dataProcess });
  }, [data]);

  return (
    <myContext.Provider
      value={{
        state: {
          ...state,

          isLoading: isLoading,
          isError: isError,
          pagination: {
            ...state.pagination,
            total: data?.total ?? 0,
          },
        },
        dispatch,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default DataProvider;
