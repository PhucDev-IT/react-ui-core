import {useState} from 'react';
import {
  Button,Card,Progress,LoadingOverlay,InlineLoader,DotsLoader,PulseLoader,SectionLoader,PageLoader,LoadingState,DelayedLoader,
  Skeleton,SkeletonText,SkeletonAvatar,SkeletonCard,SkeletonList,SkeletonTable,SkeletonForm,SkeletonProductCard,SkeletonPage
} from '@my/ui';
import './loading-demo.scss';

export default function LoadingDemo(){
  const[buttonLoading,setButtonLoading]=useState(false);
  const[overlay,setOverlay]=useState(false);
  const[state,setState]=useState<'loading'|'empty'|'error'|'success'>('loading');
  const[delayLoading,setDelayLoading]=useState(false);
  const runButton=()=>{setButtonLoading(true);window.setTimeout(()=>setButtonLoading(false),1400)};
  const runOverlay=()=>{setOverlay(true);window.setTimeout(()=>setOverlay(false),1500)};
  const runDelay=()=>{setDelayLoading(true);window.setTimeout(()=>setDelayLoading(false),900)};
  return <div className="loading-demo">
    <header className="loading-demo__hero"><div><span>R Core / Feedback</span><h1>Loading & Skeleton System</h1><p>Pattern thống nhất cho submit, fetch dữ liệu, page loading, table loading, empty/error state và upload progress.</p></div><Button variant="outline" onClick={()=>location.href='/'}>← Demo chính</Button></header>

    <DemoSection title="Action loading" desc="Dùng cho thao tác có chủ đích của người dùng: lưu, xác nhận, thanh toán, đồng bộ.">
      <div className="loading-demo__row">
        <Button loading>Đang lưu</Button>
        <Button variant="outline" loading>Đang tải</Button>
        <Button variant="danger" loading>Đang xóa</Button>
        <Button onClick={runButton} loading={buttonLoading}>{buttonLoading?'Đang xử lý':'Thử loading'}</Button>
      </div>
    </DemoSection>

    <DemoSection title="Inline loaders" desc="Dùng khi chỉ một phần nhỏ đang cập nhật, không nên khóa toàn bộ màn hình.">
      <div className="loading-demo__row loading-demo__row--large">
        <InlineLoader label="Đang đồng bộ..."/>
        <InlineLoader variant="dots" label="Đang tìm sản phẩm..."/>
        <InlineLoader variant="pulse" label="Đang kiểm tra tồn kho..."/>
        <DotsLoader/><PulseLoader/>
      </div>
    </DemoSection>

    <DemoSection title="Section / blocking loading" desc="SectionLoader cho một khu vực; LoadingOverlay cho tác vụ cần chặn interaction tạm thời.">
      <div className="loading-demo__grid">
        <SectionLoader label="Đang tải đơn hàng..." minHeight={210}/>
        <div className="loading-demo__overlay-target">
          <Card title="Thông tin sản phẩm"><p>Nội dung vẫn giữ layout trong lúc request blocking.</p><Button variant="outline" onClick={runOverlay}>Hiện overlay</Button></Card>
          <LoadingOverlay visible={overlay} label="Đang cập nhật sản phẩm..."/>
        </div>
      </div>
    </DemoSection>

    <DemoSection title="Skeleton primitives" desc="Dùng skeleton khi có thể dự đoán hình dạng dữ liệu sắp hiển thị.">
      <div className="loading-demo__grid loading-demo__grid--3">
        <Card title="Text + avatar"><div className="loading-demo__identity"><SkeletonAvatar size={44}/><div><Skeleton width={150} height={13}/><Skeleton width={95} height={10}/></div></div><div className="loading-demo__space"/><SkeletonText lines={4}/></Card>
        <SkeletonCard/>
        <SkeletonProductCard/>
      </div>
    </DemoSection>

    <DemoSection title="Skeleton patterns" desc="Các pattern dựng sẵn để feature không phải lặp lại skeleton bằng tay.">
      <div className="loading-demo__stack">
        <Card title="List"><SkeletonList items={4}/></Card>
        <Card title="Form"><SkeletonForm fields={4}/></Card>
        <Card title="Table"><SkeletonTable rows={5} columns={5}/></Card>
      </div>
    </DemoSection>

    <DemoSection title="Loading / Empty / Error / Success state" desc="Một wrapper thống nhất cho lifecycle của data-driven UI.">
      <div className="loading-demo__row">{(['loading','empty','error','success'] as const).map(x=><Button key={x} size="sm" variant={state===x?'primary':'outline'} onClick={()=>setState(x)}>{x}</Button>)}</div>
      <LoadingState loading={state==='loading'} empty={state==='empty'} error={state==='error'?'Máy chủ tạm thời không phản hồi.':''} onRetry={()=>setState('loading')}>
        <Card title="Dữ liệu đã tải"><p>State thành công render nội dung thật của feature.</p></Card>
      </LoadingState>
    </DemoSection>

    <DemoSection title="Delayed loading" desc="Delay ngắn giúp tránh spinner chớp nhanh ở request hoàn thành gần như tức thì.">
      <div className="loading-demo__row"><Button variant="outline" onClick={runDelay}>Mô phỏng request</Button><DelayedLoader loading={delayLoading} delay={180} fallback={<InlineLoader label="Request đang lâu hơn 180ms..."/>}>{!delayLoading&&<span className="loading-demo__success">✓ Không hiện loader nếu request quá nhanh</span>}</DelayedLoader></div>
    </DemoSection>

    <DemoSection title="Progress" desc="Dùng khi biết tiến độ thực tế, ví dụ upload/import/export. Không dùng progress giả thay cho spinner.">
      <div className="loading-demo__progress"><Progress value={34} label="Upload ảnh sản phẩm" showValue/><Progress value={72} label="Import dữ liệu" showValue/><Progress value={100} label="Hoàn tất" showValue/></div>
    </DemoSection>

    <DemoSection title="Full page skeleton" desc="Dùng cho route/page data-heavy khi muốn giữ layout ổn định ngay từ đầu.">
      <SkeletonPage/>
    </DemoSection>

    <DemoSection title="Full page loader" desc="Chỉ dùng khi chưa thể dự đoán layout hoặc bootstrap toàn ứng dụng.">
      <PageLoader label="Đang khởi tạo workspace..." description="Đang tải cấu hình và quyền truy cập."/>
    </DemoSection>
  </div>
}
function DemoSection({title,desc,children}:{title:string;desc?:string;children:React.ReactNode}){return <section className="loading-demo__section"><header><span>Loading pattern</span><h2>{title}</h2>{desc&&<p>{desc}</p>}</header><div className="loading-demo__body">{children}</div></section>}
