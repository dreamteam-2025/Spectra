import clsx from "clsx";
import styles from "./RadioCard.module.scss";

export type RadioOption<T extends string | number> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type RadioCardProps<T extends string | number> = {
  name: string;
  value: T;
  onChange: (next: T) => void;
  options: ReadonlyArray<RadioOption<T>>;
  className?: string;
};

export const RadioCard = <T extends string | number>({
  name,
  value,
  onChange,
  options,
  className,
}: RadioCardProps<T>) => {
  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.list}>
        {options.map(option => {
          const active = value === option.value;

          return (
            <label
              key={String(option.value)}
              className={clsx(styles.option, active && styles.active, option.disabled && styles.disabled)}
            >
              <input
                className={styles.input}
                type="radio"
                name={name}
                value={String(option.value)}
                checked={active}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
              />

              <span className={styles.radio} />
              <span className={styles.label}>{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
