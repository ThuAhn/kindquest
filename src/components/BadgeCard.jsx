import { LockKeyhole } from 'lucide-react';
export default function BadgeCard({badge,unlocked}) {return <div className={`badge-card ${unlocked?'unlocked':'locked'}`}><div className="badge-art">{unlocked?badge.emoji:<LockKeyhole size={28}/>}</div><div><h3>{badge.name}</h3><p>{badge.description}</p><span className="badge-status">{unlocked?'✓ Đã mở khóa':'Chưa mở khóa'}</span></div></div>}
