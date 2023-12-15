import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'

const sendEmail = async ({ name, emailFrom, emailTo, apiKey }: any) => {
    console.log("name", name);
    console.log("emailFrom", emailFrom);
    console.log("emailTo", emailTo);
    console.log("apiKey", apiKey);

    await fetch(SENDGRID_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{
                    email: emailTo,
                    name: "Tanawat Send!!"
                }],
                subject: 'Demo success :)'
            }],
            from: {
                email: 'tanawat.chaijaroenice@gmail.com',
                name: emailFrom
            },
            content: [{
                type: 'text/html',
                value: `Congratulations <b>${name}</b>, you just sent an email with sendGrid`
            }]
        })
    });
}

export { sendEmail };