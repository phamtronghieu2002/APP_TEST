import TablePagination from "@/pages/Home/components/TablePagination/TablePagination";
import { myContext } from "@/pages/Home/context/DataProvider";
import { FunctionComponent, useContext, useEffect } from "react";

interface Props {}

const TableInfinityScroll: FunctionComponent<Props> = () => {
  const { state, dispatch } = useContext(myContext);
  useEffect(() => {
    // this code on github issue :https://github.com/ant-design/ant-design/issues/5904#issuecomment-333819256
    const node = document.querySelector<HTMLElement>(".tab1 .ant-table-body");

    if (node) {
      node.addEventListener("scroll", () => {
        const perc =
          (node.scrollTop / (node.scrollHeight - node.clientHeight)) * 100;

        if (perc >= 100) {
          if (!state.filter.role && !state.q) {
            dispatch({
              type: "SET_CURRENT_PAGE",
              payload: state.pagination.current + 1,
            });
          }
        }
      });
    }
    return () => {
      node?.removeEventListener("scroll", () => {});
    };
  });
  return <TablePagination pagination={false} className="tab1" isInfinityScroll />;
};

export default TableInfinityScroll;
