import { FC } from "react";

// Name of the hidden field; useContactForm reads it on submit.
export const HONEYPOT_FIELD_NAME = "website";

// Spam trap for the contact form: a field real visitors never see or reach
// with the keyboard, but that form-filling bots tend to complete. Submissions
// that fill it in are dropped by useContactForm.
const HoneypotField: FC = () => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      left: "-9999px",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    }}
  >
    <label>
      Leave this field empty
      <input
        type="text"
        name={HONEYPOT_FIELD_NAME}
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </label>
  </div>
);

export default HoneypotField;
