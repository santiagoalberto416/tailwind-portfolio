import { useEffect, useState } from "react";

const TIME_ZONE = "America/Tijuana";

const timeFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
  timeZoneName: "short",
});

// Splits the current Tijuana time into the pieces the tile displays,
// e.g. { time: "09:41", seconds: "07", zone: "PDT" }.
const formatParts = (date: Date) => {
  const parts = timeFormat.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return {
    time: `${get("hour")}:${get("minute")}`,
    seconds: get("second"),
    zone: get("timeZoneName"),
  };
};

// Live clock for Tijuana. Renders a placeholder on the server and starts
// ticking after hydration to avoid a server/client mismatch.
const LocalTime = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = now ? formatParts(now) : null;

  return (
    <p className="font-geist-mono text-4xl font-medium tabular-nums tracking-tight text-white">
      <time dateTime={now?.toISOString()}>{parts?.time ?? "--:--"}</time>
      <span className="text-xl text-zinc-500">:{parts?.seconds ?? "--"}</span>
      <span className="ml-2 align-middle text-xs uppercase tracking-[0.18em] text-zinc-500">
        {parts?.zone ?? "PT"}
      </span>
    </p>
  );
};

export default LocalTime;
