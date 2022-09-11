import React, { useState, useContext, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { ChatEngineContext } from 'react-chat-engine';
import DirectMessageSearch from '../../DirectMessageSearch';

const NewChatFormMoose = (props) => {
  const { conn } = useContext(ChatEngineContext);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(false);

  return (
    <>
      {props.onClose && (
        <div style={{ height: '0px' }}>
          <CloseOutlined
            style={styles.closeIcon}
            onClick={() => props.onClose()}
          />
        </div>
      )}

      <div
        className="ce-chat-form-container"
        style={{
          ...styles.newChatContainer,
          ...{ marginLeft: props.onClose ? '40px' : '0px' },
          border: '2px dotted blue',
        }}
      >
        <div
          style={{
            fontWeight: '600',
            fontSize: '24px',
            position: 'relative',
            top: '4px',
            width: 'calc(100% - 48px)',
            border: '2px dotted green',
          }}
        >
          New Bibo Chats
        </div>
      </div>
      <hr />
      <DirectMessageSearch />
      <hr />
    </>
  );
};

export default NewChatFormMoose;

const styles = {
  closeIcon: {
    position: 'relative',
    top: '26px',
    left: '18px',
    fontSize: '16px',
    color: 'red',
  },
  newChatContainer: {
    padding: '16px 14px',
    backgroundColor: 'white',
    border: '2px dotted pink',
    height: '70px',
  },
};
