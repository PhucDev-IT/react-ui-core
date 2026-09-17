import React from 'react';import './breadcrumb.scss';
export interface BreadcrumbItem{label:React.ReactNode;href?:string}
export function Breadcrumb({items}:{items:BreadcrumbItem[]}){return <nav className="ui-breadcrumb" aria-label="Breadcrumb">{items.map((i,idx)=><React.Fragment key={idx}>{idx>0&&<span>/</span>}{i.href?<a href={i.href}>{i.label}</a>:<span>{i.label}</span>}</React.Fragment>)}</nav>}
