import React from 'react';
import { cx } from '../../utils/cx';
import './filterbar.scss';
export function FilterBar({children,actions,className}:{children:React.ReactNode;actions?:React.ReactNode;className?:string}){return <div className={cx('ui-filter-bar',className)}><div className="ui-filter-bar__fields">{children}</div>{actions&&<div className="ui-filter-bar__actions">{actions}</div>}</div>}
