import React from 'react';import './tooltip.scss';
export function Tooltip({content,children}:{content:React.ReactNode;children:React.ReactNode}){return <span className="ui-tooltip" tabIndex={0}>{children}<span className="ui-tooltip__bubble">{content}</span></span>}
