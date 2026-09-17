import React from 'react';
import { cx } from '../../utils/cx';
import './selectablecard.scss';
export function SelectableCard({title,description,icon,selected,onClick,disabled}:{title:string;description?:string;icon?:React.ReactNode;selected?:boolean;onClick?:()=>void;disabled?:boolean}){return <button type="button" className={cx('ui-selectable-card',selected&&'is-selected')} onClick={onClick} disabled={disabled}>{icon&&<span className="ui-selectable-card__icon">{icon}</span>}<span><strong>{title}</strong>{description&&<small>{description}</small>}</span><span className="ui-selectable-card__check">{selected?'✓':''}</span></button>}
