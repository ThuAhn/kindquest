import { Clock3, Check, ArrowUpRight } from 'lucide-react';
export default function QuestCard({quest,done,onComplete}) {
 return <article className={`quest-card ${done?'completed':''}`}>
   <div className={`quest-icon ${quest.color}`}>{quest.emoji}</div>
   <div className="quest-body"><div className="quest-meta"><span className="category">{quest.category}</span><span className="dot">•</span><span>{quest.difficulty}</span></div><h3>{quest.title}</h3><p>{quest.description}</p><div className="quest-footer"><span className="time"><Clock3 size={14}/>{quest.minutes} phút</span><span className="points">✦ +{quest.points} KP</span></div></div>
   <button className={`complete-btn ${done?'is-done':''}`} onClick={()=>onComplete(quest)} disabled={done} aria-label={done?`Đã hoàn thành ${quest.title}`:`Hoàn thành ${quest.title}`}>{done?<Check size={19}/>:<ArrowUpRight size={19}/>}</button>
 </article>
}
