import { guard } from "@/services/guard";
import NotificationContextProvider from "@/services/notifications";
import LoginView from "@/views/login";
import { redirect } from "next/navigation";

export default function Login() {
    if (!guard.anonymous()) return redirect('/app')
    return <NotificationContextProvider>
        <LoginView />
    </NotificationContextProvider>
}