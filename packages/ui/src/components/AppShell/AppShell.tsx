import React,{useEffect,useState} from 'react';
import { cx } from '../../utils/cx';
import './appshell.scss';
export interface AppShellProps{sidebar:React.ReactNode;header:React.ReactNode;children:React.ReactNode;sidebarCollapsed?:boolean;onSidebarCollapsedChange?:(collapsed:boolean)=>void;collapsible?:boolean;stickyHeader?:boolean}
export function AppShell({sidebar,header,children,sidebarCollapsed,onSidebarCollapsedChange,collapsible=false,stickyHeader=true}:AppShellProps){
 const[mobileOpen,setMobileOpen]=useState(false);const[innerCollapsed,setInnerCollapsed]=useState(false);const collapsed=sidebarCollapsed??innerCollapsed;const setCollapsed=(v:boolean)=>{if(sidebarCollapsed===undefined)setInnerCollapsed(v);onSidebarCollapsedChange?.(v)};
 useEffect(()=>{if(!mobileOpen)return;const h=(e:KeyboardEvent)=>e.key==='Escape'&&setMobileOpen(false);addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[mobileOpen]);
 return <div className={cx('ui-shell',collapsed&&'is-collapsed',!stickyHeader&&'is-header-static')}>
  <aside className="ui-shell__sidebar">{sidebar}{collapsible&&<button type="button" className="ui-shell__collapse-toggle" onClick={()=>setCollapsed(!collapsed)} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'}>{collapsed?'›':'‹'}</button>}</aside>
  <div className={`ui-shell__mobile-backdrop ${mobileOpen?'is-open':''}`} onClick={()=>setMobileOpen(false)}/>
  <aside className={`ui-shell__mobile-sidebar ${mobileOpen?'is-open':''}`}>{sidebar}</aside>
  <div className="ui-shell__main">
   <header className="ui-shell__header"><button className="ui-shell__mobile-toggle" aria-label="Open navigation" aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}><span/><span/><span/></button>{header}</header>
   <main className="ui-shell__content">{children}</main>
  </div>
 </div>
}
