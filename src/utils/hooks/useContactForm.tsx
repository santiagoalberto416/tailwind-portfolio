import { FormEvent, useState } from "react";

// Shared state + submit logic for the contact form, so every layout of the
// contact section can reuse the same /api/contact behavior.
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSendingEmail(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, name, text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to send email (${response.status})`
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
