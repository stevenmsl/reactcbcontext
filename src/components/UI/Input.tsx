import React, {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";
import classes from "./Input.module.css";

type InputProps = {
  isValid?: boolean;
  id?: string | undefined;
  label?: string;
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
};

/* #TA07 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isValid, id, label, type, value, onChange, onBlur }, ref) => {
    return (
      <div className={`${classes.control} ${isValid ? "" : classes.invalid}`}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

export default Input;
