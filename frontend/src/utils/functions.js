import { toast } from "react-toastify";

const displayToast = (
  message = "Notification !",
  type = "success",
  position = toast.POSITION.BOTTOM_RIGHT
) => toast[type](message, { position });

export {displayToast};