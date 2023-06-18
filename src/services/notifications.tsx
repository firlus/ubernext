"use client";

import { Alert } from "@/model/notification";
import NotificationCenter from "@/views/notificationCenter";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

type Props = {
    children: ReactNode
}

export const notificationContext = createContext<[Alert[], Dispatch<SetStateAction<Alert[]>>?]>([[], undefined]);

export default function NotificationContextProvider({ children }: Props) {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    return <notificationContext.Provider value={[alerts, setAlerts]}>
        <><NotificationCenter />{children}</>
    </notificationContext.Provider>


}