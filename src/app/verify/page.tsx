import { UserVerifySchema } from "@/model/user";
import NotificationContextProvider from "@/services/notifications";
import VerifyView from "@/views/verify";

export default function Verify({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {


    const verifyData = UserVerifySchema.safeParse(searchParams);

    return <NotificationContextProvider>
        {verifyData.success ?
            <VerifyView {...verifyData.data} /> : verifyData.error.toString()
        }
    </NotificationContextProvider>
}