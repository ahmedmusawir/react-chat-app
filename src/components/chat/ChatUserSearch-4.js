import React, { useState, useEffect } from 'react';
import { getOrCreateChat } from 'react-chat-engine';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

function ChatUserSearch({ userLoggedIn, creds }) {
  const [users, setUsers] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [query, setQuery] = useState('');
  const isDesktop = useMediaQuery({ query: '(min-width: 575px)' });

  const fetchPosts = async () => {
    try {
      // Loading Spinner Starts
      setIsPending(true);

      const fetchedPosts = await axios.get('https://api.chatengine.io/users/', {
        headers: { 'Private-Key': '185fb2d8-e5d1-4e14-afe2-32eb8e0ed93a' },
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
  }, [userLoggedIn, creds]);

  // console.log('logged in CREDS: ', creds);

  const makeDirectMessaging = (usr) => {
    // console.log('User clicked', usr);
    // console.log('User CREDS', creds);
    getOrCreateChat(creds, { is_direct_chat: true, usernames: [usr] });
  };

  return (
    <div>
      {isDesktop && (
        <h4 className="chat-settings-desktop-header text-danger text-center">
          Pick users for DM...
        </h4>
      )}

      {/* CHAT USER SEARCH INPUT */}
      <hr className="bg-danger" />
      <input
        type="text"
        name="react-search"
        id="react-search"
        placeholder="Find Users to add ..."
        className="form-control dm-settings-search-input"
        onChange={(e) => setQuery(e.target.value)}
      />
      <hr className="bg-danger" />

      {users &&
        users
          .filter(
            (user) =>
              user.first_name.toLowerCase().includes(query.toLowerCase()) ||
              user.last_name.toLowerCase().includes(query.toLowerCase())
          )
          .map((user) => {
            if (user.username === userLoggedIn) {
              // SKIPPING THE USER WHO'S LOGGED IN
              // makeDirectMessaging(user.username);
              return null;
            }
            return (
              <button
                key={user.id}
                className="btn btn-block dm-btn-user"
                // className="btn btn-outline-danger btn-block "
                onClick={() => makeDirectMessaging(user.username)}
              >
                {`${user.first_name}  ${user.last_name}`}
                {/* {user.username} */}
              </button>
            );
          })}
    </div>
  );
}

export default ChatUserSearch;
