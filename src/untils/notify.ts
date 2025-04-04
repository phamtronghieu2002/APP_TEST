import { toast } from "react-toastify";

const showNotify = (message: string, type: "success" | "error") => {
  if (type === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};

export default showNotify;

