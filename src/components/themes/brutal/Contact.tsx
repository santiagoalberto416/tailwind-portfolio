import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profile } from "@/data/profile";
import HoneypotField from "@/components/HoneypotField";
import useContactForm from "@/utils/hooks/useContactForm";
import { SectionsIds, accentFor } from "@/components/themes/brutal/sectionIds";
import { isExternal, socialLinks } from "@/components/themes/brutal/socialLinks";
import { SectionLabel } from "@/components/themes/brutal/SectionHeading";

const contactLinks = [
  { ...socialLinks.email, detail: profile.email },
  { ...socialLinks.linkedin, detail: "Let's connect" },
  { ...socialLinks.github, detail: "See the code" },
  { ...socialLinks.instagram, detail: "Coffee & side quests" },
];

const labelClass = "nb-label mb-2 block";

const Contact: FC = () => {
  const {
    to,
    setTo,
    name,
    setName,
    text,
    setText,
    sendingEmail,
    emailSent,
    error,
    sendDisabled,
    handleSubmit,
  } = useContactForm();

  const buttonText = sendingEmail
    ? "Sending…"
    : emailSent
      ? "Sent — talk soon!"
      : "Send message";

  return (
    <section
      id={SectionsIds.Contact}
      aria-labelledby="contact-title"
      className="nb-dots scroll-mt-20 border-t-3 border-ink py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="reveal mb-12">
          <SectionLabel index="06" label="Contact" />
          <h2
            id="contact-title"
            className="text-[clamp(4rem,16.5vw,10rem)] font-extrabold leading-[0.85] tracking-tighter"
          >
            Let&apos;s{" "}
            <span className="inline-block rotate-[-2deg] border-3 border-ink bg-sun px-3 shadow-nb rounded-nb sm:px-5">
              talk.
            </span>
          </h2>
          <p className="mt-8 max-w-2xl text-xl font-medium leading-snug sm:text-2xl">
            {profile.availability} · {profile.location} ({profile.timezone}).
            Send a message or reach me directly.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ul className="reveal min-w-0 space-y-4 lg:col-span-5">
            {contactLinks.map((link, index) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="nb-btn w-full justify-between gap-4 bg-white px-4 py-4 sm:px-5"
                  {...(isExternal(link.href) && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center border-3 border-ink rounded-nb ${accentFor(index)}`}
                    >
                      <FontAwesomeIcon
                        icon={link.icon}
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex min-w-0 flex-col items-start gap-1">
                      <span className="text-xl font-extrabold">
                        {link.label}
                      </span>
                      <span className="max-w-full truncate font-mono text-xs font-bold">
                        {link.detail}
                      </span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-2xl">
                    {isExternal(link.href) ? "↗" : "→"}
                  </span>
                  {isExternal(link.href) && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <form
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            className="reveal min-w-0 border-3 border-ink bg-lilac p-6 shadow-nb-lg rounded-nb sm:p-8 lg:col-span-7"
          >
            <HoneypotField />
            <h3
              id="contact-form-title"
              className="mb-6 text-3xl font-extrabold tracking-tight"
            >
              Send a message
            </h3>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Your email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="you@company.com"
                  className="nb-input"
                />
              </div>
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="nb-input"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell me about your team, project or role…"
                  className="nb-input resize-y"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={sendDisabled}
                className={`nb-btn px-6 py-4 text-lg ${
                  emailSent ? "bg-mint" : "bg-sun"
                }`}
              >
                {buttonText}
                {!sendingEmail && !emailSent && (
                  <span aria-hidden="true">→</span>
                )}
              </button>

              <p role="status" className="font-mono text-sm font-bold">
                {emailSent && "Thanks! Your message is on its way."}
              </p>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-6 border-3 border-ink bg-white p-4 font-medium rounded-nb"
              >
                <span className="nb-label mb-1 block text-[#B00020]">
                  Message not sent
                </span>
                {error} You can also email me at{" "}
                <a href={socialLinks.email.href} className="nb-link">
                  {profile.email}
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
