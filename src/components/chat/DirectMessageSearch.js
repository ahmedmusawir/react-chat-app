import React, { useEffect } from 'react';
import $ from 'jquery';

function DirectMessageSearch() {
  useEffect(() => {
    const searchInput = $('#dm-search-input');
    // console.log('SEARCH INPUT: ', searchInput);
    searchInput.on('keyup', searchHandler);
  }, []);

  const searchHandler = (e) => {
    console.log('Input Value: ', e.target.value);

    // SETTING SEARCH INPUT TEXT TO LOWER CASE
    const inputText = e.target.value.toLowerCase();
    // console.log('AFTER LOWER CASE: ', inputText);
    // COLLECTING DATA CARDS
    const cards = $('.ce-chat-card');
    // console.log('Card Element: ', cards);

    cards.each(function (i, elm) {
      const postContent = $(elm)
        .find('.ce-chat-title-text div')
        .text()
        .toLowerCase();

      // console.log(test);
      if (postContent.indexOf(inputText) !== -1) {
        $(elm).removeClass('d-none');

        // const elmCount = $(elm).hasClass('d-none');
        // console.log('Elm count: ', elmCount);
      } else {
        $(elm).removeClass('animate__zoomIn');
        $(elm).addClass('animate__zoomOut');
        // console.log(notFound);

        setTimeout(() => {
          $(elm).addClass('d-none');
        }, 500);
      }
    });
  };

  return (
    <div>
      <h1 id="header-message">Start Messaging</h1>
      <input
        id="dm-search-input"
        placeholder="Username"
        // onChange={(e) => setUsername(e.target.value)}
      />
      {/* <button onClick={() => createDirectChat(creds)}>Create</button> */}
    </div>
  );
}

export default DirectMessageSearch;
