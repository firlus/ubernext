"use client"

import { notificationContext } from "@/services/notifications"
import { useContext } from "react"

export default function NotificationCenter() {
    const [alerts, _] = useContext(notificationContext);

    return <div className="fixed bottom-0 right-0 pr-8 pb-8">
        {alerts.map(alert => <div className="px-4 py-3 bg-white border-2 rounded-lg">
            {alert.text}
        </div>)}
    </div>
}