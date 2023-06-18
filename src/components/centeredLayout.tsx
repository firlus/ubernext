import { ReactNode } from "react";

export default function CenteredLayout({ children }: { children: ReactNode }) {
    return <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
        <div className="w-[600px] flex flex-col gap-4">
            {children}
        </div>
    </div>
}