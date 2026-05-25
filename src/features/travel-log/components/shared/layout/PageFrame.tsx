import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string;
};

type PageFrameProps = {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  coverImage?: string;
  children: ReactNode;
};

const PageFrame = ({
  eyebrow,
  title,
  description,
  crumbs = [],
  coverImage,
  children,
}: PageFrameProps) => {
  return (
    <div className="min-h-screen bg-mainPage px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        {crumbs.length ? (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500">
            {crumbs.map((crumb, index) => (
              <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.to ? (
                  <Link to={crumb.to} className="transition hover:text-emerald-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-stone-900">{crumb.label}</span>
                )}

                {index < crumbs.length - 1 ? <ChevronRight className="size-4 text-stone-300" /> : null}
              </div>
            ))}
          </div>
        ) : null}

        <header className="mb-7 overflow-hidden rounded-xl border border-stone-200 bg-white/80 shadow-sm">
          <div className={`relative ${coverImage ? "min-h-[220px] md:min-h-[260px]" : ""}`}>
            {coverImage ? (
              <>
                <div className="pointer-events-none absolute inset-0">
                  <img
                    src={coverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-[25%_75%]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-white/34 md:bg-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/26 md:hidden" />
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[46%] bg-gradient-to-r from-white via-white/72 via-emerald-50/18 to-transparent md:block" />
              </>
            ) : null}

            <div className="relative z-10 max-w-2xl p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900">{eyebrow}</div>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl">{title}</h1>

              {description ? (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 md:text-base">{description}</p>
              ) : null}
            </div>
          </div>
        </header>

        <main className="space-y-5">{children}</main>
      </div>
    </div>
  );
};

export default PageFrame;
