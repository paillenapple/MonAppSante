import React from "react";
import DeletedJobNotif from "./../components/templates/notifications/DeletedJobNotif";
import { toast } from "react-toastify";

const displayToast = (
  message = "Notification !",
  type = "success",
  position = toast.POSITION.BOTTOM_RIGHT
) => toast[type](message, { position });

const getNotificationTemplate = (notif, user, props) => {
  const {removeNotifFromNotifications} = props;
  switch (notif.type) {
    case 0:
      return (
        <DeletedJobNotif
          notif={notif}
          removeNotifFromNotifications={removeNotifFromNotifications}
        />
      );
    default:
      return <span>Notification</span>;
  }
};

export { displayToast, getNotificationTemplate };
