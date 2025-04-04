import { columns } from "@/pages/Home/components/TablePagination/column";
import TableC from "@/components/TableC/TableC";
import { UserDataTableType } from "@/pages/Home/components/TablePagination/column";
import { myContext } from "@/pages/Home/context/DataProvider";
import { TableProps } from "antd";
import { FC, useContext } from "react";
import { filterList } from "@/constants";

interface TablePaginationProps {
    components?:any
    pagination?:boolean
    className?:string
}
 
const TablePagination: FC<TablePaginationProps> = ({components,pagination=true,className}) => {

    const { state, dispatch } = useContext(myContext);

    const users = state.data;
   



    
  const rowSelection: TableProps<UserDataTableType>["rowSelection"] = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: UserDataTableType[]
    ) => {
   
    },
    getCheckboxProps: (record: UserDataTableType) => ({
      name: record.name,
    }),
  };

  const onFilter = (label: string, value: string) => {
    dispatch({ type: "SET_FILTER", payload: { [label]: value } });
  };
    return ( 


        <TableC
        className={className}
        style={{ height: "460px" }}
        loading={state.isLoading}
        scroll={{
          y: 460,
          x: "max-content",
          scrollToFirstRowOnChange: false,
        }}
        pagination={pagination ?{
            className: "mt-4",
            total: state.pagination.total,
            current: state.pagination.current,
            pageSize: state.pagination.limit,
            onChange: (page) => {
              dispatch({ type: "SET_CURRENT_PAGE", payload: page });
              dispatch({
                type: "SET_OFFSET",
                payload: (page - 1) * state.pagination.limit,
              });
            },
            onShowSizeChange: (current, pageSize) => {
              dispatch({ type: "SET_LIMIT", payload: pageSize });
            },
          }:{}}
        search={{
          onSearch: (value) => {
            dispatch({ type: "SET_Q", payload: value });
          },
          width: 300,
          placeholder: "Search by name or email",
        
        }}
        filter={{
          filterList: filterList,
          title: "Filter By",
          trigger: "click",
          onFilter: onFilter,
        }}
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={users}
        components={components}
      />
     );
}
 
export default TablePagination;