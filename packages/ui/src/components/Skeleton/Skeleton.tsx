import React from 'react';
import './skeleton.scss';

export interface SkeletonProps{width?:string|number;height?:string|number;radius?:string|number;className?:string}
export function Skeleton({width='100%',height=16,radius,className}:SkeletonProps){return <span aria-hidden className={['ui-skeleton',className].filter(Boolean).join(' ')} style={{width,height,borderRadius:radius}}/>}

export function SkeletonText({lines=3,lastLineWidth='68%',gap=8}:{lines?:number;lastLineWidth?:string|number;gap?:number}){return <div className="ui-skeleton-text" style={{gap}}>{Array.from({length:lines},(_,i)=><Skeleton key={i} height={12} width={i===lines-1?lastLineWidth:'100%'} radius={5}/>)}</div>}

export function SkeletonAvatar({size=40}:{size?:number}){return <Skeleton width={size} height={size} radius="50%"/>}

export function SkeletonCard({media=true,lines=3}:{media?:boolean;lines?:number}){return <div className="ui-skeleton-card">{media&&<Skeleton height={150} radius="var(--ui-radius-md)"/>}<Skeleton height={18} width="56%" radius={5}/><SkeletonText lines={lines}/><div className="ui-skeleton-card__actions"><Skeleton width={86} height={34}/><Skeleton width={72} height={34}/></div></div>}

export function SkeletonList({items=4,avatar=true}:{items?:number;avatar?:boolean}){return <div className="ui-skeleton-list">{Array.from({length:items},(_,i)=><div className="ui-skeleton-list__item" key={i}>{avatar&&<SkeletonAvatar size={38}/>}<div><Skeleton height={13} width={i%2?'54%':'68%'} radius={5}/><Skeleton height={10} width={i%2?'78%':'61%'} radius={5}/></div></div>)}</div>}

export function SkeletonTable({rows=5,columns=5}:{rows?:number;columns?:number}){return <div className="ui-skeleton-table"><div className="ui-skeleton-table__row is-head">{Array.from({length:columns},(_,i)=><Skeleton key={i} height={10} width={i===0?'72%':'56%'} radius={4}/>)}</div>{Array.from({length:rows},(_,r)=><div className="ui-skeleton-table__row" key={r}>{Array.from({length:columns},(_,c)=><Skeleton key={c} height={12} width={c===0?(r%2?'82%':'68%'):(c===columns-1?'45%':'62%')} radius={4}/>)}</div>)}</div>}

export function SkeletonForm({fields=4}:{fields?:number}){return <div className="ui-skeleton-form">{Array.from({length:fields},(_,i)=><div key={i}><Skeleton width={i%2?'32%':'26%'} height={10} radius={4}/><Skeleton height={40} radius="var(--ui-radius-control)"/></div>)}<div className="ui-skeleton-form__actions"><Skeleton width={92} height={38}/><Skeleton width={112} height={38}/></div></div>}

export function SkeletonProductCard(){return <div className="ui-skeleton-product"><Skeleton height={210} radius="var(--ui-radius-md)"/><Skeleton height={13} width="74%" radius={5}/><Skeleton height={11} width="48%" radius={5}/><Skeleton height={16} width="34%" radius={5}/></div>}

export function SkeletonPage(){return <div className="ui-skeleton-page"><div className="ui-skeleton-page__head"><div><Skeleton width={120} height={10}/><Skeleton width={310} height={28}/><Skeleton width={460} height={12}/></div><Skeleton width={118} height={40}/></div><div className="ui-skeleton-page__stats">{Array.from({length:4},(_,i)=><div key={i}><Skeleton width="44%" height={10}/><Skeleton width="62%" height={25}/><Skeleton width="52%" height={10}/></div>)}</div><SkeletonTable rows={6} columns={5}/></div>}
