import CenteredLayout from "@/components/centeredLayout"

export default function RegisterSuccess() {
    return <CenteredLayout>
        <div className="text-center">
            Thanks for registering!<br />
            You received an email with your verification code.
        </div>
    </CenteredLayout>
}