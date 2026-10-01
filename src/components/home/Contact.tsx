import { faArrowRight, faCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import BentoCard from "@/components/home/BentoCard";
import Icon from "@/components/home/Icon";
import SectionHeading from "@/components/home/SectionHeading";
import { SectionsIds } from "@/components/home/sections";
import { profile } from "@/data/profile";
import useContactForm from "@/utils/hooks/useContactForm";

const handleFromUrl = (url: string) => `@${url.replace(/\/$/, "").split("/").pop()}`;

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: faEnvelope,
  },
  {
    label: "LinkedIn",
    value: profile.shortName,
    href: profile.links.linkedin,
    icon: faLinkedinIn,
  },
  {
    label: "GitHub",
    value: handleFromUrl(profile.links.github),
    href: profile.links.github,
    icon: faGithub,
  },
  {
    label: "Instagram",
    value: handleFromUrl(profile.links.instagram),
    href: profile.links.instagram,
    icon: faInstagram,
  },
];

const fieldClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder:text-zinc-600 transition-colors hover:border-white/[0.14] focus:border-accent/60 focus:bg-white/[0.05]";
const labelClass = "mb-2 block font-geist-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400";

const Contact = () => {
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

  const buttonLabel = sendingEmail ? "Sending…" : emailSent ? "Message sent" : "Send message";

  return (
    <section
      id={SectionsIds.Contact}
      aria-labelledby="contact-title"
      className="scroll-mt-24 pt-28 md:pt-36"
    >
      <SectionHeading
        headingId="contact-title"
        eyebrow="05 — Contact"
        title="Let's build something."
        description="Have a role or a project in mind? Send me a message or reach out on any of these channels."
      />

      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-5">
        <BentoCard className="flex flex-col gap-6 p-6 md:p-8 lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="status-dot" aria-hidden="true" />
            <p className="text-sm text-zinc-300">
              {profile.availability} · {profile.location}
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {channels.map((channel) => {
              const external = channel.href.startsWith("http");
              return (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 pr-4 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]"
                  >
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white/[0.06] text-zinc-200 transition-colors group-hover:bg-accent group-hover:text-ink-950">
                      <Icon icon={channel.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-geist-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                        {channel.label}
                      </span>
                      <span className="block truncate text-[15px] text-white">{channel.value}</span>
                    </span>
                    <Icon
                      icon={faArrowRight}
                      className="h-3 w-3 -rotate-45 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </BentoCard>

        <BentoCard revealDelay={80} className="p-6 md:p-8 lg:col-span-3">
          <form onSubmit={handleSubmit} className="flex h-full flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Jane Doe"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="jane@company.com"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <label htmlFor="contact-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Tell me about the role or project…"
                className={`${fieldClass} flex-1 resize-none`}
              />
            </div>

            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p role="status" aria-live="polite" className="text-sm">
                {error && <span className="text-red-400">{error}</span>}
                {emailSent && (
                  <span className="text-accent">Thanks! Your message is on its way.</span>
                )}
              </p>
              <button
                type="submit"
                disabled={sendDisabled}
                className="inline-flex items-center justify-center gap-2 rounded-[999px] bg-accent px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {buttonLabel}
                <Icon icon={emailSent ? faCheck : faPaperPlane} className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </BentoCard>
      </div>
    </section>
  );
};

export default Contact;
