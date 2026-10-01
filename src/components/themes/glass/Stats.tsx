import { CSSProperties, FC } from "react";
import {
  faBolt,
  faClock,
  faCubes,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { stats } from "@/data/profile";
import GlassPanel from "./GlassPanel";
import Icon from "./Icon";
import { SectionsIds } from "./sections";

// One icon per stat, in the same order as `stats` in profile.ts
const statIcons = [faClock, faCubes, faLayerGroup, faBolt];

const Stats: FC = () => (
  <section
    id={SectionsIds.Stats}
    className="lg-section lg-section--tight"
    aria-labelledby="stats-title"
  >
    <div className="lg-container">
      <h2 id="stats-title" className="sr-only">
        Highlights in numbers
      </h2>
      <ul className="stats-grid">
        {stats.map((stat, index) => (
          <li
            key={stat.label}
            data-reveal
            style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
          >
            <GlassPanel className="stat-widget">
              <span className="stat-widget__icon">
                <Icon icon={statIcons[index % statIcons.length]} />
              </span>
              <p className="stat-widget__value">{stat.value}</p>
              <p className="stat-widget__label">{stat.label}</p>
            </GlassPanel>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Stats;
