import { Iuser } from "@/types";
import { Tag, Tooltip } from "antd";
import { CiEdit, CiTrash } from "react-icons/ci";

import type { TableProps } from "antd";
import ModalCRUDUser from "@/components/Modal/ModalCRUDUser";

export interface UserDataTableType extends Iuser {
  key: string;
}

export const columns: TableProps<UserDataTableType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: 150,
    responsive: ["xs", "sm", "md", "lg", "xl"], // Luôn hiển thị trên mọi màn hình
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (value: string) => <a href={`mailto:${value}`}>{value}</a>,
    width: 150,
    responsive: ["md", "lg", "xl"], // Chỉ hiển thị từ `md` trở lên
  },
  {
    title: "Balance($)",
    dataIndex: "balance",
    key: "balance",
    render: (value: number) => (
      <span>
        {value?.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
    ),

    sorter: (a, b) => a.balance - b.balance,
    width: 200,
  },
  {
    title: "Registration",
    dataIndex: "registerAt",
    key: "birthDate",
    render: (value: string, record: UserDataTableType) => (
      <Tooltip
        title={new Date(record.registerAt).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      >
        {value}
      </Tooltip>
    ),
    width: 120,
    responsive: ["lg", "xl"], // Chỉ hiển thị trên `lg` trở lên
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (value: string) => (
      <Tag color={value === "admin" ? "blue" : "pink"}>{value}</Tag>
    ),
    width: 150,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (value: string) => (
      <Tag color={value === "male" ? "blue" : "pink"}>{value}</Tag>
    ),
    width: 150,
    responsive: ["md", "lg", "xl"], // Ẩn trên `xs` và `sm`
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: boolean) => (
      <Tag color={value ? "green" : "red"}>{value ? "Active" : "Inactive"}</Tag>
    ),
    width: 150,
  },
  {
    title: "Action",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    render: (value: string, record: UserDataTableType) => (
      <div className="flex gap-4">
        <ModalCRUDUser
          button={
            <Tooltip title="Edit">
              <CiEdit size={20} color="blue" />
            </Tooltip>
          }
          type="edit"
          title="Edit User"
          data={record}
        />

        <ModalCRUDUser
          button={
            <Tooltip title="Delete">
              <CiTrash size={20} color="red" />
            </Tooltip>
          }
          type="delete"
          title="Delete User"
          data={record}
        />
      </div>
    ),
    width: 150,
    responsive: ["xs", "sm", "md", "lg", "xl"], // Luôn hiển thị
  },
];
