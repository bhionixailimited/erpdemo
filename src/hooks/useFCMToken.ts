import { getToken, onMessage } from "@firebase/messaging";

import { messaging, VAPID_KEY } from "configs";
import { useEffect } from "react";
import useFetch from "./useFetch";

const useFCMToken = (uid: string | undefined) => {
  const { mutate } = useFetch();
  useEffect(() => {
    const isSupported = () =>
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    if (isSupported()) {
      Notification.requestPermission(async function (permission) {
        const messagingResolver = await messaging;
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          if (uid) {
            // Get FCM Token

            await getToken(messagingResolver, {
              vapidKey: VAPID_KEY,
            })
              .then(async (fcmToken) => {
                if (fcmToken) {
                  try {
                    const response = await mutate({
                      path: "user/account/update",
                      method: "PUT",
                      body: JSON.stringify({
                        webToken: fcmToken,
                      }),
                    });
                  } catch (err) {}
                } else {
                }
              })
              .catch((err) => console.log());
          }
        } else if (
          Notification.permission === "denied" ||
          Notification.permission === "default"
        ) {
          Notification.requestPermission();
        }
      });
    }
  }, [uid]);
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );

export default useFCMToken;
