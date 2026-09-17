import {useMemo,useState} from 'react';
import {Button,ChatConversationList,ChatLayout,ChatThread,ThemeProvider,type ChatConversation,type ChatMessage,type ChatUser} from '@my/ui';

const users:ChatUser[]=[
 {id:'me',name:'Phuc IT',presence:'online'},
 {id:'linh',name:'Linh Nguyễn',presence:'online',subtitle:'Customer support'},
 {id:'minh',name:'Minh Anh',presence:'offline',subtitle:'Product team'},
];

const conversations:ChatConversation[]=[
 {id:'linh',title:'Linh Nguyễn',preview:'Em đã kiểm tra đơn hàng rồi anh nhé.',timestamp:'10:42',unread:2,presence:'online'},
 {id:'team',title:'Nhóm vận hành',preview:'Minh Anh: Em đã cập nhật tồn kho.',timestamp:'09:15',presence:'online'},
 {id:'minh',title:'Minh Anh',preview:'File báo cáo em gửi ở trên nhé.',timestamp:'Hôm qua',presence:'offline'},
 {id:'customer',title:'Khách hàng #10284',preview:'Shop ơi đơn này khi nào giao vậy ạ?',timestamp:'T2',unread:1,presence:'offline'},
];

const initialMessages:Record<string,ChatMessage[]>={
 linh:[
  {id:'s1',system:true,content:'Hôm nay'},
  {id:'1',senderId:'linh',content:'Anh ơi, em vừa kiểm tra lại đơn #SR10284 rồi.',timestamp:'10:32'},
  {id:'2',senderId:'me',content:'Tình trạng hiện tại thế nào em?',timestamp:'10:34',status:'read'},
  {id:'3',senderId:'linh',content:'Đơn đã bàn giao cho đơn vị vận chuyển. Dự kiến khách nhận trong 1–2 ngày.',timestamp:'10:36'},
  {id:'4',senderId:'me',replyTo:{name:'Linh Nguyễn',content:'Đơn đã bàn giao cho đơn vị vận chuyển...'},content:'Oke, em nhắn khách giúp anh nhé.',timestamp:'10:38',status:'read'},
  {id:'5',senderId:'linh',content:'Dạ vâng ạ, em xử lý luôn.',timestamp:'10:42'},
 ],
 team:[
  {id:'s2',system:true,content:'09:00'},
  {id:'6',senderId:'minh',content:'Em đã cập nhật tồn kho cho batch hàng mới.',timestamp:'09:05'},
  {id:'7',senderId:'me',content:'Mọi người nhớ kiểm tra lại SKU trước 11h nhé.',timestamp:'09:08',status:'delivered'},
 ],
 minh:[
  {id:'8',senderId:'minh',content:'File báo cáo tuần em gửi anh ở đây.',timestamp:'16:20',attachments:[{id:'a1',name:'bao-cao-tuan.xlsx',size:'248 KB',kind:'file'}]},
  {id:'9',senderId:'me',content:'Anh nhận được rồi, cảm ơn em.',timestamp:'16:25',status:'read'},
 ],
 customer:[
  {id:'10',senderId:'linh',content:'Shop ơi đơn này khi nào giao vậy ạ?',timestamp:'08:12'},
 ]
};

export default function ChatDemo(){
 const[activeId,setActiveId]=useState('linh');
 const[messages,setMessages]=useState<Record<string,ChatMessage[]>>(initialMessages);
 const activeConversation=useMemo(()=>conversations.find(x=>x.id===activeId)??conversations[0],[activeId]);
 const threadUsers=useMemo(()=>activeId==='team'?users:users.filter(x=>x.id==='me'||x.id===activeId||activeId==='customer'),[activeId]);
 const onSend=(value:string,files:File[])=>{
  const attachments=files.map((file,index)=>({id:`local-${Date.now()}-${index}`,name:file.name,size:`${Math.max(1,Math.round(file.size/1024))} KB`,kind:'file' as const}));
  setMessages(prev=>({...prev,[activeId]:[...(prev[activeId]||[]),{id:String(Date.now()),senderId:'me',content:value,timestamp:new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}),status:'sent',attachments}]}));
 };
 return <ThemeProvider value={{mode:'light',density:'comfortable',radius:'soft',fontSize:'normal',primary:'#206bc4',contentWidth:'fluid'}}>
  <div style={{minHeight:'100vh',background:'var(--ui-bg)',padding:'24px'}}>
   <div style={{maxWidth:1280,margin:'0 auto'}}>
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:16,marginBottom:18,flexWrap:'wrap'}}>
     <div><div style={{fontSize:12,color:'var(--ui-primary)',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em'}}>Demo pattern</div><h1 style={{margin:'6px 0 4px',fontSize:30,color:'var(--ui-text)'}}>Chat & Messaging</h1><p style={{margin:0,color:'var(--ui-text-muted)'}}>Conversation list, bubble, reply, attachment, typing state, composer và responsive mobile.</p></div>
     <Button variant="outline" onClick={()=>history.back()}>← Quay lại demo chính</Button>
    </div>
    <ChatLayout sidebar={<ChatConversationList conversations={conversations} activeId={activeId} onChange={setActiveId}/> }>
     <ChatThread
      title={activeConversation.title}
      subtitle={activeConversation.id==='team'?'4 thành viên · 2 đang online':activeConversation.presence==='online'?'Đang hoạt động':'Ngoại tuyến'}
      presence={activeConversation.presence}
      messages={messages[activeId]||[]}
      users={threadUsers}
      currentUserId="me"
      typingUsers={activeId==='linh'?['Linh Nguyễn']:[]}
      onSend={onSend}
      headerActions={<><Button size="sm" variant="ghost">Tìm kiếm</Button><Button size="sm" variant="outline">Chi tiết</Button></>}
     />
    </ChatLayout>
   </div>
  </div>
 </ThemeProvider>
}
