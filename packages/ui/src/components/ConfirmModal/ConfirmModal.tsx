import React from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import './confirmmodal.scss';
export function ConfirmModal({open,onClose,onConfirm,title='Xác nhận',description='Bạn có chắc chắn muốn tiếp tục?',confirmLabel='Xác nhận',cancelLabel='Hủy',tone='danger',loading=false}:{open:boolean;onClose:()=>void;onConfirm:()=>void;title?:string;description?:string;confirmLabel?:string;cancelLabel?:string;tone?:'danger'|'primary';loading?:boolean}){return <Modal open={open} onClose={onClose} size="sm" title={title} footer={<><Button variant="ghost" onClick={onClose}>{cancelLabel}</Button><Button variant={tone==='danger'?'danger':'primary'} loading={loading} onClick={onConfirm}>{confirmLabel}</Button></>}><div className="ui-confirm-modal"><div className={`ui-confirm-modal__icon is-${tone}`}>{tone==='danger'?'!':'?'}</div><p>{description}</p></div></Modal>}
