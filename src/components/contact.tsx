import React, { useState, FormEvent } from "react";
import { SectionsIds } from "@/components/header";

export default function Contact() {
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const clearForm = () => {
    setTo("");
    setName("");
    setText("");
  };

  const onEmailSent = () => {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 1000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, name, text }),
    });
    setSendingEmail(false);

    if (response.ok) {
      clearForm();
      onEmailSent();
    }
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

  const sendDisabled = sendingEmail || emailSent;

  return (
    <section id={SectionsIds.Contact} className="py-20 px-5 " aria-label="Contact Me">
      <div className="my-20 rounded contact lg:p-7 w-full grid lg:grid-cols-2 grid-cols-1 container mx-auto max-w-screen-lg justify-center">
        <div className="lets-talk-section rounded flex flex-col col-span-1 lg:p-0 lg:shadow-none shadow-lg p-4 text-white">
          <h1 className="text-4xl text-center lg:text-left text-white mb-4">
            Let&apos;s talk
          </h1>
          <p className="text-white mb-0">
            Feel free to leave a comment about the side, any improvement or
            anything you want to share
          </p>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl text-white lg:mt-10 mt-4">Contact me</h2>
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
          className="col-span-1 lg:mt-0 mt-7  flex flex-col gap-4 p-4 rounded-lg w-full shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className={inputContainerClass}>
            <label className={inputLabelClass}>Email:</label>
            <input
              className={inputClass}
              placeholder="your.email@example.com"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-full items-start">
            <label className={inputLabelClass}>Message:</label>
            <textarea
              className={inputClass + " h-36"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button
            className={`btn bg-white p-2 border rounded w-full flex justify-center items-center ${
              emailSent && "mail-sent-btn"
            } ${sendingEmail && "mail-sending-btn"}`}
            disabled={sendDisabled}
            type="submit"
          >
            <div className="flex gap-2 text-white">
              <div
                style={{ width: "24px", height: "24px" }}
                className="button-content relative text-white"
              >
                {sendingEmail && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white absolute"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {!sendingEmail && !emailSent && (
                  <img className="mail-send" src="/plain-mail.svg" alt="Send email icon" />
                )}
                {emailSent && <img src="/check-mail.svg" alt="Email sent successfully icon" />}
              </div>

              <span className="text-center text-white min-w-16">
                {sendingEmail
                  ? "Sending"
                  : emailSent
                  ? "Email Sent"
                  : "Send Email"}
              </span>
            </div>
          </button>
        </form>
      </div>
    </section>
  );
}
