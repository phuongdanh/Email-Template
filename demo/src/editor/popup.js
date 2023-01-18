import React from "react";

const popupWrapper = {
    position: 'fixed',
    background: '#00000050',
    width: '100%',
    height: '100vh',
    top: '0',
    left: '0',
}

const popupContent = {
    position: 'relative',
    width: '70%',
    margin: '0 auto',
    height: 'auto',
    maxHeight: '70vh',
    marginTop: 'calc(100vh - 85vh - 20px)',
    background: '#fff',
    borderRadius: '4px',
    padding: '20px',
    border: '1px solid #999',
    overflow: 'auto',
  }

const popupCloseButton = {
    content: 'x',
    cursor: 'pointer',
    position: 'fixed',
    right: 'calc(15% - 30px)',
    top: 'calc(100vh - 85vh - 33px)',
    background: '#ededed',
    width: '25px',
    height: '25px',
    borderRadius: '50%',
    lineHeight: '20px',
    textAlign: 'center',
    border: '1px solid #999',
    fontSize: '20px',
}

const Popup = props => {
  return (
    <div style={popupWrapper}>
      <div style={popupContent}>
        <span style={popupCloseButton} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;