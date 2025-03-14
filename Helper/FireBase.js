import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const fetch = require('node-fetch');

const firebaseConfig = {
    apiKey: "AIzaSyCOSpNYKwqjV96dqT_4I7hi4Uj2CFwXDhE",
  authDomain: "demobackend-aa8c1.firebaseapp.com",
  projectId: "demobackend-aa8c1",
  storageBucket: "demobackend-aa8c1.appspot.com",
  messagingSenderId: "809961739105",
  appId: "1:809961739105:web:40a3c1dba7c91212e56b20"
}

//intilize firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');

        //get the device token
      const token = await getToken(messaging, { vapidKey: '3efgQT9qRlU30cl1zieILjRhgxPfoM09gm6pqe4FPeM' });
      console.log('Device token:', token);

      // Send this token to your server to store it and send push notifications to this device
    } else {
      console.error('Unable to get permission to notify.');
    }
      // Send this token to your server to store it and send push notifications to this device
    } catch (error) {
      console.error('Error getting permission or token:', error);
    }
  };
  
  requestPermission();

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    };
  
    new Notification(notificationTitle, notificationOptions);
  });
  
  const sendNotification = async (deviceToken, message) => {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Authorization': 'key=BIZJFJs2DHt3QUJASXX4XA1Fy2Ek4HvFnxh8w-LjWMHSphfrYvckGJTwYhfWwieaLqHRZzJkGFTutNq109uJ97M',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: deviceToken,
        notification: {
          title: hello ,
          body: everyone,
        }
      })
    });
  
    const data = await response.json();
    console.log(data);
  };
  
  // Replace this with the actual device token obtained from the user
  const deviceToken = 'YOUR_DEVICE_TOKEN';
  const message = {
    title: 'Hello',
    body: 'This is a test notification'
  };
  // Send the notification
  sendNotification(deviceToken, message);