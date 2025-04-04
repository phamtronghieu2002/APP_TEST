import TableC from "@/components/TableC/TableC";
import showNotify from "@/untils/notify";
import { filterList } from "@/constants";
import { TableProps } from "antd";
import {
  columns,
  UserDataTableType,
} from "@/pages/Home/components/TablePagination/column";
import DataProvider, {
  initialState,
  myContext,
} from "@/pages/Home/context/DataProvider";
import { FC, useContext, useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import TablePagination from "./components/TablePagination/TablePagination";
import TableInfinityScroll from "./components/TableInfinityScroll/TableInfinityScroll";
const Home: FC = () => {
  const { state, dispatch } = useContext(myContext);




  useEffect(() => {
    if (state.isError) {
      showNotify("Error when loading data !", "error");
    }
  }, [state.isError]);

  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "Table Pagination",
      children: <TablePagination className="tab0" />,
    },
    {
      key: "1",
      label: "Table Virtual Scroll",
      children: <TableInfinityScroll />,
    },
  ];
  return (
    <div className="home-page">
      <Tabs
        onChange={(key) => {
    
          dispatch({ type: "RESET_STATE", payload: initialState });
          dispatch({ type: "SET_TAB", payload: key });
        }}
        items={items}
      />
    </div>
  );
};

export default () => {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
};
