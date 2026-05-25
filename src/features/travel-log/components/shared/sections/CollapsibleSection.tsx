import type { PropsWithChildren } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type CollapsibleSectionProps = PropsWithChildren<{
  title: string;
  defaultOpen?: boolean;
}>;

export const CollapsibleSection = ({ title, defaultOpen = false, children }: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-xl border border-stone-200 bg-white/90 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="text-sm font-semibold text-stone-800">{title}</div>
        <ChevronDown
          className={`size-5 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? <div className="border-t border-stone-100 px-5 py-5">{children}</div> : null}
    </section>
  );
};
