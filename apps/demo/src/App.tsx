import { useMemo, useState } from 'react';
import {
  Alert, AppShell, Avatar, Badge, Breadcrumb, Button, Card, Checkbox, Divider, Drawer, Dropdown, DropdownItem,
  EmptyState, Input, Modal, PageHeader, Pagination, Progress, Radio, Select, Skeleton, Spinner, StatCard, Switch,
  Table, Tabs, Textarea, ThemeProvider, Timeline, Tooltip, InputGroup, InputAddon, PasswordInput, NumberInput, SearchInput, FileUpload, SelectableCard, ToastProvider, useToast, ConfirmModal, LoadingOverlay, Accordion, Steps, SegmentedControl, DataTable, FilterBar, SettingsSection, ActivityFeed, DatePicker, DateRangePicker, RangeInput, TagsInput, RichTextEditor, ImageCheck, ImageCheckGrid, type UiDensity, type UiFontSize, type UiMode, type UiRadius, type UiContentWidth
} from '@my/ui';

type NavKey = 'overview'|'foundation'|'buttons'|'forms'|'data'|'feedback'|'patterns';

const products = [
  {name:'Áo Mesh Pastel',sku:'SR-1001',category:'Áo nữ',price:'299.000 ₫',stock:42,status:'Đang bán'},
  {name:'Áo len cổ vuông',sku:'SR-1002',category:'Áo len',price:'359.000 ₫',stock:12,status:'Sắp hết'},
  {name:'Chân váy xếp ly',sku:'SR-1003',category:'Chân váy',price:'329.000 ₫',stock:0,status:'Hết hàng'},
  {name:'Áo zip cổ bẻ',sku:'SR-1004',category:'Áo khoác',price:'419.000 ₫',stock:26,status:'Đang bán'},
  {name:'Cardigan dáng ngắn',sku:'SR-1005',category:'Áo len',price:'389.000 ₫',stock:18,status:'Sắp hết'}
];

