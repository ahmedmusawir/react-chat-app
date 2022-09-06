import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatUserSearch({ user, secret }) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const chatUsers = () => {
      axios
        .get('https://api.chatengine.io/users/', {
          headers: { 'Private-Key': '37d9cc64-75a2-41e0-94d9-61a0c9c29750' },
        })
        .then((res) => {
          console.log('Users found: ', res.data);
          setUsers(res.data);
          // setLoading(false);
          console.log('User State: ', users);
        })
        .catch(() => {
          console.log('Failed to get Chat Engin users');
        });
    };

    chatUsers();
  }, []);

  return (
    <div>
      <h6 className="text-danger p-2 border border-danger border-3">
        Pick users from below to start DM:
      </h6>

      {users &&
        users.map((user) => {
          <li>{user}</li>;
        })}
    </div>
  );
}

export default ChatUserSearch;
