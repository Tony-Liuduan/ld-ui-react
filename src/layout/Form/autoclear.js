import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './autoclear.scss';


const Autoclear = props => {
    const { className, show, err, onClear } = props;
    const clsPrefix = 'ld-autoclear';

    const cls = classNames(`${clsPrefix}-icon`, {
        [`${clsPrefix}-err`]: err
    });

    return show ?
        <div className={`${clsPrefix} ${className}`} onClick={onClear}>
            <span className={cls}></span>
        </div>
        : null;
};

Autoclear.propTypes = {
    className: PropTypes.string,
    show: PropTypes.bool,
    onClear: PropTypes.func
};

Autoclear.defaultProps = {
    show: false,
    err: false,
    onClear() { }
};

export default Autoclear;