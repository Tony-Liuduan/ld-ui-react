import React, { Component } from 'react';
import Checkedinput from './checkedinput';
import './agreement.scss';

const Agreement = props => {
    const { children, className, ...others } = props;

    return <div className={`ld-agreement-container ${className}`}>
        <Checkedinput type="agreement" {...others} />
        {children}
    </div>

}; 

export default Agreement;