import { Button, Popover, Select, Tooltip } from "antd";
import { FC } from "react";
import { FaFilter } from "react-icons/fa";

export interface FilterList {
  label: string;
  options?: { label: string; value: string }[];
}

interface FilterProps {
  filterList: FilterList[];
  title: string;
  trigger: "click" | "hover" | "focus";
  onFilter: (label: string, value: string) => void;
}

const Filter: FC<FilterProps> = ({ filterList, onFilter, title, trigger }) => {
return (
    <div className="filter">
      <Popover
        content={
          <div>
            {/* select option */}
            {filterList.map((item) => (
              <div key={item.label} className="wp_options mb-3">
                <p className="mb-2">{item.label}</p>
                <Select
                 allowClear
                  className="w-full"
                  options={item.options}
                  onChange={(value) => onFilter(item.label, value)}
                />
              </div>
            ))}
          </div>
        }
        title={title}
        trigger={trigger}
      >
        <button className="border border-gray-300 rounded-md p-2">
          <Tooltip title={"filter"}>
            <FaFilter size={13} />
          </Tooltip>
        </button>
      </Popover>
    </div>
  );
};

export default Filter;
