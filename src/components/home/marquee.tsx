import { FC } from "react";
import { skills } from "@/data/profile";

// "Angular (v18–v22)" -> "Angular": the band only needs the short names.
const marqueeItems = skills
  .flatMap((group) => group.items)
  .map((item) => item.replace(/\s*\(.*\)$/, ""));

// Decorative tape of technologies. The full list is in the Skills section,
// so the band is hidden from assistive technology.
const Marquee: FC = () => (
  <div className="overflow-hidden py-10 sm:py-14" aria-hidden="true">
    <div className="nb-marquee nb-dark -mx-4 -rotate-2 border-y-3 border-ink bg-ink py-4 text-paper sm:py-5">
      <div className="nb-marquee__track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {marqueeItems.map((item) => (
              <li
                key={item}
                className="flex items-center whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight sm:text-4xl"
              >
                <span className="px-5 sm:px-7">{item}</span>
                <span className="text-sun">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  </div>
);

export default Marquee;
