import React from 'react';import './switch.scss';
export function Switch({label,...props}:{label?:React.ReactNode}&Omit<React.InputHTMLAttributes<HTMLInputElement>,'type'>){return <label className="ui-switch"><input type="checkbox" {...props}/><span className="ui-switch__track"><span/></span>{label&&<span>{label}</span>}</label>}
