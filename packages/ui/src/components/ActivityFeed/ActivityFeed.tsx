import React from 'react';
import './activityfeed.scss';
export interface ActivityItem{title:string;description?:string;time?:string;avatar?:React.ReactNode;icon?:React.ReactNode}
export function ActivityFeed({items}:{items:ActivityItem[]}){return <div className="ui-activity-feed">{items.map((item,i)=><div className="ui-activity-item" key={`${item.title}-${i}`}><div className="ui-activity-item__avatar">{item.avatar??item.icon??'•'}</div><div><div className="ui-activity-item__line"><strong>{item.title}</strong>{item.time&&<span>{item.time}</span>}</div>{item.description&&<p>{item.description}</p>}</div></div>)}</div>}
