'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handlePress = async () => {
    // https://cabinet-api-dev.smartfinder.asia/en/api/v1/User/SendMail
    const res = await fetch('https://api.sendgrid.com/v3/', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json', Authorization },
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer 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`,
      },
      body: JSON.stringify({
        "personalizations": [
          {
            "to": [
              {
                "email": "tanawat.smartfinder@gmail.com",
                "name": "John Doe"
              }
            ],
            "subject": "Hello, World!"
          }
        ],
        "content": [
          {
            "type": "text/plain",
            "value": "Heya!"
          }
        ],
        "from": {
          "email": "tanawat.chaijaroenice@gmail.com",
          "name": "Sam Smith"
        },
        "reply_to": {
          "email": "sarayut.smartfinder@gmail.com",
          "name": "Sam Smith"
        }
      })
    });
    res.json().then((data) => {
      console.log(data);
    })

    // Email.send({
    //   Host: "smtp.elasticemail.com",
    //   Username: "username",
    //   Password: "password",
    //   To: 'them@website.com',
    //   From: "you@isp.com",
    //   Subject: "This is the subject",
    //   Body: "And this is the body"
    // }).then(
    //   message => alert(message)
    // );
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Deploy {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
      </div>

      <div>
        <input
          className={`appearance-none block w-full text-gray-700 border rounded p-2 text-sm mb-1 leading-tight focus:outline-none focus:bg-white`}
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleInput}
        />
      </div>

      <div>
        <input
          className={`appearance-none block w-full text-gray-700 border rounded p-2 text-sm mb-1 leading-tight focus:outline-none focus:bg-white`}
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={handleInput}
        />
      </div>

      <div>
        <button
          className={`appearance-none block w-full text-gray-700 border rounded p-2 text-sm mb-1 leading-tight focus:outline-none focus:bg-white`}
          onClick={handlePress}
        >
          Send Email
        </button>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
