import React,{useEffect,useMemo,useState} from 'react';
import {Field} from '../Field/Field';
import {cx} from '../../utils/cx';
import './advanced-select.scss';

export type Option={value:string;label:string;disabled?:boolean;group?:string;children?:Option[]};

type BaseProps={label?:React.ReactNode;hint?:React.ReactNode;placeholder?:string;options:Option[];disabled?:boolean;className?:string};

export function MultiSelect({label,hint,placeholder='Chọn...',options,value=[],onChange,maxVisible=3,disabled,className}:{label?:React.ReactNode;hint?:React.ReactNode;placeholder?:string;options:Option[];value?:string[];onChange?:(value:string[])=>void;maxVisible?:number;disabled?:boolean;className?:string}){
 const[open,setOpen]=useState(false);const[q,setQ]=useState('');
 const filtered=useMemo(()=>options.filter(o=>o.label.toLowerCase().includes(q.toLowerCase())),[options,q]);
 const selected=options.filter(o=>value.includes(o.value));
 const toggle=(v:string)=>onChange?.(value.includes(v)?value.filter(x=>x!==v):[...value,v]);
 return <Field label={label} hint={hint}><div className={cx('ui-adv-select',className)}><button type="button" className="ui-adv-select__trigger" disabled={disabled} onClick={()=>setOpen(v=>!v)}><span className="ui-adv-select__chips">{selected.length?selected.slice(0,maxVisible).map(o=><span key={o.value}>{o.label}<i onClick={e=>{e.stopPropagation();toggle(o.value)}}>×</i></span>):<em>{placeholder}</em>}{selected.length>maxVisible&&<b>+{selected.length-maxVisible}</b>}</span><span>⌄</span></button>{open&&<div className="ui-adv-select__menu"><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm kiếm..."/>{filtered.map(o=><button key={o.value} type="button" disabled={o.disabled} className={value.includes(o.value)?'is-selected':''} onClick={()=>toggle(o.value)}><span>{o.label}</span><span>{value.includes(o.value)?'✓':''}</span></button>)}</div>}</div></Field>
}

export function Combobox({label,hint,placeholder='Tìm và chọn...',options,value,onChange,onSearch,creatable=false,disabled}:BaseProps&{value?:string;onChange?:(value:string)=>void;onSearch?:(query:string)=>void;creatable?:boolean}){
 const[q,setQ]=useState('');const[open,setOpen]=useState(false);const selected=options.find(o=>o.value===value);
 useEffect(()=>onSearch?.(q),[q,onSearch]);
 const filtered=options.filter(o=>o.label.toLowerCase().includes(q.toLowerCase()));
 const canCreate=creatable&&q.trim()&&!options.some(o=>o.label.toLowerCase()===q.trim().toLowerCase());
 return <Field label={label} hint={hint}><div className="ui-adv-select"><button type="button" disabled={disabled} className="ui-adv-select__trigger" onClick={()=>setOpen(v=>!v)}><span>{selected?.label||placeholder}</span><span>⌄</span></button>{open&&<div className="ui-adv-select__menu"><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Nhập từ khóa..."/>{filtered.map(o=><button type="button" key={o.value} onClick={()=>{onChange?.(o.value);setOpen(false);setQ('')}}><span>{o.label}</span>{value===o.value&&<span>✓</span>}</button>)}{canCreate&&<button type="button" className="is-create" onClick={()=>{onChange?.(q.trim());setOpen(false);setQ('')}}>+ Tạo “{q.trim()}”</button>}</div>}</div></Field>
}

export function AsyncSelect({loadOptions,...props}:Omit<React.ComponentProps<typeof Combobox>,'options'|'onSearch'>&{loadOptions:(query:string)=>Promise<Option[]>}){
 const[options,setOptions]=useState<Option[]>([]);const[loading,setLoading]=useState(false);let token=0;
 const search=async(q:string)=>{const id=++token;setLoading(true);try{const data=await loadOptions(q);if(id===token)setOptions(data)}finally{if(id===token)setLoading(false)}};
 return <Combobox {...props} options={options} onSearch={search} hint={loading?'Đang tải...':props.hint}/>;
}

export const Autocomplete=Combobox;
export const CreatableSelect=(props:React.ComponentProps<typeof Combobox>)=><Combobox {...props} creatable/>;

export function Cascader({label,hint,options,value=[],onChange,placeholder='Chọn danh mục'}:{label?:React.ReactNode;hint?:React.ReactNode;options:Option[];value?:string[];onChange?:(path:string[])=>void;placeholder?:string}){
 const[open,setOpen]=useState(false);const pathLabels:string[]=[];let level=options;value.forEach(v=>{const item=level.find(x=>x.value===v);if(item){pathLabels.push(item.label);level=item.children||[]}});
 const columns:Option[][]=[options];let current=options;value.forEach(v=>{const item=current.find(x=>x.value===v);if(item?.children?.length){columns.push(item.children);current=item.children}});
 const pick=(depth:number,item:Option)=>{const next=[...value.slice(0,depth),item.value];onChange?.(next);if(!item.children?.length)setOpen(false)};
 return <Field label={label} hint={hint}><div className="ui-adv-select"><button type="button" className="ui-adv-select__trigger" onClick={()=>setOpen(v=>!v)}><span>{pathLabels.length?pathLabels.join(' / '):placeholder}</span><span>⌄</span></button>{open&&<div className="ui-cascader">{columns.map((col,depth)=><div key={depth}>{col.map(item=><button type="button" key={item.value} className={value[depth]===item.value?'is-selected':''} onClick={()=>pick(depth,item)}>{item.label}{item.children?.length?<span>›</span>:null}</button>)}</div>)}</div>}</div></Field>
}
