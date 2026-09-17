import React from 'react';
import { cx } from '../../utils/cx';
import './steps.scss';
export interface StepItem{title:string;description?:string}
export function Steps({items,current=0,orientation='horizontal'}:{items:StepItem[];current?:number;orientation?:'horizontal'|'vertical'}){return <div className={cx('ui-steps',`ui-steps--${orientation}`)}>{items.map((item,i)=><div key={item.title} className={cx('ui-step',i<current&&'is-done',i===current&&'is-current')}><div className="ui-step__indicator">{i<current?'✓':i+1}</div><div className="ui-step__copy"><strong>{item.title}</strong>{item.description&&<span>{item.description}</span>}</div>{i<items.length-1&&<div className="ui-step__line"/>}</div>)}</div>}
