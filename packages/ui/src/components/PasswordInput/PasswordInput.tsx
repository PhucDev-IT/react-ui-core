import React,{useState} from 'react';
import { Input, type InputProps } from '../Input/Input';
export function PasswordInput(props:InputProps){const[show,setShow]=useState(false);return <Input {...props} type={show?'text':'password'} suffix={<button type="button" className="ui-input-action" onClick={()=>setShow(v=>!v)} aria-label={show?'Hide password':'Show password'}>{show?'Hide':'Show'}</button>}/>}
