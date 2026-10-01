import { FC } from "react";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faCircleCheck,
  faCircleExclamation,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import useContactForm from "@/utils/hooks/useContactForm";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { contactLinks } from "./contactLinks";
import { SectionsIds } from "./sections";

const SubmitLabel: FC<{ sending: boolean; sent: boolean }> = ({
  sending,
  sent,
}) => {
  if (sending) {
    return (
      <>
        <Icon icon={faSpinner} className="animate-spin" />
        Sending…
      </>
    );
  }
  if (sent) {
    return (
      <>
        <Icon icon={faCircleCheck} />
        Message sent
      </>
    );
  }
  return (
    <>
      Send message
      <Icon icon={faPaperPlane} />
    </>
  );
};

const ContactForm: FC = () => {
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

  return (
    <GlassPanel blur className="contact-form-card" data-reveal>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              className="glass-input"
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              className="glass-input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            className="glass-input glass-input--area"
            name="message"
            rows={6}
            placeholder="Tell me about your team, product or role…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <div className="contact-form__footer">
          <button
            type="submit"
            className={`btn btn--primary ${emailSent ? "btn--success" : ""}`}
            disabled={sendDisabled}
          >
            <SubmitLabel sending={sendingEmail} sent={emailSent} />
          </button>
          <div className="form-status" role="status" aria-live="polite">
            {emailSent && "Thanks! Your message is on its way."}
          </div>
        </div>

        {error && (
          <p className="form-error" role="alert">
            <Icon icon={faCircleExclamation} />
            {error}
          </p>
        )}
      </form>
    </GlassPanel>
  );
};

const Contact: FC = () => (
  <section
    id={SectionsIds.Contact}
    className="lg-section"
    aria-labelledby="contact-title"
  >
    <div className="lg-container contact-layout">
      <div className="contact-intro">
        <SectionHeading id="contact-title" eyebrow="Contact" title="Let’s build something">
          Hiring for a front-end role or need help with an Angular or React
          codebase? Send me a message and I&apos;ll get back to you.
        </SectionHeading>

        <ul className="contact-links" data-reveal>
          {contactLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className="contact-link"
                {...(link.external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                <span className="icon-tile icon-tile--small">
                  <Icon icon={link.icon} />
                </span>
                <span className="contact-link__text">
                  <span className="contact-link__label">{link.label}</span>
                  <span className="contact-link__value">{link.display}</span>
                </span>
                <Icon
                  icon={link.external ? faArrowUpRightFromSquare : faArrowRight}
                  className="contact-link__arrow"
                />
                {link.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <ContactForm />
    </div>
  </section>
);

export default Contact;
