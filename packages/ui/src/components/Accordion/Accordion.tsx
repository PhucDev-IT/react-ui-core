import React,{useState} from 'react';
import { cx } from '../../utils/cx';
import './accordion.scss';
export interface AccordionItem{value:string;title:string;content:React.ReactNode;disabled?:boolean}
export function Accordion({items,multiple=false,defaultOpen=[]}:{items:AccordionItem[];multiple?:boolean;defaultOpen?:string[]}){const[open,setOpen]=useState(defaultOpen);const toggle=(v:string)=>setOpen(x=>multiple?(x.includes(v)?x.filter(i=>i!==v):[...x,v]):(x.includes(v)?[]:[v]));return <div className="ui-accordion">{items.map(item=>{const active=open.includes(item.value);return <section className={cx('ui-accordion__item',active&&'is-open')} key={item.value}><button disabled={item.disabled} aria-expanded={active} onClick={()=>toggle(item.value)}><span>{item.title}</span><span className="ui-accordion__chevron">⌄</span></button>{active&&<div className="ui-accordion__panel">{item.content}</div>}</section>})}</div>}
