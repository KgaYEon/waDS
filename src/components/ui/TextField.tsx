import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./TextField.module.css";

export interface TextFieldProps {
  label: string;
  required?: boolean;
  optionalTag?: string;
  placeholder?: string;
  multiline?: boolean;
  maxLength?: number;
  defaultValue?: string;
  className?: string;
}

export default function TextField({
  label,
  required = false,
  optionalTag,
  placeholder = "",
  multiline = false,
  maxLength,
  defaultValue = "",
  className,
}: TextFieldProps) {
  const id = useId();
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
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
