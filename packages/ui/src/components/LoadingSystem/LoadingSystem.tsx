import React,{useEffect,useState} from 'react';
import {Spinner} from '../Spinner/Spinner';
import {Button} from '../Button/Button';
import {cx} from '../../utils/cx';
import './loading-system.scss';

export function DotsLoader({label='Đang tải...',size='md'}:{label?:string;size?:'sm'|'md'|'lg'}){
  return <span className={cx('ui-dots-loader',`ui-dots-loader--${size}`)} role="status" aria-label={label}><i/><i/><i/></span>;
}

export function PulseLoader({label='Đang tải...',size='md'}:{label?:string;size?:'sm'|'md'|'lg'}){
  return <span className={cx('ui-pulse-loader',`ui-pulse-loader--${size}`)} role="status" aria-label={label}/>;
}

export function InlineLoader({label='Đang tải...',variant='spinner'}:{label?:React.ReactNode;variant?:'spinner'|'dots'|'pulse'}){
  return <span className="ui-inline-loader">{variant==='spinner'?<Spinner size="sm"/>:variant==='dots'?<DotsLoader size="sm"/>:<PulseLoader size="sm"/>}<span>{label}</span></span>;
}

export function SectionLoader({label='Đang tải dữ liệu...',minHeight=160,variant='spinner'}:{label?:React.ReactNode;minHeight?:number|string;variant?:'spinner'|'dots'|'pulse'}){
  return <div className="ui-section-loader" style={{minHeight}} role="status">{variant==='spinner'?<Spinner/>:variant==='dots'?<DotsLoader/>:<PulseLoader/>}<span>{label}</span></div>;
}

export function PageLoader({label='Đang tải trang...',description,variant='spinner'}:{label?:React.ReactNode;description?:React.ReactNode;variant?:'spinner'|'dots'|'pulse'}){
  return <div className="ui-page-loader" role="status"><div className="ui-page-loader__visual">{variant==='spinner'?<Spinner size="lg"/>:variant==='dots'?<DotsLoader size="lg"/>:<PulseLoader size="lg"/>}</div><strong>{label}</strong>{description&&<span>{description}</span>}</div>;
}

export function useDelayedLoading(loading:boolean,delay=180){
  const[visible,setVisible]=useState(false);
  useEffect(()=>{if(!loading){setVisible(false);return}const id=window.setTimeout(()=>setVisible(true),delay);return()=>window.clearTimeout(id)},[loading,delay]);
  return visible;
}

export function DelayedLoader({loading,delay=180,children,fallback=<InlineLoader/>}:{loading:boolean;delay?:number;children?:React.ReactNode;fallback?:React.ReactNode}){
  const visible=useDelayedLoading(loading,delay);
  if(!loading)return <>{children}</>;
  return visible?<>{fallback}</>:null;
}

export interface LoadingStateProps{
  loading?:boolean;
  error?:React.ReactNode;
  empty?:boolean;
  children:React.ReactNode;
  loadingFallback?:React.ReactNode;
  emptyTitle?:React.ReactNode;
  emptyDescription?:React.ReactNode;
  errorTitle?:React.ReactNode;
  onRetry?:()=>void;
}
export function LoadingState({loading=false,error,empty=false,children,loadingFallback,emptyTitle='Không có dữ liệu',emptyDescription='Chưa có dữ liệu để hiển thị.',errorTitle='Không thể tải dữ liệu',onRetry}:LoadingStateProps){
  if(loading)return <>{loadingFallback??<SectionLoader/>}</>;
  if(error)return <div className="ui-load-state ui-load-state--error"><span className="ui-load-state__icon">!</span><strong>{errorTitle}</strong><p>{error}</p>{onRetry&&<Button size="sm" variant="outline" onClick={onRetry}>Thử lại</Button>}</div>;
  if(empty)return <div className="ui-load-state"><span className="ui-load-state__icon">—</span><strong>{emptyTitle}</strong>{emptyDescription&&<p>{emptyDescription}</p>}</div>;
  return <>{children}</>;
}
