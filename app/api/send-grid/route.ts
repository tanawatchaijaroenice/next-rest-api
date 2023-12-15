import { NextResponse } from "next/server";

// import sendgrid from "@sendgrid/mail";

// sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

// export async function POST(request: Request) {
//     try {
//         const res = await request.json()
//         const { name, email } = res;

//         await sendgrid.send({
//             from: 'tanawat.chaijaroenice@gmail.com', // your website email address here
//             to: email, // Your email where you'll receive emails
//             subject: `${name}`,
//             html: `<div>You've got a mail</div>`,
//         });

//     } catch (error) {
//         // console.log(error);
//         return NextResponse.json({ error }, { status: 500 });
//     }

//     return NextResponse.json({ message: 'success' });
// }



// import { sendEmail } from "@/utils/sendEmail";

// export async function POST(request: Request) {
//     const res = await request.json()
//     const { name, email } = res;

//     try {
//         await sendEmail({ name, email });
//         console.log("Send Email Success!!");
//         return NextResponse.json({ message: 'success' });
//     } catch (error) {
//         return NextResponse.json({ error });
//     }
// }


import sgMail from "@sendgrid/mail";
require("dotenv").config();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
});

export async function POST(request: Request) {
    const res = await request.json()

    const { name, email } = res;

    try {
        connection.query(
            'SELECT Idmail, Usermail, Tokenmail, Servicemail, Hostmail, Securemail, Apikey FROM mail_config WHERE Idmail = 2',
            async (error: any, result: any) => {
                if (error) {
                    console.log("Select error", error);
                    return NextResponse.json({ message: 'ERROR', error }, { status: 500 });
                }

                console.log("result", result);
                const msg = {
                    from: result[0].Usermail,
                    to: email, // Replace with your own email address
                    subject: "New message from your website",
                    text: 'Hello World' + name,
                };

                var SEND_GRID_API_KEY = result[0].Apikey

                sgMail.setApiKey(SEND_GRID_API_KEY);

                try {
                    await sgMail.send(msg);
                    return NextResponse.json({ message: "Email sent successfully!" });
                } catch (error) {
                    console.error(error);
                    return NextResponse.json({ message: "Something went wrong." });
                }
            })
    } catch (error) {
        return NextResponse.json({ error });
    }
    return NextResponse.json({ message: "successfully!" });
}
