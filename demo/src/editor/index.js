import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import EmailEditor from '../../../src';
import Popup from './popup';
import sample from './sample.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #ffda66;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 62px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;

const Editor = (props) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const showPopup = (content) => {
    setPopupContent(content)
    setIsOpenPopup(!isOpenPopup)
  };
  const closePopup = () => {
    setPopupContent('');
    setIsOpenPopup(!isOpenPopup)
  };

  const emailEditorRef = useRef(null);

  const saveDesign = () => {
    // emailEditorRef.current.editor.saveDesign((design) => {
    // });
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      if (typeof saveEmailTemplate === "function") {
        saveEmailTemplate(design, html)
      } else {
        console.log('exportHtml', html);
        console.log('design', design);
      }
    });
  };

  const exportHtml = async () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      showPopup(html)
    });
  };

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = () => {
    console.log('onLoad');

    emailEditorRef.current.editor.addEventListener(
      'design:loaded',
      onDesignLoad
    );

    emailEditorRef.current.editor.loadDesign(sample);
  }

  const onReady = () => {
    console.log('onReady');
  };

  return (
    <Container>
      <Bar>
        <h1>Create Email Template</h1>

        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
      </Bar>

      <React.StrictMode>
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </React.StrictMode>
      {isOpenPopup && <Popup
        content={
            <pre>
              <code>
                {popupContent}
              </code>
            </pre>
          }
        handleClose={closePopup}
      />}
    </Container>
  );
};

export default Editor;
