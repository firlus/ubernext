import NotificationContextProvider from "@/services/notifications";
import RegisterView from "@/views/register";

export default function Register() {
    return <NotificationContextProvider>
        <RegisterView />
    </NotificationContextProvider>
}