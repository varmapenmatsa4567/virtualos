import React from 'react'
import Notification from './Notification'
import useNotificationsStore from '@/stores/notifications-store'

const NotificationContainer = () => {

  const { notifications } = useNotificationsStore();

  console.log(notifications);


  return (
    <div className='fixed top-10 right-0 z-50 px-4 flex flex-col gap-3'>
      {notifications.length > 0 && [...notifications].reverse().map((notification, index) => (
        <Notification key={index} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationContainer