import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import {
  ChatEngine,
  getOrCreateChat,
  PeopleSettings,
  ChatCard,
  ChatHeader,
  ChatSettings,
  NewChatForm,
} from 'react-chat-engine';
import axios from 'axios';
import ChatUserSearch from '../components/chat/ChatUserSearch';
import ChatCardMoose from '../components/chat/ChatCardMoose';
import ChatHeaderMoose from '../components/chat/ChatHeaderMoose';
import ChatHeaderMooseMobile from '../components/chat/ChatHeaderMooseMobile';
import NewChatFormMoose from '../components/chat/ChatList/NewChatFormMoose';

const MooseChat = (props) => {
  //COLLECTING CURRENT USER FROM GLOBAL
  const currentUser = 'chat_user19@email.com';
  const currentUserEmail = 'pass1234';

  const [username, setUsername] = useState('');
  const [screenWidth, setScreenWidth] = useState('');

  const loggedInWPUser = {
    username: currentUser,
    secret: currentUserEmail,
  };

  console.log('Logged in as: ', loggedInWPUser);

  useEffect(() => {
    let winWidth = $(window).width();
    // console.log('Win Width: ', winWidth);
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
        })
        .catch(() => {
          axios
            .post('https://api.chatengine.io/users', loggedInWPUser, {
              headers: {
                'private-key': '185fb2d8-e5d1-4e14-afe2-32eb8e0ed93a',
              },
            })
            .then(() => {
              window.location.reload();
            })
            .catch((error) =>
              console.log('Cannot Create Chat User in API', error)
            );
        });
    }
  }, []);

  function renderChatForm(creds) {
    return <NewChatFormMoose creds={creds} />;
  }

  const credentials = {
    userName: currentUser,
    userSecret: 'pass1234',
    projectID: '4ca132ec-0f15-4b96-9cb4-a62d31066802',
  };

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
        // renderChatHeader={(chat) => <ChatHeaderMoose />}
        renderChatHeader={(chat) => (
          <ChatHeaderMooseMobile
            loggedInUser={currentUser}
            creds={credentials}
          />
        )}
        renderNewChatForm={(creds) => renderChatForm(creds)} // This is for DM from the Chat page
        renderChatSettings={(chatAppState) => (
          <ChatUserSearch userLoggedIn={currentUser} creds={chatAppState} />
        )}
      />
    );
  } else {
    return (
      <ChatEngine
        height="80vh"
        projectID="4ca132ec-0f15-4b96-9cb4-a62d31066802"
        userName={currentUser}
        userSecret={currentUserEmail}
        renderChatCard={(chat, index) => (
          <ChatCardMoose key={`${index}`} chat={chat} /> // Localized and works!
        )}
        renderChatHeader={(chat) => (
          <ChatHeaderMooseMobile
            loggedInUser={currentUser}
            creds={credentials}
          />
        )}
        renderChatSettings={(chatAppState) => (
          <ChatUserSearch
            userLoggedIn={currentUser}
            creds={chatAppState.creds}
          />
        )}
      />
    );
  }
};

export default MooseChat;
