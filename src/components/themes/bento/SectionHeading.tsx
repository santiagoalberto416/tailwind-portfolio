type SectionHeadingProps = {
  headingId: string;
  eyebrow: string;
  title: string;
  description?: string;
};

// Shared heading for each home page section: mono eyebrow + large title.
const SectionHeading = ({ headingId, eyebrow, title, description }: SectionHeadingProps) => (
  <header data-reveal className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-10">
    <div>
      <p className="font-geist-mono text-xs uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2
        id={headingId}
        className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white md:text-5xl"
      >
        {title}
      </h2>
    </div>
    {description && (
      <p className="max-w-md text-[15px] leading-relaxed text-zinc-400">
        {description}
      </p>
    )}
  </header>
);

export default SectionHeading;
