type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email";
  required?: boolean;
  optional?: boolean;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
};

export function Input({
  id,
  name,
  label,
  type = "text",
  required,
  optional,
  error,
  disabled,
  autoComplete,
  placeholder,
  maxLength,
}: InputProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="text-left">
      <label htmlFor={id} className="block text-sm font-medium text-text-primary">
        {label}
        {required ? (
          <span className="text-text-muted"> *</span>
        ) : optional ? (
          <span className="ml-1 font-normal text-text-faint">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className="mt-2 min-h-11 w-full rounded-[4px] border border-border-subtle bg-bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint transition-colors hover:border-text-faint focus-visible:outline-none disabled:opacity-50"
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
