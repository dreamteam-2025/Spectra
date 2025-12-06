import { ComponentProps, forwardRef, useId } from "react";
import s from "./TextArea.module.scss";
import { Primitive } from "@radix-ui/react-primitive";

type Props = {
  label?: string;
  id?: string;
  error?: string;
  wrapperClassName?: string;
  className?: string;
  disabled?: boolean;
} & ComponentProps<"textarea">;

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, id, error, wrapperClassName, className, disabled = false, ...rest }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    const hasError = Boolean(error);

    const textAreaClasses = [s.textarea, hasError && !disabled ? s.error : "", disabled ? s.disabled : "", className]
      .filter(Boolean)
      .join(" ");

    const labelClasses = [s.label, disabled ? s.labelDisabled : ""].filter(Boolean).join(" ");

    return (
      <div className={`${s.wrapper} ${wrapperClassName}`}>
        {label && (
          <Primitive.label htmlFor={textareaId} className={labelClasses}>
            {label}
          </Primitive.label>
        )}
        <textarea ref={ref} id={textareaId} className={textAreaClasses} disabled={disabled} {...rest} />
        {hasError && !disabled && <Primitive.p className={s.errorText}>{error}</Primitive.p>}
      </div>
    );
  }
);
