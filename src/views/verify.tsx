"use client";

import CenteredLayout from "@/components/centeredLayout";
import { UserVerifyType } from "@/model/user";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VerifyView({ email, emailVerificationString }: UserVerifyType) {
    const [text, setText] = useState("Loading");
    useEffect(() => {
        axios.post("/api/user/verify", { email, emailVerificationString }).then(_ => setText("Successfully verified!")).catch(_ => setText("Error!"))
    }, [])

    return <CenteredLayout>
        {text}
    </CenteredLayout>

}