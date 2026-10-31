import type { ReactNode } from "react";

const inputBase =
  "mt-2 block w-full rounded-sm border bg-white px-4 py-3 text-[1rem] text-ink transition-colors placeholder:text-muted/70 focus:border-moss focus:outline-2 focus:outline-offset-0 focus:outline-moss/40";

function borderFor(error?: string): string {
  return error ? "border-danger" : "border-line hover:border-sage";
}

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

function FieldShell({ id, label, required, hint, error, children, className = "" }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.92rem] font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-[0.82rem] font-normal text-muted">(optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.85rem] text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-[0.88rem] font-medium text-danger">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-.75 4h1.5v5.5h-1.5V6zm0 7h1.5v1.5h-1.5V13z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  className?: string;
};

export function TextField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  hint,
  required = false,
  type = "text",
  autoComplete,
  className,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error} className={className}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        onChange={(event) => onChange(name, event.target.value)}
        className={`${inputBase} ${borderFor(error)}`}
      />
    </FieldShell>
  );
}

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (name: string, value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
};

export function SelectField({ id, name, label, value, options, onChange, error, required = false, className }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <select
        id={id}
        name={name}
        value={value}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, undefined, error)}
        onChange={(event) => onChange(name, event.target.value)}
        className={`${inputBase} ${borderFor(error)} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%20fill='none'%20stroke='%23315a42'%20stroke-width='1.6'%3E%3Cpath%20d='M5%208l5%205%205-5'/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-11`}
      >
        <option value="">Please choose…</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  hint?: string;
  maxLength: number;
  className?: string;
};

export function TextAreaField({ id, name, label, value, onChange, error, hint, maxLength, className }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} required hint={hint} error={error} className={className}>
      <textarea
        id={id}
        name={name}
        value={value}
        rows={6}
        maxLength={maxLength}
        aria-required
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        onChange={(event) => onChange(name, event.target.value)}
        className={`${inputBase} ${borderFor(error)} min-h-40 resize-y`}
      />
      <p className="mt-1 text-right text-[0.8rem] tabular-nums text-muted">
        {value.length} / {maxLength}
      </p>
    </FieldShell>
  );
}
