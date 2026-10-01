import { FC, ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

// Eyebrow + title + optional lead paragraph shared by every section.
// `id` is used for the heading so the <section> can reference it via aria-labelledby.
const SectionHeading: FC<SectionHeadingProps> = ({
  id,
  eyebrow,
  title,
  children,
}) => (
  <header className="section-heading" data-reveal>
    <p className="eyebrow">{eyebrow}</p>
    <h2 id={id} className="section-title">
      {title}
    </h2>
    {children && <p className="section-lead">{children}</p>}
  </header>
);

export default SectionHeading;
