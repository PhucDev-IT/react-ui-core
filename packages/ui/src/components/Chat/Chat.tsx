import React, {useMemo, useRef, useState} from 'react';
import {Avatar} from '../Avatar/Avatar';
import {cx} from '../../utils/cx';
import './chat.scss';

export type ChatPresence='online'|'offline';
export type ChatMessageStatus='sending'|'sent'|'delivered'|'read'|'failed';

export type ChatUser={
 id:string;
 name:string;
 avatar?:string;
 presence?:ChatPresence;
 subtitle?:string;
};

export type ChatAttachment={
 id:string;
 name:string;
 url?:string;
 size?:string;
 kind?:'image'|'file';
 previewUrl?:string;
};

export type ChatMessage={
 id:string;
 senderId?:string;
 content?:React.ReactNode;
 timestamp?:string;
 status?:ChatMessageStatus;
 attachments?:ChatAttachment[];
 replyTo?:{name:string;content:string};
 system?:boolean;
 edited?:boolean;
};

export type ChatConversation={
 id:string;
 title:string;
 avatar?:string;
 preview?:string;
 timestamp?:string;
 unread?:number;
 presence?:ChatPresence;
 pinned?:boolean;
};

export function ChatConversationList({
 conversations,activeId,onChange,searchable=true,className,
}:{
 conversations:ChatConversation[];
 activeId?:string;
 onChange?:(id:string)=>void;
 searchable?:boolean;
 className?:string;
}){
 const[q,setQ]=useState('');
 const rows=useMemo(()=>conversations.filter(x=>`${x.title} ${x.preview||''}`.toLowerCase().includes(q.toLowerCase())),[conversations,q]);
 return <div className={cx('ui-chat-list',className)}>
  <div className="ui-chat-list__top"><div><strong>Tin nhắn</strong><span>{conversations.length} hội thoại</span></div><button type="button" aria-label="Tạo hội thoại">+</button></div>
  {searchable&&<div className="ui-chat-list__search"><svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm hội thoại..."/></div>}
  <div className="ui-chat-list__items">{rows.map(item=><button type="button" key={item.id} className={cx('ui-chat-list__item',activeId===item.id&&'is-active')} onClick={()=>onChange?.(item.id)}>
   <Avatar src={item.avatar} name={item.title} status={item.presence}/>
   <span className="ui-chat-list__body"><span className="ui-chat-list__line"><strong>{item.title}</strong>{item.timestamp&&<time>{item.timestamp}</time>}</span><span className="ui-chat-list__line"><span className="ui-chat-list__preview">{item.preview}</span>{item.unread? <b className="ui-chat-list__unread">{item.unread>99?'99+':item.unread}</b>:null}</span></span>
  </button>)}</div>
 </div>
}

export function ChatMessageBubble({message,user,isMine}:{message:ChatMessage;user?:ChatUser;isMine:boolean}){
 if(message.system)return <div className="ui-chat-message ui-chat-message--system"><span>{message.content}</span></div>;
 const hasMeta=Boolean(message.timestamp||message.edited||(isMine&&message.status));
 return <div className={cx('ui-chat-message',isMine&&'is-mine')}>
  {!isMine&&user?<Avatar src={user.avatar} name={user.name} size="sm"/>:null}
  <div className="ui-chat-message__main">
   {!isMine&&user&&<div className="ui-chat-message__name">{user.name}</div>}
   {message.replyTo&&<div className="ui-chat-message__reply"><strong>{message.replyTo.name}</strong><span>{message.replyTo.content}</span></div>}
   {message.attachments?.length?<div className="ui-chat-message__attachments">{message.attachments.map(a=>a.kind==='image'&&a.previewUrl?<a key={a.id} href={a.url||a.previewUrl} className="ui-chat-message__image" target="_blank" rel="noreferrer"><img src={a.previewUrl} alt={a.name}/></a>:<a key={a.id} className="ui-chat-message__file" href={a.url||'#'}><span className="ui-chat-message__file-icon">↗</span><span><strong>{a.name}</strong>{a.size&&<small>{a.size}</small>}</span></a>)}</div>:null}
   {message.content!==undefined&&message.content!==null&&message.content!==''?<div className="ui-chat-message__bubble">{message.content}</div>:null}
   {hasMeta&&<div className="ui-chat-message__meta">{message.timestamp&&<time>{message.timestamp}</time>}{message.edited&&<span>Đã sửa</span>}{isMine&&message.status&&<ChatStatus status={message.status}/>}</div>}
  </div>
 </div>
}

function ChatStatus({status}:{status:ChatMessageStatus}){
 const label:Record<ChatMessageStatus,string>={sending:'Đang gửi',sent:'Đã gửi',delivered:'Đã nhận',read:'Đã xem',failed:'Gửi lỗi'};
 return <span className={cx('ui-chat-status',`is-${status}`)} title={label[status]}>{status==='sending'?'◷':status==='failed'?'!':status==='sent'?'✓':'✓✓'}</span>
}

export function ChatTypingIndicator({users}:{users:string[]}){
 if(!users.length)return null;
 return <div className="ui-chat-typing"><span className="ui-chat-typing__dots"><i/><i/><i/></span><span>{users.length===1?`${users[0]} đang nhập...`:`${users.length} người đang nhập...`}</span></div>
}

export function ChatMessageList({messages,users,currentUserId,typingUsers=[]}:{messages:ChatMessage[];users:ChatUser[];currentUserId:string;typingUsers?:string[]}){
 const map=useMemo(()=>new Map(users.map(u=>[u.id,u])),[users]);
 return <div className="ui-chat-messages" role="log" aria-live="polite">{messages.map(message=><ChatMessageBubble key={message.id} message={message} user={message.senderId?map.get(message.senderId):undefined} isMine={message.senderId===currentUserId}/>)}<ChatTypingIndicator users={typingUsers}/></div>
}

export function ChatComposer({
 value,onChange,onSend,placeholder='Nhập tin nhắn...',disabled=false,allowAttachments=true,maxLength=4000,
}:{
 value?:string;
 onChange?:(value:string)=>void;
 onSend?:(value:string,files:File[])=>void;
 placeholder?:string;
 disabled?:boolean;
 allowAttachments?:boolean;
 maxLength?:number;
}){
 const[inner,setInner]=useState('');
 const[files,setFiles]=useState<File[]>([]);
 const fileRef=useRef<HTMLInputElement>(null);
 const controlled=value!==undefined;
 const text=controlled?value:inner;
 const setText=(next:string)=>{if(!controlled)setInner(next);onChange?.(next)};
 const send=()=>{const trimmed=text.trim();if(disabled||(!trimmed&&!files.length))return;onSend?.(trimmed,files);setText('');setFiles([])};
 return <div className="ui-chat-composer">
  {files.length?<div className="ui-chat-composer__files">{files.map((file,i)=><span key={`${file.name}-${i}`}><span>{file.name}</span><button type="button" aria-label={`Bỏ ${file.name}`} onClick={()=>setFiles(x=>x.filter((_,index)=>index!==i))}>×</button></span>)}</div>:null}
  <div className="ui-chat-composer__row">
   {allowAttachments&&<><input ref={fileRef} hidden type="file" multiple onChange={e=>{setFiles(Array.from(e.target.files||[]));e.currentTarget.value=''}}/><button className="ui-chat-composer__icon" type="button" disabled={disabled} onClick={()=>fileRef.current?.click()} aria-label="Đính kèm tệp"><svg viewBox="0 0 24 24"><path d="m21.4 11.6-8.5 8.5a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 0 1-2.8-2.8l8.4-8.4"/></svg></button></>}
   <textarea rows={1} maxLength={maxLength} disabled={disabled} value={text} placeholder={placeholder} onChange={e=>setText(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}}/>
   <button type="button" className="ui-chat-composer__send" onClick={send} disabled={disabled||(!text.trim()&&!files.length)} aria-label="Gửi tin nhắn"><svg viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></button>
  </div>
  <div className="ui-chat-composer__hint"><span>Enter để gửi · Shift + Enter xuống dòng</span><span>{text.length}/{maxLength}</span></div>
 </div>
}

export function ChatThread({
 title,subtitle,avatar,presence='online',messages,users,currentUserId,typingUsers=[],composerValue,onComposerChange,onSend,headerActions,className,
}:{
 title:string;
 subtitle?:string;
 avatar?:string;
 presence?:ChatPresence;
 messages:ChatMessage[];
 users:ChatUser[];
 currentUserId:string;
 typingUsers?:string[];
 composerValue?:string;
 onComposerChange?:(value:string)=>void;
 onSend?:(value:string,files:File[])=>void;
 headerActions?:React.ReactNode;
 className?:string;
}){
 return <section className={cx('ui-chat-thread',className)}>
  <header className="ui-chat-thread__header"><div className="ui-chat-thread__identity"><Avatar src={avatar} name={title} status={presence}/><div><strong>{title}</strong><span>{subtitle|| (presence==='online'?'Đang hoạt động':'Ngoại tuyến')}</span></div></div>{headerActions&&<div className="ui-chat-thread__actions">{headerActions}</div>}</header>
  <ChatMessageList messages={messages} users={users} currentUserId={currentUserId} typingUsers={typingUsers}/>
  <ChatComposer value={composerValue} onChange={onComposerChange} onSend={onSend}/>
 </section>
}

export function ChatLayout({sidebar,children,className}:{sidebar:React.ReactNode;children:React.ReactNode;className?:string}){
 return <div className={cx('ui-chat-layout',className)}><aside className="ui-chat-layout__sidebar">{sidebar}</aside><main className="ui-chat-layout__main">{children}</main></div>
}
