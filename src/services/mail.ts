import nodemailer from "nodemailer";

export async function sendEmail(to: string, text: string, subject: string) {
    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
        auth: {
            user: 'info@ubernext.dev',
            pass: 'dings'
        }
    });

    const mailOptions = {
        from: 'info@ubernext.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}