import { FC, useEffect, useState } from "react";
import { Input, Table, TableProps } from "antd";
import { Pagination } from "antd";
import { useDebounce } from "use-debounce";
import { CiSearch } from "react-icons/ci";
import { FilterList } from "@/components/Filter.tsx/Filter";
import Filter from "@/components/Filter.tsx/Filter";

interface TableCprops<T> extends TableProps<T> {
  className?: string;
  pagination?: {
    className?: string;
    total?: number;
    current?: number;
    pageSize?: number;
    onChange?: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
    onShowSizeChange?: (current: number, pageSize: number) => void;
  };
  search?: {
    onSearch: (value: string) => void;
    onReset?: () => void;
    placeholder?: string;
    width?: number;
    value?: string;
  };
  filter?: {
    filterList: FilterList[];
    title: string;
    trigger: "click" | "hover" | "focus";
    onFilter: (label: string, value: string) => void;
  };
}
const TableC: FC<TableCprops<any>> = ({
  className,
  dataSource,
  columns,
  size = "large",
  ...props
}) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    props.search?.onSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <div className="actions flex justify-end mb-4">
        <div className="flex gap-2 ">
          {props.filter && (
            <Filter
              title={props.filter.title}
              trigger={props.filter.trigger}
              filterList={props.filter.filterList}
              onFilter={props.filter.onFilter}
            />
          )}

          {props.search && (
            <div
              style={{
                width: `${props.search.width || 200}px`,
              }}
              className={`flex justify-end relative items-center`}
            >
              <Input
                
                className="pr-5"
                placeholder={props.search.placeholder}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* icon search */}
              <CiSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          )}
        </div>
      </div>
      <div className="table-container">
        <Table
          className={className}
          style={{ pointerEvents: "auto" }}
          size={size}
          columns={columns}
          dataSource={dataSource}
          {...props}
          pagination={false}
        />
      </div>
      {props?.pagination?.current && (
        <div
          className={` pagination-container flex justify-end ${props.pagination.className}`}
        >
          <Pagination {...props.pagination} />
        </div>
      )}
    </>
  );
};

export default TableC;
