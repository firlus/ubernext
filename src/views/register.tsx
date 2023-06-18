"use client";

import CenteredLayout from "@/components/centeredLayout";
import { UserCreateSchema, UserCreateType } from "@/model/user";
import { notificationContext } from "@/services/notifications";
import axios, { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function RegisterView() {

    const router = useRouter();
    const [_, setAlerts] = useContext(notificationContext);

    const initialValues: UserCreateType = {
        email: '',
        password: '',
        name: ''
    }

    return <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(UserCreateSchema)}
        onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            axios.post('/api/user/register', values).then(_ => {
                router.push('/register/success');
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
                    <h1>Register</h1>
                    <div className="flex flex-col gap-1">
                        <b>E-Mail</b>
                        <Field type="email" name="email" />
                        <div className="text-red-600">
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <b>Name</b>
                        <Field type="text" name="name" />
                        <div className="text-red-600">
                            <ErrorMessage name="name" />
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
                        {isSubmitting ? "Loading" : "Submit"}
                    </button>
                </CenteredLayout>
            </Form>
        )}
    </Formik>
}