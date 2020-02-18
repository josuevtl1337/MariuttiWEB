import React from 'react';

const estilos = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.3)',
    zIndex: '100',
    top: '0',
    left: '0'
};

const backdrop = props => (
    <div style={estilos} onClick={props.click}></div>
);

export default backdrop