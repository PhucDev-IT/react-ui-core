import React from 'react';import './checkbox.scss';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'>{label?:React.ReactNode;description?:React.ReactNode}
export function Checkbox({label,description,...props}:CheckboxProps){return <label className="ui-check"><input type="checkbox" {...props}/><span className="ui-check__box">✓</span><span><span className="ui-check__label">{label}</span>{description&&<span className="ui-check__desc">{description}</span>}</span></label>}
