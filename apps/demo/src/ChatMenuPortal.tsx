import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import './chat-menu.scss';

export default function ChatMenuPortal(){
  const [target,setTarget]=useState<Element|null>(null);

  useEffect(()=>{
    const resolve=()=>{
      const groups=Array.from(document.querySelectorAll('.nav-group'));
      const componentsGroup=groups.find(group=>group.querySelector('.nav-label')?.textContent?.trim()==='Components');
      if(componentsGroup) setTarget(componentsGroup);
    };

    resolve();
    if(target) return;

    const observer=new MutationObserver(resolve);
    observer.observe(document.body,{childList:true,subtree:true});
    return()=>observer.disconnect();
  },[target]);

  if(!target)return null;

  return createPortal(
    <>
      <a className="demo-chat-menu-link" href="/advanced.html" title="Advanced Components">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M17 14v6M14 17h6"/>
        </svg>
        <span>Advanced Components</span>
        <span className="demo-chat-menu-link__arrow">›</span>
      </a>
      <a className="demo-chat-menu-link" href="/chat.html" title="Chat & Messaging">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>
          <path d="M8 9h8M8 13h5"/>
        </svg>
        <span>Chat & Messaging</span>
        <span className="demo-chat-menu-link__arrow">›</span>
      </a>
    </>,
    target,
  );
}
