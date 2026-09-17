import React from 'react';import {cx} from '../../utils/cx';import './tabs.scss';
export interface TabItem{value:string;label:React.ReactNode;disabled?:boolean}
export function Tabs({items,value,onChange}:{items:TabItem[];value:string;onChange:(v:string)=>void}){return <div className="ui-tabs" role="tablist">{items.map(i=><button key={i.value} disabled={i.disabled} className={cx('ui-tabs__item',value===i.value&&'is-active')} onClick={()=>onChange(i.value)} role="tab">{i.label}</button>)}</div>}
