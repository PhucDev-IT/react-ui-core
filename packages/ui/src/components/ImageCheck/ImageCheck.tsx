import React from 'react';
import { cx } from '../../utils/cx';
import './imagecheck.scss';
export interface ImageCheckProps{src:string;alt:string;label?:React.ReactNode;description?:React.ReactNode;checked?:boolean;onChange?:(checked:boolean)=>void;type?:'checkbox'|'radio';name?:string;value?:string;disabled?:boolean;className?:string}
export function ImageCheck({src,alt,label,description,checked=false,onChange,type='checkbox',name,value,disabled,className}:ImageCheckProps){return <label className={cx('ui-image-check',checked&&'is-checked',disabled&&'is-disabled',className)}><input type={type} name={name} value={value} checked={checked} disabled={disabled} onChange={e=>onChange?.(e.target.checked)}/><div className="ui-image-check__media"><img src={src} alt={alt}/><span className="ui-image-check__mark">✓</span></div>{(label||description)&&<div className="ui-image-check__copy">{label&&<strong>{label}</strong>}{description&&<span>{description}</span>}</div>}</label>}
export function ImageCheckGrid({children}:{children:React.ReactNode}){return <div className="ui-image-check-grid">{children}</div>}
