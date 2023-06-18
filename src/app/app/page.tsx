
import CenteredLayout from "@/components/centeredLayout";
import { guard } from "@/services/guard";
import { redirect } from "next/navigation";

export default async function App() {
    const user = await guard.user();
    if (user) return <CenteredLayout>
        <div className="text-center">
            Hello, {user?.name}
        </div>
    </CenteredLayout>
    redirect('/login')
}