"use server";

import nodemailer from "nodemailer";

const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME ?? "";
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD ?? "";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD
    }
});

export async function sendMail({
    sendTo,
    subject,
    html
}: {
    sendTo: string;
    subject: string;
    html: string;
}) {
    try {
        const isVerified = await transporter.verify();

        if (isVerified) {
            const info = await transporter.sendMail({
                from: `pixelated <${process.env.SMTP_SERVER_USERNAME}>`,
                to: sendTo,
                subject: subject,
                html: html ? html : "",
            });

            console.log("Mail sent: ", info);

            return true;
        }
    } catch (error) {
        console.error("Could not send mail to: ", sendTo, ". An error occured: ", error);
        return false
    }
}