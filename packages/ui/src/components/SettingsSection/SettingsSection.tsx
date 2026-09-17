import React from 'react';
import './settingssection.scss';
export function SettingsSection({title,description,children,action}:{title:string;description?:string;children:React.ReactNode;action?:React.ReactNode}){return <section className="ui-settings-section"><div className="ui-settings-section__head"><div><h3>{title}</h3>{description&&<p>{description}</p>}</div>{action}</div><div className="ui-settings-section__body">{children}</div></section>}
