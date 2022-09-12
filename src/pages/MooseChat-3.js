import React, { useState, useEffect, useContext } from 'react';
import $ from 'jquery';
import {
  ChatEngine,
  getOrCreateChat,
  PeopleSettings,
  ChatCard,
  ChatHeader,
  ChatSettings,
  // ChatList,
  NewChatForm,
} from 'react-chat-engine';
import axios from 'axios';
import ChatUserSearch from '../components/chat/ChatUserSearch';
import DirectMessageSearch from '../components/chat/DirectMessageSearch';
import ChatCardMoose from '../components/chat/ChatCardMoose';
import ChatHeaderMoose from '../components/chat/ChatHeaderMoose';
import NewChatFormMoose from '../components/chat/ChatList/NewChatFormMoose';
import ChatList from '../components/chat/ChatList';

const MooseChat = (props) => {
  //COLLECTING CURRENT USER FROM GLOBAL
  const currentUser = 'bibo';
  const currentUserEmail = 'pass1234';

  const [username, setUsername] = useState('');
  const [screenWidth, setScreenWidth] = useState('');
  const [loading, setLoading] = useState(true);

  const loggedInWPUser = {
    username: currentUser,
    secret: currentUserEmail,
  };

  console.log('Logged in as: ', loggedInWPUser);

  useEffect(() => {
    let winWidth = $(window).width();
    console.log('Win Width: ', winWidth);
    setScreenWidth(winWidth);

    if (currentUser && currentUserEmail) {
      axios
        .get('https://api.chatengine.io/users/me', {
          headers: {
            'project-id': '4ca132ec-0f15-4b96-9cb4-a62d31066802',
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
                'private-key': '185fb2d8-e5d1-4e14-afe2-32eb8e0ed93a',
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
    }
  }, []);

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
    // createUser(user);

    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    );
  }

  function renderChatForm(creds) {
    return <NewChatFormMoose creds={creds} />;
  }

  if (screenWidth > 575) {
    return (
      <ChatEngine
        height="80vh"
        projectID="4ca132ec-0f15-4b96-9cb4-a62d31066802"
        userName={currentUser}
        userSecret={currentUserEmail}
        renderChatCard={(chat, index) => (
          <ChatCardMoose key={`${index}`} chat={chat} /> // Localized and works!
        )}
        renderChatHeader={(chat) => <ChatHeaderMoose />}
        renderNewChatForm={(creds) => <NewChatFormMoose creds={creds} />} // Custom
        // renderNewChatForm={(creds) => renderChatForm(creds)} // This is for DM from the Chat page
        // renderNewChatForm={(creds) => <NewChatForm creds={creds} />} // default doesn't work loses the mobile bar
        // renderNewChatForm={(creds) => createDirectChat(creds)} // This is for starting DM on page load
        // renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
        renderChatSettings={(chatAppState) => (
          <ChatUserSearch
            userLoggedIn={currentUser}
            secret={currentUserEmail}
            creds={chatAppState}
          />
        )}
      />
    );
  } else
    return (
      <ChatEngine
        height="80vh"
        projectID="4ca132ec-0f15-4b96-9cb4-a62d31066802"
        userName={currentUser}
        userSecret={currentUserEmail}
        renderChatCard={(chat, index) => (
          <ChatCardMoose key={`${index}`} chat={chat} /> // Localized and works!
        )}
        renderChatHeader={(chat) => <ChatHeaderMoose />}
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
