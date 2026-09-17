import React from 'react';
import { Input, type InputProps } from '../Input/Input';
export function SearchInput({onChange,...props}:InputProps){return <Input {...props} type="search" prefix={<span aria-hidden>⌕</span>} onChange={onChange} />}
