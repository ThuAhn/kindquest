import { useEffect, useMemo, useState } from 'react';
import { Sparkles, House, Compass, Award, ChartNoAxesColumnIncreasing, RotateCcw, Leaf, Heart, ArrowRight, CheckCircle2, X, Menu, Trophy, Target, Zap, ShieldCheck } from 'lucide-react';
import QuestCard from './components/QuestCard.jsx';
import BadgeCard from './components/BadgeCard.jsx';
import {quests,badges} from './data/quests.js';
const STORAGE_KEY='kindquest-mvp-v1';
const tabs=[{id:'home',name:'Tổng quan',icon:House},{id:'quests',name:'Nhiệm vụ',icon:Compass},{id:'badges',name:'Huy hiệu',icon:Award},{id:'stats',name:'Thành tích',icon:ChartNoAxesColumnIncreasing}];
function loadProgress(){try{const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');return Array.isArray(raw.completed)?raw.completed.filter(id=>quests.some(q=>q.id===id)):[]}catch{return []}}
function App(){
 const [completed,setCompleted]=useState(loadProgress);
 const [tab,setTab]=useState('home');
 const [filter,setFilter]=useState('Tất cả');
 const [toast,setToast]=useState(null);
 const [mobileMenu,setMobileMenu]=useState(false);
 const [confirmReset,setConfirmReset]=useState(false);
 const completedQuests=useMemo(()=>quests.filter(q=>completed.includes(q.id)),[completed]);
 const points=completedQuests.reduce((sum,q)=>sum+q.points,0);
 const level=Math.floor(points/50)+1;
 const levelProgress=points%50*2;
 const environment=completedQuests.filter(q=>q.category==='Môi trường').length;
 const unlockedBadges=badges.filter(b=>b.type==='count'?completed.length>=b.threshold:b.type==='environment'?environment>=b.threshold:points>=b.threshold);
 const filtered=quests.filter(q=>filter==='Tất cả'||q.category===filter);
 useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify({completed}))},[completed]);
 useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(null),3600);return()=>clearTimeout(timer)},[toast]);
 function complete(quest){if(completed.includes(quest.id))return;setCompleted(prev=>[...prev,quest.id]);setToast({title:'Tuyệt vời! Nhiệm vụ hoàn thành 🎉',body:`Bạn nhận được +${quest.points} KindPoints!`})}
 function changeTab(id){setTab(id);setMobileMenu(false);window.scrollTo({top:0,behavior:'smooth'})}
 function reset(){setCompleted([]);setConfirmReset(false);setToast({title:'Đã bắt đầu lại',body:'Tiến độ của bạn đã được đặt về 0.'})}
 return <div className="app-shell">
   <aside className={`sidebar ${mobileMenu?'sidebar-open':''}`}>
    <div className="brand"><div className="brand-icon"><Leaf size={24}/></div><div><strong>kindquest<span>.</span></strong><small>small actions, big impact</small></div></div>
    <div className="nav-label">KHÁM PHÁ</div><nav className="nav">{tabs.map(item=>{const Icon=item.icon;return <button key={item.id} className={`nav-item ${tab===item.id?'active':''}`} onClick={()=>changeTab(item.id)}><Icon size={19}/><span>{item.name}</span>{tab===item.id&&<span className="nav-active-dot"/>}</button>})}</nav>
    <div className="sidebar-bottom"><div className="mini-quote"><span>✳</span><p>“Điều tốt đẹp bắt đầu từ những hành động nhỏ.”</p></div><div className="sidebar-foot">Made with 💚 for a kinder world</div></div>
   </aside>
   {mobileMenu&&<button className="mobile-overlay" aria-label="Đóng menu" onClick={()=>setMobileMenu(false)}/>}
   <main className="main-content"><header className="topbar"><button className="menu-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Mở menu"><Menu size={23}/></button><span className="topbar-greeting">Hôm nay là một ngày tuyệt vời để làm điều tốt <span>☀️</span></span><div className="topbar-right"><span className="top-points">✦ {points} <small>KP</small></span><div className="avatar">K</div></div></header>
    <div className="content">
    {tab==='home'&&<>
      <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> MỖI NGÀY MỘT VIỆC TỐT</span><h1>Hành động nhỏ.<br/><em>Thay đổi lớn.</em></h1><p>Biến những điều tử tế hằng ngày thành hành trình đầy cảm hứng. Chọn một nhiệm vụ và bắt đầu ngay hôm nay!</p><button className="primary-btn" onClick={()=>changeTab('quests')}>Khám phá nhiệm vụ <ArrowRight size={18}/></button></div><div className="hero-art" aria-hidden="true"><div className="art-sun">✳</div><div className="art-heart">💚</div><div className="art-orbit orbit-one">✦</div><div className="art-orbit orbit-two">🌱</div><div className="art-orbit orbit-three">✨</div><div className="art-caption">BE KIND<br/>DO GOOD</div></div></section>
      <section className="metrics"><div className="metric"><span className="metric-icon orange"><Zap size={21}/></span><div><small>Tổng KindPoints</small><strong>{points} <span>KP</span></strong></div></div><div className="metric"><span className="metric-icon green"><CheckCircle2 size={21}/></span><div><small>Nhiệm vụ hoàn thành</small><strong>{completed.length}<span>/{quests.length}</span></strong></div></div><div className="metric"><span className="metric-icon purple"><Award size={21}/></span><div><small>Huy hiệu đạt được</small><strong>{unlockedBadges.length}<span>/{badges.length}</span></strong></div></div></section>
      <div className="two-col"><section className="panel"><div className="section-head"><div><span className="section-kicker">DÀNH CHO BẠN</span><h2>Nhiệm vụ nổi bật <span>✦</span></h2></div><button className="text-link" onClick={()=>changeTab('quests')}>Xem tất cả <ArrowRight size={16}/></button></div><div className="quest-list">{quests.slice(0,3).map(q=><QuestCard key={q.id} quest={q} done={completed.includes(q.id)} onComplete={complete}/>)}</div></section>
      <div className="right-stack"><section className="level-card"><div className="level-top"><span className="level-pill"><Trophy size={15}/> HÀNH TRÌNH CỦA BẠN</span><span className="level-star">⭐</span></div><h2>Level {level}</h2><p>{points%50}/50 KP để lên cấp tiếp theo</p><div className="progress-track"><div style={{width:`${levelProgress}%`}}/></div><div className="level-bottom"><span>Tiếp tục lan tỏa điều tốt!</span><span>✦</span></div></section><section className="tip-card"><span className="tip-emoji">💌</span><h3>Một lời nhắn nhỏ</h3><p>Bạn không cần làm điều gì thật lớn lao để tạo nên khác biệt. Bắt đầu từ hôm nay nhé!</p></section></div></div>
    </>}
    {tab==='quests'&&<><div className="page-heading"><span className="section-kicker">KHÁM PHÁ & HÀNH ĐỘNG</span><h1>Nhiệm vụ của bạn <span>✳</span></h1><p>Mỗi nhiệm vụ là một cơ hội để làm thế giới tốt đẹp hơn.</p></div><div className="quest-summary"><Target size={22}/><span>Bạn đã hoàn thành <strong>{completed.length}/{quests.length}</strong> nhiệm vụ</span><div className="summary-track"><div style={{width:`${completed.length/quests.length*100}%`}}/></div></div><div className="filter-row">{['Tất cả','Tử tế','Môi trường','Học tập','Cộng đồng'].map(c=><button key={c} className={`filter-chip ${filter===c?'selected':''}`} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="quest-grid">{filtered.map(q=><QuestCard key={q.id} quest={q} done={completed.includes(q.id)} onComplete={complete}/>)}</div></>}
    {tab==='badges'&&<><div className="page-heading"><span className="section-kicker">BỘ SƯU TẬP CỦA BẠN</span><h1>Huy hiệu thành tích <span>🏅</span></h1><p>Mỗi huy hiệu đánh dấu một bước tiến trên hành trình tử tế.</p></div><div className="badge-banner"><div className="badge-banner-icon">🏆</div><div><h2>{unlockedBadges.length} / {badges.length} huy hiệu</h2><p>Tiếp tục hoàn thành nhiệm vụ để mở khóa tất cả!</p></div></div><div className="badges-grid">{badges.map(b=><BadgeCard key={b.id} badge={b} unlocked={unlockedBadges.some(u=>u.id===b.id)}/>)}</div></>}
    {tab==='stats'&&<><div className="page-heading"><span className="section-kicker">HÀNH TRÌNH CỦA BẠN</span><h1>Thành tích cá nhân <span>📈</span></h1><p>Nhìn lại những điều tốt đẹp bạn đã thực hiện.</p></div><section className="metrics stats-metrics"><div className="metric"><span className="metric-icon orange"><Zap size={21}/></span><div><small>KindPoints</small><strong>{points}</strong></div></div><div className="metric"><span className="metric-icon green"><Heart size={21}/></span><div><small>Việc tốt</small><strong>{completed.length}</strong></div></div><div className="metric"><span className="metric-icon purple"><Award size={21}/></span><div><small>Huy hiệu</small><strong>{unlockedBadges.length}</strong></div></div></section><section className="panel stats-panel"><div className="section-head"><div><span className="section-kicker">TỔNG QUAN</span><h2>Đóng góp theo lĩnh vực</h2></div></div>{['Tử tế','Môi trường','Học tập','Cộng đồng'].map((c,i)=>{const count=completedQuests.filter(q=>q.category===c).length;const total=quests.filter(q=>q.category===c).length;return <div className="category-stat" key={c}><div className="category-stat-head"><span>{['💗','🌿','📚','🤝'][i]} {c}</span><strong>{count}/{total}</strong></div><div className="category-track"><div className={`bar-${i}`} style={{width:`${count/total*100}%`}}/></div></div>})}</section><section className="panel reset-panel"><div><h3><ShieldCheck size={19}/> Dữ liệu của bạn</h3><p>Tiến độ chỉ được lưu trên trình duyệt hiện tại bằng localStorage. Không có dữ liệu nào được gửi đến máy chủ.</p></div><button className="reset-btn" onClick={()=>setConfirmReset(true)}><RotateCcw size={16}/> Đặt lại tiến độ</button></section></>}
    <footer className="footer">KindQuest © 2026 · Small actions, big impact <span>Made for the From Idea to Working MVP workshop</span></footer>
    </div>
   </main>
   {toast&&<div className="toast" role="status"><span className="toast-icon">🎉</span><div><strong>{toast.title}</strong><p>{toast.body}</p></div><button aria-label="Đóng thông báo" onClick={()=>setToast(null)}><X size={17}/></button></div>}
   {confirmReset&&<div className="modal-backdrop" role="presentation"><div className="modal" role="dialog" aria-modal="true" aria-labelledby="reset-title"><div className="modal-emoji">🔄</div><h2 id="reset-title">Bắt đầu lại hành trình?</h2><p>Tất cả KindPoints, nhiệm vụ đã hoàn thành và huy hiệu sẽ được đặt lại. Hành động này không thể hoàn tác.</p><div className="modal-actions"><button className="cancel-btn" onClick={()=>setConfirmReset(false)}>Hủy</button><button className="danger-btn" onClick={reset}>Đặt lại</button></div></div></div>}
 </div>
}
export default App;
