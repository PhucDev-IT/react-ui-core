import React from 'react';import './radio.scss';
export function Radio({label,...props}:{label:React.ReactNode}&Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'>){return <label className="ui-radio"><input type="radio" {...props}/><span className="ui-radio__dot"/><span>{label}</span></label>}
