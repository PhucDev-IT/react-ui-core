import React,{useEffect,useMemo,useRef,useState} from 'react';
import './media.scss';

export type MediaItem={id:string;name:string;url:string;size?:string;status?:'uploading'|'success'|'error';progress?:number};
export function ImageUploader({value=[],onChange,max=8,accept='image/*'}:{value?:MediaItem[];onChange?:(v:MediaItem[])=>void;max?:number;accept?:string}){const input=useRef<HTMLInputElement>(null);const add=(files:File[])=>{const next=files.slice(0,Math.max(0,max-value.length)).map((f,i)=>({id:`img-${Date.now()}-${i}`,name:f.name,url:URL.createObjectURL(f),size:`${Math.max(1,Math.round(f.size/1024))} KB`,status:'success' as const}));onChange?.([...value,...next])};const move=(from:number,to:number)=>{const arr=[...value];const[x]=arr.splice(from,1);arr.splice(to,0,x);onChange?.(arr)};return <div className="ui-image-uploader"><input ref={input} hidden type="file" multiple accept={accept} onChange={e=>{add(Array.from(e.target.files||[]));e.currentTarget.value=''}}/><div className="ui-image-uploader__grid">{value.map((item,i)=><div className="ui-image-uploader__item" key={item.id} draggable onDragStart={e=>e.dataTransfer.setData('text/plain',String(i))} onDragOver={e=>e.preventDefault()} onDrop={e=>move(Number(e.dataTransfer.getData('text/plain')),i)}><img src={item.url} alt={item.name}/><div><span>{i===0?'Ảnh bìa':item.name}</span><button type="button" onClick={()=>onChange?.(value.filter(x=>x.id!==item.id))}>×</button></div>{item.status==='uploading'&&<i style={{width:`${item.progress||0}%`}}/>}</div>)}{value.length<max&&<button type="button" className="ui-image-uploader__add" onClick={()=>input.current?.click()}><b>＋</b><span>Thêm ảnh</span><small>{value.length}/{max}</small></button>}</div><small className="ui-media-hint">Kéo thả để sắp xếp · ảnh đầu tiên là ảnh bìa</small></div>}

export function UploadList({items,onRetry,onRemove}:{items:MediaItem[];onRetry?:(id:string)=>void;onRemove?:(id:string)=>void}){return <div className="ui-upload-list">{items.map(x=><div key={x.id} className={`is-${x.status||'success'}`}><span className="ui-upload-list__icon">{x.status==='error'?'!':'↗'}</span><div><strong>{x.name}</strong><small>{x.size||''}</small>{x.status==='uploading'&&<span className="ui-upload-list__bar"><i style={{width:`${x.progress||0}%`}}/></span>}</div><div>{x.status==='error'&&<button type="button" onClick={()=>onRetry?.(x.id)}>Thử lại</button>}<button type="button" onClick={()=>onRemove?.(x.id)}>×</button></div></div>)}</div>}

export function ImageCropper({
  src,
  aspect=1,
  onChange,
  width=600,
}:{
  src:string;
  aspect?:number;
  onChange?:(blob:Blob)=>void;
  width?:number;
}){
  const [zoom,setZoom]=useState(1);
  const [offset,setOffset]=useState({x:0,y:0});
  const viewport=useRef<HTMLDivElement>(null);
  const canvas=useRef<HTMLCanvasElement>(null);
  const image=useRef<HTMLImageElement|null>(null);
  const drag=useRef<{x:number;y:number;originX:number;originY:number}|null>(null);

  const cropRect=()=>{
    const el=viewport.current;
    if(!el)return null;
    const vw=el.clientWidth;
    const vh=el.clientHeight;
    const maxW=vw*.78;
    const maxH=vh*.78;
    let h=maxH;
    let w=h*aspect;
    if(w>maxW){w=maxW;h=w/aspect}
    return {left:(vw-w)/2,top:(vh-h)/2,width:w,height:h,vw,vh};
  };

  const emitCrop=()=>{
    const img=image.current;
    const rect=cropRect();
    const el=viewport.current;
    const out=canvas.current;
    if(!img||!rect||!el||!out)return;

    out.width=width;
    out.height=Math.round(width/aspect);
    const ctx=out.getContext('2d');
    if(!ctx)return;

    const baseScale=Math.max(rect.vw/img.naturalWidth,rect.vh/img.naturalHeight);
    const scale=baseScale*zoom;
    const renderedW=img.naturalWidth*scale;
    const renderedH=img.naturalHeight*scale;
    const imageLeft=(rect.vw-renderedW)/2+offset.x;
    const imageTop=(rect.vh-renderedH)/2+offset.y;

    const sx=(rect.left-imageLeft)/scale;
    const sy=(rect.top-imageTop)/scale;
    const sw=rect.width/scale;
    const sh=rect.height/scale;

    ctx.clearRect(0,0,out.width,out.height);
    ctx.drawImage(img,sx,sy,sw,sh,0,0,out.width,out.height);
    out.toBlob(blob=>blob&&onChange?.(blob),'image/jpeg',.92);
  };

  useEffect(()=>{
    const img=new Image();
    img.crossOrigin='anonymous';
    img.onload=()=>{image.current=img;setOffset({x:0,y:0});setZoom(1)};
    img.src=src;
  },[src]);

  useEffect(()=>{emitCrop()},[zoom,offset.x,offset.y,aspect,width]);

  const onPointerDown=(e:React.PointerEvent<HTMLDivElement>)=>{
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current={x:e.clientX,y:e.clientY,originX:offset.x,originY:offset.y};
  };
  const onPointerMove=(e:React.PointerEvent<HTMLDivElement>)=>{
    if(!drag.current)return;
    setOffset({
      x:drag.current.originX+(e.clientX-drag.current.x),
      y:drag.current.originY+(e.clientY-drag.current.y),
    });
  };
  const onPointerUp=(e:React.PointerEvent<HTMLDivElement>)=>{
    drag.current=null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    emitCrop();
  };

  return <div className="ui-cropper">
    <div
      ref={viewport}
      className="ui-cropper__viewport"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={()=>{drag.current=null}}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        style={{transform:`translate3d(${offset.x}px,${offset.y}px,0) scale(${zoom})`}}
      />
      <div className="ui-cropper__shade"/>
      <div className="ui-cropper__frame" style={{aspectRatio:String(aspect)}}>
        <span/><span/><span/><span/>
        <div className="ui-cropper__grid ui-cropper__grid--v1"/>
        <div className="ui-cropper__grid ui-cropper__grid--v2"/>
        <div className="ui-cropper__grid ui-cropper__grid--h1"/>
        <div className="ui-cropper__grid ui-cropper__grid--h2"/>
      </div>
    </div>

    <div className="ui-cropper__toolbar">
      <button type="button" className="ui-cropper__reset" onClick={()=>{setZoom(1);setOffset({x:0,y:0})}}>
        Đặt lại
      </button>
      <label>
        <span>Thu phóng</span>
        <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoom}
          onChange={e=>setZoom(Number(e.target.value))}
        />
      </label>
    </div>

    <canvas ref={canvas} className="ui-cropper__canvas" aria-hidden="true"/>
  </div>
}

