import { NextResponse } from "next/server";
import * as nodemailer from 'nodemailer';

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
        // connection.query(
        //     'INSERT INTO `send_email` (Property_Name, City, Country, Email, Contract_Person, Demo_Date, Demo_Time, Demo_Language, Time_Stamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        //     [PropertyName, City, Country, Email, ContractPerson, DemoDate, DemoTime, DemoLanguage, TimeStamp],
        //     async (error: any, results: any) => {
        //         if (error) {
        //             console.log("Insert error", error);
        //             return NextResponse.json({ message: 'ERROR', error }, { status: 500 });
        //         }
        //         console.log("Insert Success!!");
        //     },
        // );

        connection.query(
            'SELECT Idmail, Usermail, Tokenmail, Servicemail, Hostmail, Securemail FROM mail_config WHERE Idmail = 1',
            async (error: any, result: any) => {
                if (error) {
                    console.log("Select error", error);
                    return NextResponse.json({ message: 'ERROR', error }, { status: 500 });
                }

                const MAIL_CONFIG = {
                    service: result[0].Servicemail,
                    host: result[0].Hostmail,
                    secure: result[0].Securemail,
                    auth: {
                        user: result[0].Usermail,
                        pass: result[0].Tokenmail,
                    },
                };

                const transporter = nodemailer.createTransport(MAIL_CONFIG);

                await new Promise((resolve, reject) => {
                    // verify connection configuration
                    transporter.verify(function (error: any, success: any) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            console.log("Server is ready to take our messages");
                            resolve(success);
                        }
                    });
                });

                const mailOptions = {
                    from: result[0].Usermail,
                    to: email,
                    subject: `Sending Email using NodeMailer ${name}`,
                    html: '<p>Hello world!!</p>' + name
                };

                try {
                    // await transporter.sendMail(mailOptions);
                    await new Promise((resolve, reject) => {
                        // send mail
                        transporter.sendMail(mailOptions, (err: any, info: any) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                            } else {
                                console.log(info);
                                resolve(info);
                            }
                        });
                    });
                } catch (error) {
                    console.error("Error sending email:", error);
                    return NextResponse.json({ message: 'ERROR', error }, { status: 500 });
                }
            }
        );
        return NextResponse.json({ message: 'OK' }, {
            headers: { "Authorization": "Bearer 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" },
        });
    } catch (error) {
        console.error("Error All", error);
        return NextResponse.json({ message: 'ERROR', error }, { status: 500 });
    }

};
