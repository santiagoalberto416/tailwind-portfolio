import { FC, ReactNode } from "react";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  id?: string;
  intro?: string;
};

// "01 / About" style kicker shown above every section title.
export const SectionLabel: FC<{ index: string; label: string }> = ({
  index,
  label,
}) => (
  <p className="nb-label mb-4 inline-flex items-center gap-2 border-3 border-ink bg-white px-3 py-1.5 shadow-nb-sm rounded-nb">
    <span>{index}</span>
    <span aria-hidden="true">/</span>
    <span>{label}</span>
  </p>
);

// Section kicker + oversized editorial title.
const SectionHeading: FC<SectionHeadingProps> = ({
  index,
  label,
  title,
  id,
  intro,
}) => (
  <header className="reveal mb-10 sm:mb-14">
    <SectionLabel index={index} label={label} />
    <h2
      id={id}
      className="max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
    >
      {title}
    </h2>
    {intro && (
      <p className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
        {intro}
      </p>
    )}
  </header>
);

export default SectionHeading;
