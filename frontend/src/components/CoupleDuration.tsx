import { Heart } from "lucide-react";

interface DurationValue {
  label: string;
  value: string;
}

const parseAnniversary = (anniversary: string): Date | null => {
  const [year, month, day] = anniversary.split("T")[0].split("-").map(Number);
  if (year == null || month == null || day == null) return null;
  return new Date(year, month - 1, day);
};

const countDuration = (
  start: Date,
  end: Date,
): { years: number; months: number; days: number } | null => {
  if (end < start) return null;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
};

const pluralize = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

export const CoupleDuration = ({
  anniversary,
}: {
  anniversary?: string | null;
}) => {
  const anniversaryDate = anniversary ? parseAnniversary(anniversary) : null;
  const duration =
    anniversaryDate != null
      ? countDuration(anniversaryDate, new Date())
      : null;

  if (duration == null) return null;

  const values: DurationValue[] = [
    { value: String(duration.years), label: pluralize(duration.years, "year", "years") },
    { value: String(duration.months), label: pluralize(duration.months, "month", "months") },
    { value: String(duration.days), label: pluralize(duration.days, "day", "days") },
  ];

  const rendered = values.map((unit, index) => (
    <span
      key={unit.label + index}
      className="flex flex-col items-center gap-0.5 text-center"
    >
      <span
        className="text-2xl font-semibold leading-none text-[#b45f53] sm:text-3xl"
        style={{ fontFamily: "Literata" }}
      >
        {unit.value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-[#7c4439] sm:text-xs">
        {unit.label}
      </span>
    </span>
  ));

  return (
    <div className="mt-8 flex w-full max-w-md items-center justify-center gap-x-3 whitespace-nowrap rounded-2xl border border-[#f0b8a5] bg-[#fff8f5] px-5 py-4 shadow-sm">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-[#7c4439]">
        <Heart size={15} className="fill-[#b45f53] text-[#b45f53]" />
        Together for
      </span>
      <span className="flex items-center gap-x-2.5">{rendered}</span>
    </div>
  );
};