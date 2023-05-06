import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  function onNotificationClick(message: any) {
    // your logic to handle the notification click
    if (message?.cta?.data?.url) {
      window.location.href = message.cta.data.url;
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>This is a test app for testing Novu</h1>
      <NovuProvider subscriberId={process.env.NEXT_PUBLIC_NOVU_SUBSCRIBER_ID} applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APPLICATION_ID || ""}>
        <PopoverNotificationCenter colorScheme="light" onNotificationClick={onNotificationClick}>
          {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
        </PopoverNotificationCenter>
      </NovuProvider>
    </main>
  )
}
