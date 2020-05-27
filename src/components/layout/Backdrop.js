import React from 'react';

const estilos = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    zIndex: '2500',
    top: '0',
    left: '0',
};

const backdrop = props => (
    <div style={estilos} className="backdrop" onClick={props.click}></div>
);

export default backdrop