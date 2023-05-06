import { useState } from "react"
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';
import { Inter } from 'next/font/google'
import toast from "react-hot-toast"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [text, setText] = useState("");

  function onNotificationClick(message: any) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  const sendNotification = async () => {
    console.log("where?", text)
    if (!text) {
      toast.error("Please enter some text!")
      return;
    }
    await fetch("/api/send-notification", {
      method: "POST",
      body: JSON.stringify({ msg: text })
    })
    setText("");
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>This is a test app for testing Novu</h1>
      <textarea className="border-2 border-gray-500" value={text} onChange={(e) => setText(e.target.value)} />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={sendNotification}>Send Notification</button>
      <NovuProvider subscriberId={process.env.NEXT_PUBLIC_NOVU_SUBSCRIBER_ID} applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APPLICATION_ID || ""}>
        <PopoverNotificationCenter colorScheme="light" onNotificationClick={onNotificationClick}>
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    </main>
  )
}
