import React from 'react';import './skeleton.scss';
export function Skeleton({width='100%',height=16,radius}: {width?:string|number;height?:string|number;radius?:string|number}){return <span className="ui-skeleton" style={{width,height,borderRadius:radius}}/>}
