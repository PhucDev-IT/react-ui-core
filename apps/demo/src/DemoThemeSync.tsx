import {useEffect,useState} from 'react';
import type {UiMode} from '@my/ui';
import './standalone-demo.scss';

const STORAGE_KEY='r-core-demo-mode';

function resolveMode(mode:UiMode){
  if(mode==='system') return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
  return mode;
}

function readStoredMode():UiMode{
  const saved=window.localStorage.getItem(STORAGE_KEY);
  return saved==='dark'||saved==='system'||saved==='light'?saved:'light';
}

export function DemoThemePersistence(){
  useEffect(()=>{
    const root=document.documentElement;
    const save=()=>{
      const mode=root.dataset.uiMode;
      if(mode==='dark'||mode==='light') window.localStorage.setItem(STORAGE_KEY,mode);
    };
    save();
    const observer=new MutationObserver(save);
    observer.observe(root,{attributes:true,attributeFilter:['data-ui-mode']});
    return()=>observer.disconnect();
  },[]);
  return null;
}

export function StandaloneThemeControl({page}:{page:'advanced'|'chat'|'loading'}){
  const[mode,setMode]=useState<UiMode>(()=>readStoredMode());

  useEffect(()=>{
    document.body.dataset.demoPage=page;
    return()=>{delete document.body.dataset.demoPage};
  },[page]);

  useEffect(()=>{
    const root=document.documentElement;
    const media=window.matchMedia('(prefers-color-scheme: dark)');
    const apply=()=>{
      const resolved=resolveMode(mode);
      if(root.dataset.uiMode!==resolved) root.dataset.uiMode=resolved;
      window.localStorage.setItem(STORAGE_KEY,mode);
    };

    apply();
    const observer=new MutationObserver(()=>{
      const expected=resolveMode(mode);
      if(root.dataset.uiMode!==expected) root.dataset.uiMode=expected;
    });
    observer.observe(root,{attributes:true,attributeFilter:['data-ui-mode']});
    if(mode==='system') media.addEventListener?.('change',apply);
    return()=>{
      observer.disconnect();
      media.removeEventListener?.('change',apply);
    };
  },[mode]);

  return <div className="demo-theme-switcher" aria-label="Demo color mode">
    <span>Theme</span>
    {(['light','dark','system'] as UiMode[]).map(item=><button key={item} type="button" className={mode===item?'is-active':''} onClick={()=>setMode(item)}>{item==='light'?'Light':item==='dark'?'Dark':'System'}</button>)}
  </div>;
}
