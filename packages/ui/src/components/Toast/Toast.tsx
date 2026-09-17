import React,{createContext,useCallback,useContext,useMemo,useState} from 'react';
import { cx } from '../../utils/cx';
import './toast.scss';
type ToastTone='default'|'success'|'warning'|'danger'|'info';
export interface ToastOptions{title:string;description?:string;tone?:ToastTone;duration?:number}
interface ToastItem extends ToastOptions{id:number}
const ToastContext=createContext<{push:(t:ToastOptions)=>void}>({push:()=>{}});
export function ToastProvider({children}:{children:React.ReactNode}){const[items,setItems]=useState<ToastItem[]>([]);const push=useCallback((t:ToastOptions)=>{const id=Date.now()+Math.random();setItems(v=>[...v,{...t,id}]);setTimeout(()=>setItems(v=>v.filter(x=>x.id!==id)),t.duration??3200)},[]);const value=useMemo(()=>({push}),[push]);return <ToastContext.Provider value={value}>{children}<div className="ui-toast-stack" aria-live="polite">{items.map(t=><div key={t.id} className={cx('ui-toast',`ui-toast--${t.tone??'default'}`)}><div className="ui-toast__mark">{t.tone==='success'?'✓':t.tone==='danger'?'!':t.tone==='warning'?'!':'i'}</div><div><strong>{t.title}</strong>{t.description&&<p>{t.description}</p>}</div><button onClick={()=>setItems(v=>v.filter(x=>x.id!==t.id))} aria-label="Close">×</button></div>)}</div></ToastContext.Provider>}
export const useToast=()=>useContext(ToastContext);
