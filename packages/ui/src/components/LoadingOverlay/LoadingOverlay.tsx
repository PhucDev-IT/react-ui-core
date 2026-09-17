import React from 'react';
import { Spinner } from '../Spinner/Spinner';
import { cx } from '../../utils/cx';
import './loadingoverlay.scss';
export function LoadingOverlay({visible,label='Đang xử lý...',blur=true}:{visible:boolean;label?:string;blur?:boolean}){if(!visible)return null;return <div className={cx('ui-loading-overlay',blur&&'is-blur')}><div className="ui-loading-overlay__panel"><Spinner/><span>{label}</span></div></div>}
