import React, { useState, useEffect } from 'react';
import {
  ChatEngine,
  getOrCreateChat,
  PeopleSettings,
  ChatCard,
  // ChatHeader,
} from 'react-chat-engine';
import axios from 'axios';
import ChatUserSearch from '../components/chat/ChatUserSearch';
import DirectMessageSearch from '../components/chat/DirectMessageSearch';
import NotFound from './NotFound';
import ChatCardMoose from '../components/chat/ChatCardMoose';
import ChatHeaderMoose from '../components/chat/ChatHeaderMoose';

const MooseChat = (props) => {
  //COLLECTING CURRENT USER FROM GLOBAL
  const currentUser = 'bibo';
  const currentUserEmail = 'pass1234';
  //  const currentUser = 'chat user_1';
  //  const currentUserEmail = 'chat@use.com';
  // const currentUser = 'ChatUser Two';
  // const currentUserEmail = 'chat2@use.com';
  // const currentUser = mooseData.currentWPUserName;
  // const currentUserEmail = mooseData.currentWPUserEmail;
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(true);

  const loggedInWPUser = {
    username: currentUser,
    secret: currentUserEmail,
  };

  console.log('Logged in as: ', loggedInWPUser);

  useEffect(() => {
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': '98d9a7a2-3755-4354-a63f-a9165641e131',
          'user-name': currentUser,
          'user-secret': currentUserEmail,
        },
      })
      .then(() => {
        console.log('User found and Chat started...');
        setLoading(false);
      })
      .catch(() => {
        axios
          .post('https://api.chatengine.io/users', loggedInWPUser, {
            headers: {
              'private-key': '37d9cc64-75a2-41e0-94d9-61a0c9c29750',
            },
          })
          .then(() => {
            setLoading(false);
            window.location.reload();
          })
          .catch((error) =>
            console.log('Cannot Create Chat User in API', error)
          );
      });
  }, [currentUser, currentUserEmail]);

  const createUser = async (user) => {
    // put IS FOR GET OR CREATE ACCORDING TO DOC
    await axios
      .put('https://api.chatengine.io/users/', user, {
        headers: { 'Private-Key': '37d9cc64-75a2-41e0-94d9-61a0c9c29750' },
      })
      .then((r) => console.log('get or create user', r))
      .catch((e) => console.log('get or create error', e));
  };

  function createDirectChat(creds) {
    const user = {
      username: username,
      secret: 'pass1234',
    };
    createUser(user);

    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    );
  }

  function renderChatForm(creds) {
    return <DirectMessageSearch />;
  }

  return (
    <ChatEngine
      height="80vh"
      projectID="4ca132ec-0f15-4b96-9cb4-a62d31066802"
      userName={currentUser}
      userSecret={currentUserEmail}
      renderChatCard={(chat, index) => (
        // <ChatCard key={`${index}`} chat={chat} />
        <ChatCardMoose key={`${index}`} chat={chat} /> // Localized and works!
      )}
      renderChatHeader={(chat) => (
        // <ChatHeader />
        <ChatHeaderMoose />
      )}
      renderNewChatForm={(creds) => renderChatForm(creds)} // This is for DM from the Chat page
      // renderNewChatForm={(creds) => createDirectChat(creds)} // This is for starting DM on page load
      renderChatSettings={(chatAppState) => (
        <ChatUserSearch
          userLoggedIn={currentUser}
          secret={currentUserEmail}
          creds={chatAppState}
        />
      )}
    />
  );
};

export default MooseChat;