export function MediaManager({items,onSelect,selectedId}:{items:MediaItem[];onSelect?:(item:MediaItem)=>void;selectedId?:string}){const[q,setQ]=useState('');const filtered=useMemo(()=>items.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())),[items,q]);return <div className="ui-media-manager"><div className="ui-media-manager__top"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm file..."/><span>{filtered.length} files</span></div><div className="ui-media-manager__grid">{filtered.map(x=><button type="button" key={x.id} className={selectedId===x.id?'is-selected':''} onClick={()=>onSelect?.(x)}><img src={x.url} alt={x.name}/><span>{x.name}</span><small>{x.size}</small></button>)}</div></div>}

export function LightboxGallery({items,startIndex=0,open,onClose}:{items:MediaItem[];startIndex?:number;open:boolean;onClose:()=>void}){const[index,setIndex]=useState(startIndex);useEffect(()=>setIndex(startIndex),[startIndex,open]);if(!open||!items.length)return null;const item=items[index];return <div className="ui-lightbox" onClick={onClose}><button type="button" className="ui-lightbox__close" onClick={onClose}>×</button><button type="button" onClick={e=>{e.stopPropagation();setIndex((index-1+items.length)%items.length)}}>‹</button><figure onClick={e=>e.stopPropagation()}><img src={item.url} alt={item.name}/><figcaption>{item.name} · {index+1}/{items.length}</figcaption></figure><button type="button" onClick={e=>{e.stopPropagation();setIndex((index+1)%items.length)}}>›</button></div>}

export function AvatarUploader({value,onChange,size=96,label='Ảnh đại diện'}:{value?:MediaItem;onChange?:(item?:MediaItem)=>void;size?:number;label?:React.ReactNode}){const ref=useRef<HTMLInputElement>(null);const pick=(file?:File)=>{if(!file)return;onChange?.({id:`avatar-${Date.now()}`,name:file.name,url:URL.createObjectURL(file),size:`${Math.max(1,Math.round(file.size/1024))} KB`,status:'success'})};return <div className="ui-avatar-uploader"><input hidden ref={ref} type="file" accept="image/*" onChange={e=>{pick(e.target.files?.[0]);e.currentTarget.value=''}}/><button type="button" style={{width:size,height:size}} onClick={()=>ref.current?.click()}>{value?<img src={value.url} alt={value.name}/>:<span>＋</span>}</button><div><strong>{label}</strong><small>JPG, PNG, WebP</small><span><button type="button" onClick={()=>ref.current?.click()}>Thay ảnh</button>{value&&<button type="button" onClick={()=>onChange?.(undefined)}>Xóa</button>}</span></div></div>}

export function CoverSelector({items,value,onChange,label='Chọn ảnh bìa'}:{items:MediaItem[];value?:string;onChange?:(id:string)=>void;label?:React.ReactNode}){return <div className="ui-cover-selector"><strong>{label}</strong><div>{items.map(item=><button type="button" key={item.id} className={value===item.id?'is-selected':''} onClick={()=>onChange?.(item.id)}><img src={item.url} alt={item.name}/>{value===item.id&&<span>✓ Bìa</span>}</button>)}</div></div>}

export function SortableList<T>({items,onChange,renderItem,keyOf}:{items:T[];onChange?:(items:T[])=>void;renderItem:(item:T,index:number)=>React.ReactNode;keyOf:(item:T)=>string}){const move=(from:number,to:number)=>{if(from===to)return;const next=[...items];const[item]=next.splice(from,1);next.splice(to,0,item);onChange?.(next)};return <div className="ui-sortable-list">{items.map((item,index)=><div key={keyOf(item)} draggable onDragStart={e=>e.dataTransfer.setData('text/plain',String(index))} onDragOver={e=>e.preventDefault()} onDrop={e=>move(Number(e.dataTransfer.getData('text/plain')),index)}><span className="ui-sortable-list__handle">⋮⋮</span><div>{renderItem(item,index)}</div></div>)}</div>}
