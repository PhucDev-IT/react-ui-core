import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Field } from '../Field/Field';
import { cx } from '../../utils/cx';
import './select.scss';

export interface SelectOption { value: string; label: React.ReactNode; disabled?: boolean }
export interface SelectProps {
  label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; required?: boolean;
  value?: string; defaultValue?: string; placeholder?: string; disabled?: boolean; className?: string;
  name?: string; options?: SelectOption[]; children?: React.ReactNode; onChange?: (value:string)=>void;
}

function childOptions(children:React.ReactNode):SelectOption[]{
  return React.Children.toArray(children).flatMap((child)=>{
    if(!React.isValidElement(child) || child.type!=='option') return [];
    const p=child.props as React.OptionHTMLAttributes<HTMLOptionElement>;
    const label=p.children;
    const value=String(p.value ?? (typeof label==='string'||typeof label==='number'?label:''));
    return [{value,label,disabled:p.disabled}];
  });
}

export function Select({label,hint,error,required,value,defaultValue,placeholder='Chọn...',disabled,className,name,options,children,onChange}:SelectProps){
  const items=useMemo(()=>options?.length?options:childOptions(children),[options,children]);
  const controlled=value!==undefined;
  const [inner,setInner]=useState(defaultValue ?? items[0]?.value ?? '');
  const current=controlled?value!:inner;
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState(()=>Math.max(0,items.findIndex(x=>x.value===current)));
  const root=useRef<HTMLDivElement>(null);
  const selected=items.find(x=>x.value===current);
  useEffect(()=>{const fn=(e:MouseEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('mousedown',fn);return()=>document.removeEventListener('mousedown',fn)},[]);
  useEffect(()=>{const i=items.findIndex(x=>x.value===current);if(i>=0)setActive(i)},[current,items]);
  const choose=(item:SelectOption)=>{if(item.disabled)return;if(!controlled)setInner(item.value);onChange?.(item.value);setOpen(false)};
  const move=(delta:number)=>{let i=active;for(let c=0;c<items.length;c++){i=(i+delta+items.length)%items.length;if(!items[i]?.disabled){setActive(i);break}}};
  return <Field label={label} hint={hint} error={error} required={required}>
    <div ref={root} className={cx('ui-select',open&&'is-open',disabled&&'is-disabled',Boolean(error)&&'is-error',className)}>
      {name&&<input type="hidden" name={name} value={current}/>} 
      <button type="button" className="ui-select__control" aria-haspopup="listbox" aria-expanded={open} disabled={disabled}
        onClick={()=>setOpen(v=>!v)} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();if(!open)setOpen(true);move(1)}else if(e.key==='ArrowUp'){e.preventDefault();if(!open)setOpen(true);move(-1)}else if(e.key==='Enter'&&open){e.preventDefault();items[active]&&choose(items[active])}else if(e.key==='Escape')setOpen(false)}}>
        <span className={cx('ui-select__value',!selected&&'is-placeholder')}>{selected?.label ?? placeholder}</span>
        <svg viewBox="0 0 20 20" aria-hidden><path d="m5 7.5 5 5 5-5"/></svg>
      </button>
      {open&&<div className="ui-select__menu" role="listbox">{items.map((item,i)=><button key={`${item.value}-${i}`} type="button" role="option" aria-selected={item.value===current} disabled={item.disabled} className={cx('ui-select__option',item.value===current&&'is-selected',i===active&&'is-active')} onMouseEnter={()=>setActive(i)} onClick={()=>choose(item)}><span>{item.label}</span>{item.value===current&&<b>✓</b>}</button>)}</div>}
    </div>
  </Field>
}
