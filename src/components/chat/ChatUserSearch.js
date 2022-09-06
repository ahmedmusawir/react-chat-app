import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import axios from 'axios';

function ChatUserSearch({ user, secret, creds }) {
  const [users, setUsers] = useState(null);
  const [username, setUsername] = useState('');
  const [isPending, setIsPending] = useState(true);

  const fetchPosts = async () => {
    try {
      // Loading Spinner Starts
      setIsPending(true);

      const fetchedPosts = await axios.get('https://api.chatengine.io/users/', {
        headers: { 'Private-Key': '37d9cc64-75a2-41e0-94d9-61a0c9c29750' },
      });
      // console.log('First Page:', fetchedPosts.data);

      setUsers(fetchedPosts.data);

      // Loading Spinner Ends
      setIsPending(false);

      return fetchedPosts;
    } catch (e) {
      // print error
      console.log(e);
      return [];
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const makeDm = (usr) => {
    console.log('User clicked', usr);
    getOrCreateChat(creds, { is_direct_chat: true, usernames: [usr] }, () =>
      setUsername('')
    );
  };

  return (
    <div>
      <h6 className="text-danger p-2 border border-danger border-3">
        Pick users from below to start DM:...
      </h6>

      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <button onClick={() => makeDm(user.username)}>
                {user.username}
              </button>
              {/* <h1>{user.username}</h1> */}
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default ChatUserSearch;
