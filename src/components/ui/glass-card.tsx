"use client";

import React from "react";

type BaseProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function GlassCard({ children, className = "", ...props }: BaseProps) {
  return (
    <div
      className={[
        "group rounded-[2rem] border border-white/10 bg-white/[0.055]",
        "p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:scale-[1.01]",
        "hover:border-cyan-300/30 hover:shadow-[0_28px_90px_rgba(34,211,238,0.18)]",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCardHeader({ children, className = "", ...props }: BaseProps) {
  return (
    <div className={["mb-5", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function GlassCardTitle({ children, className = "", ...props }: BaseProps) {
  return (
    <h3
      className={[
        "text-2xl font-black tracking-tight text-white",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

export function GlassCardDescription({ children, className = "", ...props }: BaseProps) {
  return (
    <p
      className={[
        "mt-2 text-sm leading-6 text-slate-300",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </p>
  );
}

export function GlassCardContent({ children, className = "", ...props }: BaseProps) {
  return (
    <div className={["space-y-4", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function GlassCardFooter({ children, className = "", ...props }: BaseProps) {
  return (
    <div className={["mt-6 flex flex-wrap gap-3", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export default GlassCard;
