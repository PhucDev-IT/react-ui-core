import React from 'react';
import {cx} from '../../utils/cx';
import './pagination.scss';

type PageToken = number | 'ellipsis-left' | 'ellipsis-right';

function buildPages(page:number,total:number,siblingCount=1):PageToken[]{
  if(total<=7) return Array.from({length:total},(_,i)=>i+1);
  const tokens:PageToken[]=[1];
  const left=Math.max(2,page-siblingCount);
  const right=Math.min(total-1,page+siblingCount);
  if(left>2) tokens.push('ellipsis-left');
  for(let p=left;p<=right;p++) tokens.push(p);
  if(right<total-1) tokens.push('ellipsis-right');
  tokens.push(total);
  return tokens;
}

export function Pagination({page,total,onChange,siblingCount=1}:{page:number;total:number;onChange:(p:number)=>void;siblingCount?:number}){
  const pages=buildPages(page,total,siblingCount);
  return <nav className="ui-pagination" aria-label="Pagination">
    <button className="ui-pagination__nav" aria-label="Previous page" disabled={page<=1} onClick={()=>onChange(page-1)}>‹</button>
    {pages.map(token=>typeof token==='number'
      ? <button key={token} aria-current={token===page?'page':undefined} className={cx(token===page&&'is-active')} onClick={()=>onChange(token)}>{token}</button>
      : <span key={token} className="ui-pagination__ellipsis" aria-hidden>…</span>)}
    <button className="ui-pagination__nav" aria-label="Next page" disabled={page>=total} onClick={()=>onChange(page+1)}>›</button>
  </nav>
}
