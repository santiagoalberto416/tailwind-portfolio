import { FormEvent, useState } from "react";
import { HONEYPOT_FIELD_NAME } from "@/components/HoneypotField";

// Web3Forms delivers the message to my inbox straight from the browser, so the
// site needs no server function. The access key is public by design: it only
// identifies which inbox receives the form.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "a33bbfc9-0a39-4464-a843-fa8307cfd875";

// Shared state + submit logic for the contact form, so every layout of the
// contact section sends messages the same way.
const useContactForm = () => {
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearForm = () => {
    setTo("");
    setName("");
    setText("");
  };

  const onEmailSent = () => {
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 3000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Bots fill in the hidden honeypot field. Act as if the message was sent
    // so they get no hint, but don't deliver it.
    const honeypot = new FormData(e.currentTarget).get(HONEYPOT_FIELD_NAME);
    if (honeypot) {
      clearForm();
      e.currentTarget.reset();
      onEmailSent();
      return;
    }

    setSendingEmail(true);
    setError(null);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${name}`,
          from_name: "Portfolio contact form",
          name,
          // Web3Forms uses `email` as the reply-to address
          email: to,
          message: text,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `Failed to send email (${response.status})`
        );
      }

      clearForm();
      onEmailSent();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to send email. Please try again or contact me through social media.";
      setError(errorMessage);
      console.error("Error sending email:", err);
    } finally {
      setSendingEmail(false);
    }
  };

  return {
    to,
    setTo,
    name,
    setName,
    text,
    setText,
    sendingEmail,
    emailSent,
    error,
    sendDisabled: sendingEmail || emailSent,
    handleSubmit,
  };
};

export default useContactForm;
