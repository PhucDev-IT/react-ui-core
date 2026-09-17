import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Field } from '../Field/Field';
import { cx } from '../../utils/cx';
import './datepicker.scss';

type DateLike = Date | string | null | undefined;
export interface DateRangeValue { start: Date | null; end: Date | null }
export interface DatePickerProps {
  label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; required?: boolean;
  value?: DateLike; defaultValue?: DateLike; onChange?: (date:Date|null)=>void;
  range?: false; inline?: boolean; placeholder?: string; minDate?: DateLike; maxDate?: DateLike; disabled?: boolean; className?: string;
}
export interface DateRangePickerProps {
  label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; required?: boolean;
  value?: DateRangeValue; defaultValue?: DateRangeValue; onChange?: (range:DateRangeValue)=>void;
  inline?: boolean; placeholder?: string; minDate?: DateLike; maxDate?: DateLike; disabled?: boolean; className?: string;
}
const VN_MONTHS=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
const DOW=['T2','T3','T4','T5','T6','T7','CN'];
function toDate(v:DateLike){if(!v)return null;const d=v instanceof Date?new Date(v):new Date(v);return Number.isNaN(d.getTime())?null:d}
function dayKey(d:Date){return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`}
function sameDay(a:Date|null|undefined,b:Date|null|undefined){return !!a&&!!b&&dayKey(a)===dayKey(b)}
function atStart(d:Date){return new Date(d.getFullYear(),d.getMonth(),d.getDate())}
function formatDate(d:Date|null|undefined){if(!d)return '';return new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}).format(d)}
function inRange(d:Date,start:Date|null|undefined,end:Date|null|undefined){if(!start||!end)return false;const t=atStart(d).getTime();return t>atStart(start).getTime()&&t<atStart(end).getTime()}
function calendarDays(view:Date){const y=view.getFullYear(),m=view.getMonth();const first=new Date(y,m,1);const mondayIndex=(first.getDay()+6)%7;const start=new Date(y,m,1-mondayIndex);return Array.from({length:42},(_,i)=>new Date(start.getFullYear(),start.getMonth(),start.getDate()+i))}
function Calendar({view,setView,selected,rangeStart,rangeEnd,onPick,minDate,maxDate}:{view:Date;setView:(d:Date)=>void;selected?:Date|null;rangeStart?:Date|null;rangeEnd?:Date|null;onPick:(d:Date)=>void;minDate?:Date|null;maxDate?:Date|null}){
 const days=useMemo(()=>calendarDays(view),[view]); const today=atStart(new Date());
 const blocked=(d:Date)=>!!((minDate&&atStart(d)<atStart(minDate))||(maxDate&&atStart(d)>atStart(maxDate)));
 return <div className="ui-calendar">
  <div className="ui-calendar__head"><button type="button" onClick={()=>setView(new Date(view.getFullYear(),view.getMonth()-1,1))} aria-label="Tháng trước">‹</button><strong>{VN_MONTHS[view.getMonth()]} {view.getFullYear()}</strong><button type="button" onClick={()=>setView(new Date(view.getFullYear(),view.getMonth()+1,1))} aria-label="Tháng sau">›</button></div>
  <div className="ui-calendar__dow">{DOW.map(x=><span key={x}>{x}</span>)}</div>
  <div className="ui-calendar__grid">{days.map(d=>{const other=d.getMonth()!==view.getMonth();const isSel=sameDay(d,selected);const isStart=sameDay(d,rangeStart);const isEnd=sameDay(d,rangeEnd);const between=inRange(d,rangeStart??null,rangeEnd??null);return <button key={dayKey(d)} type="button" disabled={blocked(d)} className={cx('ui-calendar__day',other&&'is-other',sameDay(d,today)&&'is-today',(isSel||isStart||isEnd)&&'is-selected',between&&'is-in-range',isStart&&'is-range-start',isEnd&&'is-range-end')} onClick={()=>onPick(d)}>{d.getDate()}</button>})}</div>
 </div>
}
function Popover({open,children}:{open:boolean;children:React.ReactNode}){return open?<div className="ui-datepicker__popover">{children}</div>:null}
export function DatePicker({label,hint,error,required,value,defaultValue,onChange,inline=false,placeholder='Chọn ngày',minDate,maxDate,disabled,className}:DatePickerProps){
 const controlled=value!==undefined;const [inner,setInner]=useState<Date|null>(()=>toDate(defaultValue));const selected=controlled?toDate(value):inner;const [view,setView]=useState(()=>selected??new Date());const [open,setOpen]=useState(false);const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const fn=(e:MouseEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('mousedown',fn);return()=>document.removeEventListener('mousedown',fn)},[]);
 const pick=(d:Date)=>{if(!controlled)setInner(d);onChange?.(d);setView(d);if(!inline)setOpen(false)};
 const cal=<Calendar view={view} setView={setView} selected={selected} onPick={pick} minDate={toDate(minDate)} maxDate={toDate(maxDate)}/>;
 if(inline)return <Field label={label} hint={hint} error={error} required={required}><div className={cx('ui-datepicker is-inline',className)}>{cal}</div></Field>;
 return <Field label={label} hint={hint} error={error} required={required}><div ref={root} className={cx('ui-datepicker',open&&'is-open',className)}><button className="ui-datepicker__trigger" type="button" onClick={()=>!disabled&&setOpen(v=>!v)} disabled={disabled}><span className={selected?'':'is-placeholder'}>{selected?formatDate(selected):placeholder}</span><svg viewBox="0 0 24 24" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg></button><Popover open={open}>{cal}</Popover></div></Field>
}
export function DateRangePicker({label,hint,error,required,value,defaultValue,onChange,inline=false,placeholder='Chọn khoảng ngày',minDate,maxDate,disabled,className}:DateRangePickerProps){
 const controlled=value!==undefined;const [inner,setInner]=useState<DateRangeValue>(()=>defaultValue??{start:null,end:null});const current=controlled?value!:inner;const [draft,setDraft]=useState<DateRangeValue>(current);const [view,setView]=useState(()=>current.start??new Date());const [open,setOpen]=useState(false);const root=useRef<HTMLDivElement>(null);
 useEffect(()=>setDraft(current),[current.start?.getTime(),current.end?.getTime()]);useEffect(()=>{const fn=(e:MouseEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('mousedown',fn);return()=>document.removeEventListener('mousedown',fn)},[]);
 const commit=(next:DateRangeValue)=>{setDraft(next);if(next.start&&next.end){if(!controlled)setInner(next);onChange?.(next);if(!inline)setOpen(false)}};
 const pick=(d:Date)=>{if(!draft.start||draft.end){setDraft({start:d,end:null});return}if(d<draft.start){commit({start:d,end:draft.start})}else commit({start:draft.start,end:d})};
 const text=current.start?`${formatDate(current.start)}${current.end?` – ${formatDate(current.end)}`:''}`:placeholder;const cal=<Calendar view={view} setView={setView} rangeStart={draft.start} rangeEnd={draft.end} onPick={pick} minDate={toDate(minDate)} maxDate={toDate(maxDate)}/>;
 if(inline)return <Field label={label} hint={hint} error={error} required={required}><div className={cx('ui-datepicker is-inline',className)}>{cal}</div></Field>;
 return <Field label={label} hint={hint} error={error} required={required}><div ref={root} className={cx('ui-datepicker',open&&'is-open',className)}><button className="ui-datepicker__trigger" type="button" onClick={()=>!disabled&&setOpen(v=>!v)} disabled={disabled}><span className={current.start?'':'is-placeholder'}>{text}</span><svg viewBox="0 0 24 24" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg></button><Popover open={open}>{cal}</Popover></div></Field>
}
