import React from 'react';

function Alert(props) {
    const capitalize = (word) => {
        if (word === 'danger') {
            word = 'error';
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        props.alert && (
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show position-fixed end-0`} role="alert" style={{width: '348px', marginRight: '6.1px', zIndex: '1' }}>
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>
        )
    );
}

export default Alert;