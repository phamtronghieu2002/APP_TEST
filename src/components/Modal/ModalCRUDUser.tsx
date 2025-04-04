import ModalC from "@/components/ModalC/ModalC";
import showNotify from "@/untils/notify";
import { myContext } from "@/pages/Home/context/DataProvider";
import { Iuser } from "@/types";
import { Button, Form, Input } from "antd";
import { FC, ReactNode, useContext, useEffect } from "react";



interface Props {
  button: ReactNode;
  type: "add" | "edit" | "delete";
  title: string;
  data?: Iuser;
}

const ModalCRUDUser: FC<Props> = ({ button, type, title, data }) => {
  return (
    <div>
      <ModalC
        children={(action) => <Modal action={action} type={type} data={data} />}
        button={button}
        title={title}
      ></ModalC>
    </div>
  );
};

interface ModalProps {
  action: any;
  type: "add" | "edit" | "delete";
  data?: Iuser;
}

const Modal: FC<ModalProps> = ({ action, type, data }) => {
  const { state, dispatch } = useContext(myContext);

  const users = state.data;

  const [form] = Form.useForm();

  const handleUpdate = () => {
    const newUsers = users.map((user: Iuser) =>
      user.id == data?.id ? { ...user, ...form.getFieldsValue() } : user
    );
    dispatch({ type: "SET_DATA", payload: newUsers });
    showNotify("User updated successfully", "success");
    action.closeModal();
  };

  const handleDelete = () => {
    const newUsers = users.filter((user: Iuser) => user.id != data?.id);
    dispatch({ type: "SET_DATA", payload: newUsers });
    showNotify("User deleted successfully", "success");
    action.closeModal();
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <div>
      <Form
        form={form}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        initialValues={data}
      >
        {type === "delete" ? (
          <p>
            Do you want to delete this user{" "}
            <span className="font-bold">{data?.name}</span>?
          </p>
        ) : (
          <>
            <Form.Item
              rules={[{ required: true, message: "Name is required" }]}
              name="name"
              label="name"
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              rules={[{ required: true, message: "Email is required" }]}
              name="email"
              label="email"
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </>
        )}
      </Form>

      <div className="actions flex justify-end gap-2">
        <Button color="danger" onClick={action.closeModal}>
          Cancel
        </Button>

        {type === "edit" && (
          <Button type="primary" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        )}
        {type === "delete" && (
          <Button color="danger" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModalCRUDUser;
