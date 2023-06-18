"use client";

import CenteredLayout from "@/components/centeredLayout";
import { UserCreateSchema, UserCreateType, UserLoginSchema, UserLoginType } from "@/model/user";
import { notificationContext } from "@/services/notifications";
import axios, { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function LoginView() {

    const router = useRouter();
    const [_, setAlerts] = useContext(notificationContext);

    const initialValues: UserLoginType = {
        email: '',
        password: '',
    }

    return <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(UserLoginSchema)}
        onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            axios.post('/api/user/login', values).then(_ => {
                router.push('/home');
                setSubmitting(false);
            }).catch(e => {
                setSubmitting(false);
                if (setAlerts) {
                    if (e instanceof AxiosError) {
                        console.error({ e })
                        setAlerts([{ text: e.response?.data.message, type: "info" }])
                    }
                }
            });
        }}>
        {({ isSubmitting }) => (
            <Form>
                <CenteredLayout>
                    <h1>Login</h1>
                    <div className="flex flex-col gap-1">
                        <b>E-Mail</b>
                        <Field type="email" name="email" />
                        <div className="text-red-600">
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <b>Password</b>
                        <Field type="password" name="password" />
                        <div className="text-red-600">
                            <ErrorMessage name="password" />
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Loading" : "Login"}
                    </button>
                </CenteredLayout>
            </Form>
        )}
    </Formik>
}