import { useId } from "react";
import type { ChangeEvent } from "react";
import styles from "./TextField.module.css";

export interface TextFieldProps {
  label: string;
  required?: boolean;
  optionalTag?: string;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Controlled (value/onChange are required, not internal state) so a
 * parent screen can read the current value — e.g. to enable/disable a
 * submit button once every required field has something in it.
 */
export default function TextField({
  label,
  required = false,
  optionalTag,
  placeholder = "",
  multiline = false,
  maxLength,
  value,
  onChange,
  className,
}: TextFieldProps) {
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {required && <span className={styles.required}>*</span>}
        {optionalTag && <span className={styles.optionalTag}>{optionalTag}</span>}
      </div>

      {multiline ? (
        <textarea
          id={id}
          className={styles.input}
          rows={6}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          id={id}
          className={styles.input}
          placeholder={placeholder}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
        />
      )}

      {multiline && maxLength && (
        <div className={styles.counterRow}>
          <span className={styles.counterHint}>최대 {maxLength.toLocaleString()}자</span>
          <span className={styles.counterValue}>
            {value.length.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
