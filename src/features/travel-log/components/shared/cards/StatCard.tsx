import { hasValue } from "#features/travel-log/utils/valueUtils";

type StatCardProps = {
  label: string;
  value: string | number | null | undefined;
  description?: string;
};

export const StatCard = ({ label, value, description }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-stone-900">
        {hasValue(value) ? value : "—"}
        <p className="mt-2 text-xs leading-tight text-stone-500">{hasValue(description) ? description : ""}</p>
      </div>
    </div>
  );
};

