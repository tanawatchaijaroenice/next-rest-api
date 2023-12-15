// import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';



export async function POST(request: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY || '');
        const res = await request.json()
        const { name, email } = res;
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Hello world',
            react: '<p> ' + name + ' !!</p>' + new Date(),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }

}