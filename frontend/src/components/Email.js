import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./../features/user/userSlice";
import {
  DashboardTemplate,
} from "../templates";
import { getNotificationTemplate } from "./../utils/functions";
import { Loader } from "./business-components";

const Email = (props) => {
  const dispatch = useDispatch();
  const { pathname } = props.location;
  const currentUser = props.currentUser;
  const [userInfosUpdate, triggerUserInfosUpdate] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    const abortController = new AbortController();
    const fetchUserInfos = () => {
      const url = new URL(
        `${process.env.REACT_APP_APIBASEURL}/api/auth/getuserinfos/${currentUser.id}`
      );
      fetch(url, {
        method: "GET",
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch(updateUser(data));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoadingStatus(false));
    };
    fetchUserInfos();
    return () => {
      abortController.abort();
    };
  }, [dispatch, currentUser.id, userInfosUpdate]);

  const removeNotifFromNotifications = (notifToBeDeletedId) => {
    setLoadingStatus(true);
    const url = new URL(
      `${process.env.REACT_APP_APIBASEURL}/api/auth/remove-notif-from-notifications`
    );
    const formData = new FormData();
    const formUser = JSON.stringify(currentUser);
    formData.append("notifToBeDeletedId", notifToBeDeletedId);
    formData.append("user", formUser);
    fetch(url, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        triggerUserInfosUpdate(!userInfosUpdate);
      })
      .catch((error) => {
        console.error(error);
        setLoadingStatus(false);
      });
  };

  return (
    <DashboardTemplate
      title="Mes notifications"
      pathname={pathname}
      currentUser={currentUser}
    >
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {currentUser.notifications.length > 0 ? (
            <ul className="flex flex-col nfc-mt1">
              {currentUser.notifications.map((notif, index) => {
                const Component = (props) => {
                  return getNotificationTemplate(notif, currentUser, props);
                };
                return (
                  <li key={`${notif.type}-${index}`}>
                    <Component
                      removeNotifFromNotifications={
                        removeNotifFromNotifications
                      }
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>Aucune notification disponible</div>
          )}
        </>
      )}
    </DashboardTemplate>
  );
};

export default Email;