function Icon({name,size=18}:{name:string;size?:number}){
  const p:Record<string,React.ReactNode>={
    home:<><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/></>,
    cube:<><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v9"/></>,
    type:<><path d="M5 5h14M12 5v14M8 19h8"/></>,
    button:<><rect x="3" y="6" width="18" height="12" rx="3"/><path d="M8 12h8"/></>,
    form:<><path d="M5 5h14v5H5zM5 14h6v5H5zM14 14h5v5h-5z"/></>,
    table:<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/></>,
    bell:<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M10 19h4"/></>,
    layers:<><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    sun:<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    moon:<><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></>,
    settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.3 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    external:<><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/></>,
    chevron:<path d="m9 18 6-6-6-6"/>,
    plus:<><path d="M12 5v14M5 12h14"/></>,
    dots:<><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    cart:<><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.6 10.4A2 2 0 0 0 9.5 16H18a2 2 0 0 0 1.9-1.4L22 8H7"/></>,
    users:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    money:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h.01M17 15h.01"/><circle cx="12" cy="12" r="2"/></>,
    arrowUp:<><path d="m18 15-6-6-6 6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{p[name]}</svg>
}

export default function App(){
 const [mode,setMode]=useState<UiMode>('light');
 const [density,setDensity]=useState<UiDensity>('comfortable');
 const [radius,setRadius]=useState<UiRadius>('soft');
 const [fontSize,setFontSize]=useState<UiFontSize>('normal');
 const [primary,setPrimary]=useState('#206bc4');
 const [contentWidth,setContentWidth]=useState<UiContentWidth>('wide');
 const [sidebarCollapsed,setSidebarCollapsed]=useState(false);
 const [confirmOpen,setConfirmOpen]=useState(false);
 const [tab,setTab]=useState('overview');
 const [page,setPage]=useState(1);
 const [modal,setModal]=useState(false);
 const [successModal,setSuccessModal]=useState(false);
 const [drawer,setDrawer]=useState(false);
 const [active,setActive]=useState<NavKey>('overview');
 const [query,setQuery]=useState('');
 const filtered=useMemo(()=>products.filter(p=>`${p.name} ${p.sku} ${p.category}`.toLowerCase().includes(query.toLowerCase())),[query]);

 return <ToastProvider><ThemeProvider value={{mode,density,radius,fontSize,primary,contentWidth}}>
  <AppShell collapsible sidebarCollapsed={sidebarCollapsed} onSidebarCollapsedChange={setSidebarCollapsed} sidebar={<Sidebar active={active} onChange={setActive}/>} header={<Topbar mode={mode} setMode={setMode} openTheme={()=>setDrawer(true)}/> }>
   <div className="showcase-page">
    {active==='overview' && <Overview setModal={setModal} setDrawer={setDrawer} query={query} setQuery={setQuery} products={filtered} page={page} setPage={setPage}/>} 
    {active==='foundation' && <Foundations mode={mode} setMode={setMode} density={density} setDensity={setDensity} radius={radius} setRadius={setRadius} fontSize={fontSize} setFontSize={setFontSize} primary={primary} setPrimary={setPrimary} contentWidth={contentWidth} setContentWidth={setContentWidth}/>} 
    {active==='buttons' && <ButtonsGallery/>}
    {active==='forms' && <FormsGallery/>}
    {active==='data' && <DataGallery tab={tab} setTab={setTab} page={page} setPage={setPage}/>} 
    {active==='feedback' && <FeedbackGallery setModal={setModal} setSuccessModal={setSuccessModal} setDrawer={setDrawer} setConfirmOpen={setConfirmOpen}/>} 
    {active==='patterns' && <PatternsGallery/>}
   </div>

   <Modal open={modal} onClose={()=>setModal(false)} title="Tạo sản phẩm mới" size="lg" footer={<><Button variant="ghost" onClick={()=>setModal(false)}>Hủy</Button><Button onClick={()=>setModal(false)}>Tạo sản phẩm</Button></>}>
    <div className="form-layout"><Input label="Tên sản phẩm" placeholder="Ví dụ: Áo cardigan dáng ngắn" required/><Input label="SKU" placeholder="SR-1006"/><Select label="Danh mục"><option>Áo nữ</option><option>Áo len</option><option>Chân váy</option></Select><Input label="Giá bán" prefix="₫" placeholder="399000"/><Textarea label="Mô tả ngắn" placeholder="Mô tả sản phẩm..."/><div className="control-panel"><Checkbox label="Hiển thị trên website" defaultChecked/><Switch label="Theo dõi tồn kho" defaultChecked/></div></div>
   </Modal>
   <Modal open={successModal} onClose={()=>setSuccessModal(false)} title="Hoàn tất" size="sm" footer={<Button block onClick={()=>setSuccessModal(false)}>Tiếp tục</Button>}>
    <div className="success-modal"><div className="success-modal__icon">✓</div><h3>Lưu thành công</h3><p>Thay đổi của bạn đã được cập nhật và có hiệu lực ngay lập tức.</p></div>
   </Modal>
   <ConfirmModal open={confirmOpen} onClose={()=>setConfirmOpen(false)} onConfirm={()=>setConfirmOpen(false)} title="Xóa sản phẩm?" description="Hành động này không thể hoàn tác. Sản phẩm và dữ liệu liên quan sẽ bị xóa." confirmLabel="Xóa sản phẩm"/>
   <Drawer open={drawer} onClose={()=>setDrawer(false)} title="Tùy biến giao diện"><ThemePanel mode={mode} setMode={setMode} density={density} setDensity={setDensity} radius={radius} setRadius={setRadius} fontSize={fontSize} setFontSize={setFontSize} primary={primary} setPrimary={setPrimary} contentWidth={contentWidth} setContentWidth={setContentWidth}/></Drawer>
  </AppShell>
 </ThemeProvider></ToastProvider>
}

function Topbar({mode,setMode,openTheme}:{mode:UiMode;setMode:(m:UiMode)=>void;openTheme:()=>void}){
 return <div className="topbar">
  <div className="topbar__search"><Icon name="search" size={17}/><input placeholder="Tìm component, token, pattern..."/><kbd>⌘ K</kbd></div>
  <div className="topbar__actions">
   <Tooltip content="Đổi chế độ sáng/tối"><button className="icon-btn" onClick={()=>setMode(mode==='dark'?'light':'dark')}><Icon name={mode==='dark'?'sun':'moon'}/></button></Tooltip>
   <Tooltip content="Theme settings"><button className="icon-btn" onClick={openTheme}><Icon name="settings"/></button></Tooltip>
   <button className="icon-btn"><Icon name="bell"/><span className="notify-dot"/></button>
   <div className="user-chip"><Avatar name="Phuc IT"/><div><strong>Phuc IT</strong><span>Administrator</span></div></div>
  </div>
 </div>
}

function Sidebar({active,onChange}:{active:NavKey;onChange:(v:NavKey)=>void}){
 const groups=[
  {label:'Getting started',items:[['overview','Overview','home'],['foundation','Foundations','type']]},
  {label:'Components',items:[['buttons','Buttons & actions','button'],['forms','Forms & inputs','form'],['data','Data display','table'],['feedback','Feedback & overlays','bell']]},
  {label:'Patterns',items:[['patterns','Admin patterns','layers']]}
 ] as const;
 return <aside className="docs-sidebar">
  <div className="brand"><div className="brand__mark">R</div><div><strong>R Core</strong><span>Design System</span></div><Badge tone="primary">v1.0</Badge></div>
  <div className="side-search"><Icon name="search" size={15}/><span>Search docs</span><kbd>/</kbd></div>
  <nav>{groups.map(g=><div className="nav-group" key={g.label}><div className="nav-label">{g.label}</div>{g.items.map(([key,label,icon])=><button key={key} className={active===key?'active':''} onClick={()=>onChange(key as NavKey)}><Icon name={icon} size={17}/><span>{label}</span>{active===key&&<Icon name="chevron" size={14}/>}</button>)}</div>)}</nav>
  <div className="sidebar-card"><div className="sidebar-card__icon"><Icon name="cube"/></div><strong>Core độc lập</strong><p>Không phụ thuộc Bootstrap, Tailwind hoặc jQuery.</p><Button variant="outline" size="sm" block>Documentation</Button></div>
  <div className="sidebar-foot"><span>React 19 · TypeScript</span><button><Icon name="external" size={14}/></button></div>
 </aside>
}

function DocHeader({section,title,description,actions}:{section:string;title:string;description:string;actions?:React.ReactNode}){
 return <><Breadcrumb items={[{label:'R Core'},{label:section}]}/><PageHeader eyebrow={section} title={title} description={description} actions={actions}/></>
}

function Overview({setModal,setDrawer,query,setQuery,products,page,setPage}:{setModal:(v:boolean)=>void;setDrawer:(v:boolean)=>void;query:string;setQuery:(v:string)=>void;products:any[];page:number;setPage:(v:number)=>void}){
 return <>
  <DocHeader section="Overview" title="React Admin Design System" description="Một core React có thể tái sử dụng cho nhiều web admin, với theme runtime, component nhất quán và các pattern thực tế." actions={<><Button variant="outline" leftIcon={<Icon name="settings" size={16}/>} onClick={()=>setDrawer(true)}>Customize</Button><Button leftIcon={<Icon name="plus" size={16}/>} onClick={()=>setModal(true)}>Tạo sản phẩm</Button></>}/>
  <section className="hero-grid">
   <div className="hero-card"><div className="hero-card__eyebrow"><Badge tone="success" dot>Production ready foundation</Badge></div><h2>Core đẹp phải bắt đầu từ <span>system</span>, không phải từng page.</h2><p>Tokens, typography, density, radius và component API được thiết kế để thay đổi toàn hệ thống mà không phá layout.</p><div className="hero-actions"><Button>Tài liệu component</Button><Button variant="ghost">Xem tokens <Icon name="chevron" size={15}/></Button></div><div className="hero-metrics"><div><strong>28</strong><span>Core components</span></div><div><strong>5</strong><span>Runtime settings</span></div><div><strong>0</strong><span>UI framework lock-in</span></div></div></div>
   <div className="preview-window"><div className="preview-window__bar"><span/><span/><span/><div>admin.sarae.local</div></div><div className="mini-admin"><div className="mini-side"><b>S</b>{[1,2,3,4,5].map(i=><i key={i}/>)}</div><div className="mini-main"><div className="mini-head"><span>Dashboard</span><em/></div><div className="mini-kpis">{[1,2,3].map(i=><i key={i}/>)}</div><div className="mini-chart"><div/><div/><div/><div/><div/><div/><div/></div><div className="mini-rows">{[1,2,3,4].map(i=><i key={i}/>)}</div></div></div></div>
  </section>

  <div className="section-heading"><div><span className="section-kicker">Admin overview</span><h2>Dashboard thực tế</h2><p>Không chỉ show component riêng lẻ — demo phải cho thấy chúng phối hợp trong màn hình admin thật.</p></div><Button variant="ghost" rightIcon={<Icon name="chevron" size={15}/>}>View dashboard pattern</Button></div>
  <section className="stat-grid"><StatCard label="Doanh thu hôm nay" value="28,4 triệu" delta="+12,8% so với hôm qua" trend="up" icon={<Icon name="money"/>}/><StatCard label="Đơn hàng" value="184" delta="+24 đơn mới" trend="up" icon={<Icon name="cart"/>}/><StatCard label="Khách hàng mới" value="67" delta="+8,2% tuần này" trend="up" icon={<Icon name="users"/>}/><StatCard label="Tỷ lệ chuyển đổi" value="4,82%" delta="Ổn định" trend="neutral" icon={<Icon name="arrowUp"/>}/></section>

  <section className="overview-grid">
   <Card title="Hiệu suất bán hàng" description="Doanh thu 7 ngày gần nhất" actions={<Dropdown align="end" trigger={<Button variant="ghost" size="sm" rightIcon={<span>⌄</span>}>7 ngày</Button>}><DropdownItem>7 ngày</DropdownItem><DropdownItem>30 ngày</DropdownItem><DropdownItem>90 ngày</DropdownItem></Dropdown>}><div className="chart-wrap"><div className="chart-y"><span>40M</span><span>30M</span><span>20M</span><span>10M</span><span>0</span></div><div className="chart-area"><div className="chart-grid"/><svg viewBox="0 0 600 180" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--ui-primary)" stopOpacity=".2"/><stop offset="1" stopColor="var(--ui-primary)" stopOpacity="0"/></linearGradient></defs><path d="M0 140 C45 125 55 90 95 102 S150 142 185 108 S245 38 290 70 S345 128 395 95 S470 28 520 55 S565 48 600 20 L600 180 L0 180Z" fill="url(#fill)"/><path d="M0 140 C45 125 55 90 95 102 S150 142 185 108 S245 38 290 70 S345 128 395 95 S470 28 520 55 S565 48 600 20" fill="none" stroke="var(--ui-primary)" strokeWidth="3" vectorEffect="non-scaling-stroke"/></svg><div className="chart-labels"><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span></div></div></div></Card>
   <Card title="Đơn hàng theo trạng thái" description="Cập nhật theo thời gian thực"><div className="order-donut"><div className="donut"><div><strong>184</strong><span>Đơn hàng</span></div></div><div className="legend"><div><i className="is-primary"/><span>Đang xử lý</span><strong>86</strong></div><div><i className="is-success"/><span>Hoàn tất</span><strong>62</strong></div><div><i className="is-warning"/><span>Đang giao</span><strong>28</strong></div><div><i className="is-danger"/><span>Đã hủy</span><strong>8</strong></div></div></div></Card>
  </section>

  <Card title="Sản phẩm" description="Quản lý danh sách và tồn kho" padding={false} actions={<Button size="sm" leftIcon={<Icon name="plus" size={15}/>} onClick={()=>setModal(true)}>Thêm sản phẩm</Button>}>
   <div className="table-toolbar"><div className="toolbar-search"><Icon name="search" size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm tên, SKU, danh mục..."/></div><Select defaultValue="all" aria-label="Status"><option value="all">Tất cả trạng thái</option><option>Đang bán</option><option>Hết hàng</option></Select><Select defaultValue="all" aria-label="Category"><option value="all">Tất cả danh mục</option><option>Áo nữ</option><option>Áo len</option></Select><Button variant="outline" size="sm">Bộ lọc</Button></div>
   <Table columns={[{key:'name',header:'Sản phẩm',render:(r:any)=><div className="product-cell"><div className="product-thumb">{r.name.charAt(0)}</div><div><strong>{r.name}</strong><span>{r.category}</span></div></div>},{key:'sku',header:'SKU'},{key:'price',header:'Giá bán',align:'right'},{key:'stock',header:'Tồn kho',align:'right',render:(r:any)=><span className={r.stock===0?'stock-zero':''}>{r.stock}</span>},{key:'status',header:'Trạng thái',render:(r:any)=><Badge tone={r.stock===0?'danger':r.stock<20?'warning':'success'} dot>{r.status}</Badge>},{key:'actions',header:'',align:'right',render:()=><Button variant="ghost" size="sm"><Icon name="dots"/></Button>}]} data={products}/>
   <div className="table-footer"><span>Hiển thị {products.length} trong 24 sản phẩm</span><Pagination page={page} total={48} onChange={setPage}/></div>
  </Card>
 </>
}

function Foundations(props:any){return <><DocHeader section="Foundations" title="Design foundations" description="Các token nền quyết định toàn bộ cảm giác thị giác của hệ thống: màu sắc, typography, radius, spacing, density và shadow."/><div className="foundation-grid"><Card title="Theme configurator" description="Thay đổi realtime trên toàn bộ component"><ThemePanel {...props}/></Card><Card title="Design principles" description="Quy tắc để UI không bị mỗi màn một kiểu"><div className="principle-list"><Principle n="01" title="Compact, not cramped" text="Admin cần mật độ thông tin cao nhưng vẫn có hierarchy rõ ràng."/><Principle n="02" title="Token first" text="Không hardcode radius, font-size, spacing hoặc màu trong feature page."/><Principle n="03" title="State is visual" text="Hover, focus, disabled, error, loading đều phải được thiết kế như state chính thức."/><Principle n="04" title="Business before decoration" text="Component ưu tiên scan nhanh, hành động rõ và data density tốt."/></div></Card></div><ColorSection/><TypographySection/><TokenSection/></>}
function Principle({n,title,text}:{n:string;title:string;text:string}){return <div className="principle"><span>{n}</span><div><strong>{title}</strong><p>{text}</p></div></div>}
function ThemePanel({mode,setMode,density,setDensity,radius,setRadius,fontSize,setFontSize,primary,setPrimary,contentWidth,setContentWidth}:any){return <div className="theme-panel"><Select label="Color mode" value={mode} onChange={value=>setMode(value)}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></Select><Select label="Density" value={density} onChange={value=>setDensity(value)}><option value="compact">Compact</option><option value="comfortable">Comfortable</option><option value="spacious">Spacious</option></Select><Select label="Border radius" value={radius} onChange={value=>setRadius(value)}><option value="square">Square</option><option value="soft">Soft</option><option value="rounded">Rounded</option><option value="pill">Pill controls</option></Select><Select label="Font size" value={fontSize} onChange={value=>setFontSize(value)}><option value="small">Small</option><option value="normal">Normal</option><option value="large">Large</option></Select><Select label="Content width" value={contentWidth} onChange={value=>setContentWidth(value)}><option value="boxed">Boxed</option><option value="wide">Wide</option><option value="fluid">Fluid</option></Select><Input label="Primary color" type="color" value={primary} onChange={e=>setPrimary(e.target.value)} hint={primary}/></div>}
function ColorSection(){const colors=[['Primary','var(--ui-primary)'],['Success','var(--ui-success)'],['Warning','var(--ui-warning)'],['Danger','var(--ui-danger)'],['Info','var(--ui-info)'],['Surface','var(--ui-surface)'],['Surface 2','var(--ui-surface-2)'],['Border','var(--ui-border)'],['Text','var(--ui-text)'],['Muted','var(--ui-text-muted)']];return <Card title="Color system" description="Semantic colors thay vì gắn màu theo từng màn"><div className="swatches">{colors.map(([n,c])=><div className="swatch" key={n}><i style={{background:c}}/><strong>{n}</strong><code>{c.replace('var(','').replace(')','')}</code></div>)}</div></Card>}
function TypographySection(){return <Card title="Typography" description="Scale nhỏ, rõ hierarchy, phù hợp admin density"><div className="type-spec"><div><span>Display / 32</span><h1>Quản lý sản phẩm</h1></div><div><span>Heading / 24</span><h2>Hiệu suất bán hàng</h2></div><div><span>Subheading / 18</span><h3>Thông tin đơn hàng</h3></div><div><span>Body / 15</span><p>Typography được tối ưu cho data-heavy interface và thao tác trong thời gian dài.</p></div><div><span>Caption / 12</span><small>Cập nhật 5 phút trước</small></div></div></Card>}
function TokenSection(){return <div className="token-cards"><Card title="Radius scale"><div className="radius-demo"><i/><i/><i/><i/></div></Card><Card title="Shadow scale"><div className="shadow-demo"><i/><i/><i/></div></Card><Card title="Spacing scale"><div className="spacing-demo">{[4,8,12,16,24,32].map(n=><div key={n}><i style={{width:n*2}}/><span>{n}px</span></div>)}</div></Card></div>}

function ButtonsGallery(){return <><DocHeader section="Components" title="Buttons & actions" description="Action hierarchy rõ ràng, đủ size, state và icon usage."/><Showcase title="Button variants" desc="Primary chỉ dùng cho hành động chính của context hiện tại."><div className="component-row"><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button></div></Showcase><Showcase title="Sizes & icons"><div className="component-row"><Button size="sm" leftIcon={<Icon name="plus" size={14}/>}>Small</Button><Button size="md" leftIcon={<Icon name="plus" size={16}/>}>Medium</Button><Button size="lg" leftIcon={<Icon name="plus" size={18}/>}>Large</Button><Button variant="outline" rightIcon={<Icon name="chevron" size={15}/>}>Continue</Button></div></Showcase><Showcase title="States"><div className="component-row"><Button loading>Saving...</Button><Button disabled>Disabled</Button><Button variant="outline" disabled>Disabled outline</Button><Button block>Full width action</Button></div></Showcase><Showcase title="Action composition" desc="Ví dụ toolbar thực tế."><div className="action-bar"><div><Button variant="outline">Xuất Excel</Button><Button variant="outline">Nhập dữ liệu</Button></div><div><Button variant="ghost">Hủy</Button><Button leftIcon={<Icon name="plus" size={16}/>}>Thêm sản phẩm</Button></div></div></Showcase></>}
function Showcase({title,desc,children}:{title:string;desc?:string;children:React.ReactNode}){return <Card title={title} description={desc}><div className="showcase-box">{children}</div></Card>}

function FormsGallery(){
 const[selected,setSelected]=useState('web');
 const[range,setRange]=useState(65);
 const[tags,setTags]=useState(['thời trang','áo nữ','new-arrival']);
 const[cover,setCover]=useState('look-1');
 const[checks,setChecks]=useState<string[]>(['look-1','look-3']);
 const img=(bg:string,text:string)=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#f8fafc"/></linearGradient></defs><rect width="600" height="450" fill="url(#g)"/><circle cx="300" cy="165" r="72" fill="#fff" opacity=".72"/><rect x="205" y="245" width="190" height="120" rx="42" fill="#fff" opacity=".82"/><text x="300" y="410" text-anchor="middle" font-family="Arial" font-size="28" fill="#334155">${text}</text></svg>`)}`;
 return <><DocHeader section="Components" title="Forms & data entry" description="Bộ data entry đầy đủ cho admin: custom select, date picker, range, tags, rich text, image choice, upload và selectable cards."/>
 <div className="two-col"><Card title="Advanced inputs"><div className="form-layout"><SearchInput label="Tìm sản phẩm" placeholder="Tên, SKU, barcode..."/><PasswordInput label="Mật khẩu" placeholder="Nhập mật khẩu"/><NumberInput label="Số lượng" defaultValue={2} min={0} max={99}/><div><div className="ui-demo-label">Input group</div><InputGroup><InputAddon>https://</InputAddon><Input aria-label="domain" placeholder="shop.example.com"/><InputAddon>.vn</InputAddon></InputGroup></div><Select label="Danh mục" placeholder="Chọn danh mục" options={[{value:'shirt',label:'Áo nữ'},{value:'dress',label:'Váy & đầm'},{value:'jacket',label:'Áo khoác'},{value:'acc',label:'Phụ kiện'}]}/></div></Card><Card title="Selectable cards"><div className="stack"><SelectableCard title="Website" description="Hiển thị sản phẩm trên website" selected={selected==='web'} onClick={()=>setSelected('web')}/><SelectableCard title="Mobile app" description="Chỉ hiển thị trong ứng dụng" selected={selected==='app'} onClick={()=>setSelected('app')}/><SelectableCard title="Ẩn tạm thời" description="Không hiển thị ở bất kỳ kênh nào" selected={selected==='off'} onClick={()=>setSelected('off')}/></div></Card></div>
 <div className="two-col"><Card title="Date picker"><div className="form-layout"><DatePicker label="Ngày bắt đầu" placeholder="dd/mm/yyyy"/><DateRangePicker label="Khoảng thời gian" placeholder="Chọn từ ngày – đến ngày"/><DatePicker label="Có giới hạn" minDate={new Date()} hint="Không cho chọn ngày trong quá khứ"/></div></Card><Card title="Inline date picker"><DatePicker inline defaultValue={new Date()}/></Card></div>
 <div className="two-col"><Card title="Range input"><div className="form-layout"><RangeInput label="Phần trăm giảm" value={range} onChange={setRange} formatValue={v=>`${v}%`}/><RangeInput label="Giá tối đa" min={0} max={2000000} step={50000} defaultValue={750000} formatValue={v=>`${(v/1000).toFixed(0)}k`}/></div></Card><Card title="Tags input"><TagsInput label="Tags sản phẩm" value={tags} onChange={setTags} hint="Enter hoặc dấu phẩy để thêm tag"/><div style={{height:14}}/><TagsInput label="Từ khóa SEO" defaultValue={['áo nữ','sarae']} maxTags={8}/></Card></div>
 <Card title="Rich text / HTML editor" description="Dùng cho description sản phẩm, bài viết, chính sách hoặc nội dung CMS."><RichTextEditor label="Mô tả sản phẩm" defaultValue="<h2>Chất liệu mềm nhẹ</h2><p>Thiết kế trẻ trung, phù hợp mặc hằng ngày và đi chơi.</p><ul><li>Form dễ mặc</li><li>Co giãn nhẹ</li></ul>"/></Card>
 <div className="two-col"><Card title="Image Check Radio" description="Chọn đúng một ảnh, phù hợp cover/layout/template."><ImageCheckGrid>{[['look-1','#dbeafe','Look 01'],['look-2','#fce7f3','Look 02'],['look-3','#dcfce7','Look 03']].map(([id,bg,name])=><ImageCheck key={id} type="radio" name="cover" value={id} checked={cover===id} onChange={()=>setCover(id)} src={img(bg,name)} alt={name} label={name}/>)}</ImageCheckGrid></Card><Card title="Image Check" description="Checkbox dạng hình ảnh, hỗ trợ chọn nhiều."><ImageCheckGrid>{[['look-1','#dbeafe','Ảnh 01'],['look-2','#fef3c7','Ảnh 02'],['look-3','#ede9fe','Ảnh 03']].map(([id,bg,name])=><ImageCheck key={id} checked={checks.includes(id)} onChange={yes=>setChecks(yes?[...checks,id]:checks.filter(x=>x!==id))} src={img(bg,name)} alt={name} label={name}/>)}</ImageCheckGrid></Card></div>
 <Card title="File upload / dropzone" description="Drag & drop responsive, có accept và size guard"><FileUpload multiple accept="image/*" maxSizeMb={5}/></Card>
 <Card title="Real form pattern"><div className="real-form"><div className="real-form__main"><SettingsSection title="Thông tin cơ bản" description="Thông tin hiển thị chính của sản phẩm."><div className="form-layout"><Input label="Tên sản phẩm"/><Select label="Danh mục" placeholder="Chọn danh mục" options={[{value:'shirt',label:'Áo nữ'},{value:'knit',label:'Áo len'},{value:'skirt',label:'Chân váy'}]}/><TagsInput label="Tags" defaultValue={['new','summer']}/><RichTextEditor label="Mô tả sản phẩm" minHeight={140}/></div></SettingsSection><SettingsSection title="Giá & tồn kho" description="Cấu hình bán hàng và kiểm soát tồn."><div className="form-layout"><Input label="Giá bán" prefix="₫"/><NumberInput label="Tồn kho" defaultValue={12} min={0}/><DateRangePicker label="Thời gian mở bán"/></div></SettingsSection></div><aside className="real-form__aside"><strong>Xuất bản</strong><Switch label="Website" defaultChecked/><Switch label="Mobile app" defaultChecked/><Button block>Lưu sản phẩm</Button></aside></div></Card></>
}
function DataGallery({tab,setTab}:any){return <><DocHeader section="Components" title="Data display" description="DataTable thật với search, sort, row selection, column visibility và pagination."/><DataTable data={products} rowKey={(r:any)=>r.sku} searchText={(r:any)=>`${r.name} ${r.sku} ${r.category}`} columns={[{key:'name',header:'Sản phẩm',sortValue:(r:any)=>r.name,accessor:(r:any)=><div className="product-cell"><div className="product-thumb">{r.name[0]}</div><div><strong>{r.name}</strong><span>{r.category}</span></div></div>},{key:'sku',header:'SKU',sortValue:(r:any)=>r.sku},{key:'price',header:'Giá',align:'right',sortValue:(r:any)=>Number(r.price.replace(/\D/g,''))},{key:'stock',header:'Kho',align:'right',sortValue:(r:any)=>r.stock},{key:'status',header:'Trạng thái',accessor:(r:any)=><Badge tone={r.stock===0?'danger':r.stock<20?'warning':'success'} dot>{r.status}</Badge>}]} toolbarActions={<Button size="sm">Bulk action</Button>}/><div className="two-col"><Card title="Tabs"><Tabs items={[{value:'overview',label:'Tổng quan'},{value:'inventory',label:'Tồn kho'},{value:'history',label:'Lịch sử'}]} value={tab} onChange={setTab}/></Card><Card title="Steps"><Steps current={1} items={[{title:'Giỏ hàng'},{title:'Thanh toán'},{title:'Hoàn tất'}]}/></Card></div></>}
function FeedbackGallery({setModal,setSuccessModal,setDrawer,setConfirmOpen}:any){return <><DocHeader section="Components" title="Feedback & overlays" description="Alert, toast, confirm, loading overlay, modal, drawer và activity timeline."/><ToastDemo/><div className="two-col"><Card title="Alerts"><div className="stack"><Alert tone="info" title="Thông tin">Sản phẩm sẽ được đồng bộ sau khi lưu.</Alert><Alert tone="success" title="Thành công">Đã cập nhật 12 sản phẩm.</Alert><Alert tone="warning" title="Cảnh báo">Một số SKU sắp hết hàng.</Alert><Alert tone="danger" title="Có lỗi xảy ra">Không thể đồng bộ tồn kho.</Alert></div></Card><Card title="Modal & confirmation"><div className="component-row"><Button onClick={()=>setModal(true)}>Standard modal</Button><Button variant="secondary" onClick={()=>setSuccessModal(true)}>Success modal</Button><Button variant="danger" onClick={()=>setConfirmOpen(true)}>Delete confirm</Button><Button variant="outline" onClick={()=>setDrawer(true)}>Drawer</Button></div></Card></div><div className="two-col"><LoadingDemo/><Card title="Activity feed"><ActivityFeed items={[{title:'Đã tạo sản phẩm',description:'Áo zip cổ bẻ được tạo bởi Phuc IT',time:'10:32'},{title:'Cập nhật tồn kho',description:'Kho tăng từ 12 lên 26',time:'10:45'},{title:'Xuất bản website',description:'Sản phẩm hiện đã hiển thị công khai',time:'11:02'}]}/></Card></div></>}
function ToastDemo(){const toast=useToast();return <Card title="Toast notifications"><div className="component-row"><Button onClick={()=>toast.push({title:'Lưu thành công',description:'Dữ liệu đã được cập nhật.',tone:'success'})}>Success toast</Button><Button variant="outline" onClick={()=>toast.push({title:'Cần kiểm tra',description:'Một số SKU sắp hết hàng.',tone:'warning'})}>Warning toast</Button><Button variant="danger" onClick={()=>toast.push({title:'Không thể lưu',description:'Máy chủ trả về lỗi.',tone:'danger'})}>Error toast</Button></div></Card>}
function LoadingDemo(){const[loading,setLoading]=useState(false);return <Card title="Loading overlay"><div style={{position:'relative',minHeight:150}}><p>Overlay này có thể phủ card hoặc vùng thao tác trong khi request đang chạy.</p><Button onClick={()=>{setLoading(true);setTimeout(()=>setLoading(false),1400)}}>Test loading</Button><LoadingOverlay visible={loading}/></div></Card>}
function PatternsGallery(){const[segment,setSegment]=useState('general');return <><DocHeader section="Patterns" title="Admin patterns" description="Filter bar, settings section, accordion, segmented navigation và activity patterns."/><Card title="Filter bar"><FilterBar actions={<><Button variant="ghost">Đặt lại</Button><Button>Lọc dữ liệu</Button></>}><SearchInput placeholder="Tìm sản phẩm..."/><Select><option>Tất cả danh mục</option></Select><Select><option>Tất cả trạng thái</option></Select></FilterBar></Card><div className="two-col"><Card title="Segmented control"><SegmentedControl fullWidth value={segment} onChange={setSegment} items={[{value:'general',label:'Thông tin'},{value:'shipping',label:'Vận chuyển'},{value:'payment',label:'Thanh toán'}]}/><div className="tab-preview"><strong>{segment}</strong><p>Pattern chuyển section nhanh, phù hợp setting hoặc report.</p></div></Card><Card title="Accordion"><Accordion defaultOpen={['one']} items={[{value:'one',title:'Thông tin chung',content:'Tên cửa hàng, địa chỉ và cấu hình mặc định.'},{value:'two',title:'Thanh toán',content:'Cấu hình cổng thanh toán và đối soát.'},{value:'three',title:'Thông báo',content:'Email, push notification và cảnh báo vận hành.'}]}/></Card></div><Card title="Settings layout"><SettingsSection title="Thông tin cửa hàng" description="Các setting nên chia section thay vì nhồi vào một form dài."><div className="form-layout"><Input label="Tên cửa hàng" defaultValue="Sarae Fashion"/><Input label="Email" defaultValue="hello@sarae.vn"/></div></SettingsSection><SettingsSection title="Hiển thị" description="Theme core hỗ trợ density, radius, font và content width runtime."><div className="control-list"><Switch label="Dark mode theo hệ thống"/><Switch label="Sidebar thu gọn được" defaultChecked/></div></SettingsSection></Card></>}
