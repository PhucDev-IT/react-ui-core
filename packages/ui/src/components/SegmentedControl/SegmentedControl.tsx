import React from 'react';
import { cx } from '../../utils/cx';
import './segmented.scss';
export function SegmentedControl<T extends string>({items,value,onChange,fullWidth=false}:{items:{value:T;label:React.ReactNode;disabled?:boolean}[];value:T;onChange:(v:T)=>void;fullWidth?:boolean}){return <div className={cx('ui-segmented',fullWidth&&'is-full')}>{items.map(i=><button key={i.value} type="button" className={cx(value===i.value&&'is-active')} disabled={i.disabled} onClick={()=>onChange(i.value)}>{i.label}</button>)}</div>}
