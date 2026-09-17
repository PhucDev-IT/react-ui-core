import React from 'react';
import { cx } from '../../utils/cx';
import { Field } from '../Field/Field';
import './input.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, prefix, suffix, className, required, ...props }, ref) => (
    <Field label={label} hint={hint} error={error} required={required}>
      <div className={cx('ui-input-wrap', Boolean(error) && 'is-error')}>
        {prefix && <span className="ui-input__addon">{prefix}</span>}
        <input
          ref={ref}
          className={cx('ui-input', className)}
          required={required}
          {...props}
        />
        {suffix && <span className="ui-input__addon">{suffix}</span>}
      </div>
    </Field>
  ),
);

Input.displayName = 'Input';
