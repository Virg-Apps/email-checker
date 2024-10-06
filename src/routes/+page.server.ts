import { createTransport, type Transporter } from "nodemailer";
import type { Options } from "nodemailer/lib/mailer";
import type { Actions } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const load = async () => {
    return {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        user: env.SMTP_USER,
        password: env.SMTP_PASSWORD,
        from: env.SMTP_FROM,
        to: env.SMTP_TO,
        subject: env.SUBJECT ?? "",
        message: env.MESSAGE ?? "",
        proxy: env.SMTP_PROXY ?? null
    };
}

export const actions: Actions = {
	default: async ({ request }) => {
        const formData: FormData = await request.formData();

        const transporter: Transporter = createTransport({
            host: formData.get("host") as string,
            port: Number(formData.get("port") as string),
            secure: formData.has("secure"),
            auth: {
                user: formData.get("user") as string,
                pass: formData.get("password") as string
            },
            proxy: formData.has("proxy") ? formData.get("proxy") as string : null
        });

        const email: Options = {
            from: formData.get("from") as string,
            to: formData.get("to") as string,
            subject: formData.get("subjet") as string,
        };
        if (formData.has("message")) {
            email.text = formData.get("message") as string;
        }

        try {
            const result = await transporter.sendMail(email);
            console.log(result);
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: error
            };
        }

        return {
            success: true
        }
	}
};