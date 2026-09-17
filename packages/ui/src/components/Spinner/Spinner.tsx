import React from 'react';import {cx} from '../../utils/cx';import './spinner.scss';
export function Spinner({size='md',label='Loading'}:{size?:'sm'|'md'|'lg';label?:string}){return <span className={cx('ui-spinner',`ui-spinner--${size}`)} role="status" aria-label={label}/>}
