import React from 'react';
import { cx } from '../../utils/cx';
import { Field } from '../Field/Field';
import './textarea.scss';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className, required, ...props }, ref) => (
    <Field label={label} hint={hint} error={error} required={required}>
      <textarea
        ref={ref}
        className={cx('ui-textarea', Boolean(error) && 'is-error', className)}
        required={required}
        {...props}
      />
    </Field>
  ),
);

Textarea.displayName = 'Textarea';
