import React from 'react';import {cx} from '../../utils/cx';import './badge.scss';
export type BadgeTone='default'|'primary'|'success'|'warning'|'danger'|'info';
export function Badge({tone='default',dot=false,children,className}:{tone?:BadgeTone;dot?:boolean;children:React.ReactNode;className?:string}){return <span className={cx('ui-badge',`ui-badge--${tone}`,className)}>{dot&&<span className="ui-badge__dot"/>}{children}</span>}
