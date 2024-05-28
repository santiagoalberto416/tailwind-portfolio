// components/EmailForm.tsx
import React, { useState, FormEvent } from "react";
import { SectionsIds } from "@/components/header";

export default function Contact() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // console.log({ to, subject, text });
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    });

    const result = await response.json();
    alert(result.message);
  };

  const inputClass = "p-2 rounded w-full";
  const inputLabelClass = "min-w-36 text-white pb-2";
  const inputContainerClass = "flex flex-col w-full ";

  const contactButtons = [
    {
      href: "https://www.instagram.com/santiagokirk",
      imgSrc: "/outline-insta-icon.svg",
      altText: "Instagram Icon",
      text: "@santiagokirk",
      title: "Instagram",
      className: "",
    },
    {
      href: "https://www.facebook.com/santiagoalberto.kirkcabrera/",
      imgSrc: "/outline-facebook-icon.svg",
      altText: "Facebook Icon",
      title: "Facebook",
      text: "santiagoalberto.kirkcabrera",
    },
    {
      href: "mailto:santiagoalberto416@gmail.com",
      imgSrc: "/outline-email-icon.svg",
      altText: "Email Icon",
      title: "Email",
      text: "santiagoalberto416@gmail.com",
    },
  ];

  return (
    <div className="pb-20 px-5">
      <div
        id={SectionsIds.Contact}
        className="my-20 rounded contact p-7 w-full grid lg:grid-cols-2 grid-cols-1 container mx-auto max-w-screen-lg justify-center"
      >
        <div className="flex flex-col col-span-1 text-white">
          <h1 className="text-4xl text-white mb-4">Let&apos;s talk</h1>
          <p className="text-white mb-0">
            Feel free to leave a comment about the side, any improvement or
            anything you want to share
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl text-white mt-10">Contact me</h2>
            <p className="text-white">
              You can also contact me through my social media or email
            </p>
            <div className="image-section flex flex-col gap-4">
              {contactButtons.map((button, index) => (
                <a
                  key={index}
                  className=" rounded pr-4 mr-4"
                  href={button.href}
                >
                  <div className="flex gap-2 items-center">
                    <div className="bg-blue-900 rounded p-1.5">
                      <img src={button.imgSrc} alt={button.altText} />
                    </div>
                    <div>
                      <div className="font-bold">{button.title}</div>
                      <span className="text-gray-200">{button.text}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <form
          className="col-span-1 lg:mt-0 mt-4  flex flex-col gap-4 p-4 rounded-lg w-full"
          onSubmit={handleSubmit}
        >
          <div className={inputContainerClass}>
            <label className={inputLabelClass}>Email:</label>
            <input
              className={inputClass}
              placeholder="optional, only if you want reply"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div className={inputContainerClass}>
            <label className={inputLabelClass}>What&apos;s your name:</label>
            <input
              className={inputClass}
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className={`flex flex-col w-full items-start`}>
            <label className={inputLabelClass}>Message:</label>
            <textarea
              className={inputClass + " h-36"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button className="bg-white p-2 border rounded w-fit" type="submit">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}
