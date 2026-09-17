import React from 'react';
import {cx} from '../../utils/cx';
import './timeline.scss';

export type TimelineItem={title:React.ReactNode;description?:React.ReactNode;meta?:React.ReactNode;tone?:'primary'|'success'|'warning'|'danger'|'muted';icon?:React.ReactNode};
export function Timeline({items,compact=false}:{items:TimelineItem[];compact?:boolean}){
 return <div className={cx('ui-timeline',compact&&'ui-timeline--compact')}>{items.map((item,i)=><div className="ui-timeline__item" key={i}><div className={cx('ui-timeline__marker',`ui-timeline__marker--${item.tone||'primary'}`)}>{item.icon}</div><div className="ui-timeline__content"><div className="ui-timeline__top"><strong>{item.title}</strong>{item.meta&&<span>{item.meta}</span>}</div>{item.description&&<div className="ui-timeline__description">{item.description}</div>}</div></div>)}</div>
}
