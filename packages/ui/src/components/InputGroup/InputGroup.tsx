import React from 'react';
import { cx } from '../../utils/cx';
import './inputgroup.scss';
export function InputGroup({children,className}:{children:React.ReactNode;className?:string}){return <div className={cx('ui-input-group',className)}>{children}</div>}
export function InputAddon({children}:{children:React.ReactNode}){return <span className="ui-input-addon">{children}</span>}
