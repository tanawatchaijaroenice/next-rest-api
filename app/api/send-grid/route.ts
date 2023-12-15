import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY ?? '');

export async function POST(request: Response) {
    try {
        const res = await request.json()
        const { name, email } = res;

        await sendgrid.send({
            from: 'tanawat.chaijaroenice@gmail.com', // your website email address here
            to: email, // Your email where you'll receive emails
            subject: `${name}`,
            html: `<div>You've got a mail</div>`,
        });

    } catch (error) {
        // console.log(error);
        return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: 'success' });
}
