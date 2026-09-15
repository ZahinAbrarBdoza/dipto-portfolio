"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

/**
 * One label, one control, one error, wired together. The floating look is done
 * with a peer-driven label so there is no placeholder-as-label — the field is
 * still readable when it has content and when it does not.
 */
function Shell({
  id,
  label,
  error,
  hint,
  hintId,
  errorId,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  hintId: string;
  errorId: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("group/field relative flex flex-col", className)}>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-0 top-0 origin-left text-[0.95rem] text-faint",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            // Resting: sitting on the input's own baseline.
            "translate-y-[1.5rem] scale-100",
            // Raised whenever the field is focused or holds a value. Both rules
            // carry the same specificity, so source order cannot flip them.
            "peer-focus:translate-y-[0.1rem] peer-focus:scale-[0.78] peer-focus:text-accent",
            "peer-[:not(:placeholder-shown)]:translate-y-[0.1rem] peer-[:not(:placeholder-shown)]:scale-[0.78]",
          )}
        >
          {label}
          {required ? (
            <span aria-hidden className="text-accent">
              {" "}
              *
            </span>
          ) : null}
        </label>
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "peer-focus:scale-x-100",
            error ? "scale-x-100 bg-accent" : "bg-accent",
          )}
        />
      </div>

      {hint ? (
        <span id={hintId} className="mt-1.5 text-[0.75rem] text-faint">
          {hint}
        </span>
      ) : null}

      {error ? (
        <span id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-accent">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          {error}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Shared control skin. Padding is applied per control to avoid class clashes.
 * The underline uses `line-control`, not `line`: it is the only thing marking
 * where a field is, so it has to clear 3:1 (WCAG 1.4.11), which the decorative
 * rule colour does not.
 */
const controlBase =
  "peer w-full border-0 border-b border-line-control bg-transparent text-[0.95rem] text-ink " +
  "placeholder:text-transparent focus:border-accent focus:outline-none focus-visible:outline-none " +
  "transition-colors duration-300";

const controlClasses = `${controlBase} pb-2 pt-6`;

export function TextField({
  label,
  name,
  error,
  hint,
  required,
  className,
  type = "text",
  autoComplete,
  value,
  onChange,
}: BaseProps & {
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <Shell
      id={id}
      label={label}
      error={error}
      hint={hint}
      hintId={hintId}
      errorId={errorId}
      required={required}
      className={className}
    >
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error ? errorId : undefined, hint ? hintId : undefined) || undefined}
        onChange={(event) => onChange(event.target.value)}
        data-cursor="text"
        className={controlClasses}
      />
    </Shell>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  required,
  className,
  rows = 4,
  value,
  onChange,
}: BaseProps & { rows?: number; value: string; onChange: (value: string) => void }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <Shell
      id={id}
      label={label}
      error={error}
      hint={hint}
      hintId={hintId}
      errorId={errorId}
      required={required}
      className={className}
    >
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        required={required}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error ? errorId : undefined, hint ? hintId : undefined) || undefined}
        onChange={(event) => onChange(event.target.value)}
        data-cursor="text"
        className={cn(controlClasses, "resize-none")}
      />
    </Shell>
  );
}

export function SelectField({
  label,
  name,
  error,
  required,
  className,
  options,
  value,
  onChange,
}: BaseProps & {
  /** readonly, so an `as const` options list can be passed straight in. */
  options: readonly { readonly value: string; readonly label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* h-6 matches the input's pt-6, so the select's value sits on the same
          baseline as the text fields beside it. */}
      <label htmlFor={id} className="block h-6 text-[0.78rem] leading-6 text-faint">
        {label}
        {required ? (
          <span aria-hidden className="text-accent">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={cn(controlBase, "cursor-pointer appearance-none pb-2 pr-8")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-surface text-ink">
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-1 text-faint"
        >
          <svg viewBox="0 0 12 8" className="h-2.5 w-2.5" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </div>
      {error ? (
        <span id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] text-accent">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          {error}
        </span>
      ) : null}
    </div>
  );
}
