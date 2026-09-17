import React from 'react';import './divider.scss';
export function Divider({label}:{label?:React.ReactNode}){return <div className="ui-divider"><span/>{label&&<em>{label}</em>}<span/></div>}
