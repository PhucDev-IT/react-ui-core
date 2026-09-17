import React from 'react';
import { cx } from '../../utils/cx';
import './button.scss';
export type ButtonVariant='primary'|'secondary'|'outline'|'ghost'|'danger';
export type ButtonSize='sm'|'md'|'lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{variant?:ButtonVariant;size?:ButtonSize;loading?:boolean;block?:boolean;leftIcon?:React.ReactNode;rightIcon?:React.ReactNode}
export function Button({variant='primary',size='md',loading=false,block,leftIcon,rightIcon,className,children,disabled,...props}:ButtonProps){return <button className={cx('ui-btn',`ui-btn--${variant}`,`ui-btn--${size}`,block&&'ui-btn--block',className)} disabled={disabled||loading} {...props}>{loading?<span className="ui-spinner ui-spinner--sm"/>:leftIcon}<span>{children}</span>{rightIcon}</button>}
