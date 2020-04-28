/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';


import '../style/ForumPost.css';

function ForumPost(props) {
  const {
    title, author, age, category, likes
  } = props;

  const [comments] = useState([{ author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },
    { author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },
    { author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },
    { author: 'username', age: '2h', text: 'sample comment text lorem ipsum dolem blah blah lots of text' },]);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  function handleCloseModal() {
    setShowModal(false);
    document.body.style.overflowY = 'unset';
  }

  function handleLike(e) {
    setLiked(!liked);
    e.stopPropogation();
  }

  function handleOpenModal() {
    if (!showModal) setShowModal(true);
  }

  return (
    <div className="forum-post">
      <div className="line-1">
        <div className="title">
          <href className="post-title" onClick={handleOpenModal} role="button" tabIndex="-1">{title}</href>
          <p className="post-category">{category}</p>
        </div>
        <div className="likes">
          {liked
            ? <i className="fas fa-heart" onClick={handleLike} role="button" tabIndex="-1" />
            : <i className="far fa-heart" onClick={handleLike} role="button" tabIndex="-1" />}
          <p className="likes-number">{likes}</p>
        </div>
      </div>
      <p className="post-information">{`${author}   |   ${age}`}</p>
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Modal"
        onRequestClose={handleCloseModal}
        className="post-modal"
      >
        <button className="close" onClick={handleCloseModal} type="button">X</button>
        <div className="modal-header">
          <div className="line-1-modal">
            <h3 className="post-title-modal">{title}</h3>
            <p className="post-category">{category}</p>
          </div>
          <p className="post-information-modal">{`${author}   |   ${age}`}</p>
        </div>
        <div className="post-comments">
          {comments.map((e, i) => {
            let comment = (
              <div className="comment">
                <p className="comment-text">{e.text}</p>
                <p className="comment-information">{`${e.author}   |   ${e.age}`}</p>
              </div>
            );
              // Displays dividing line after post if not the last comment
            if (i < comments.length - 1) {
              comment = (
                <div>
                  {comment}
                  <hr />
                </div>
              );
            }
            return comment;
          })}
        </div>
        <div className="new-comment">
          <textarea className="new-comment-field" rows="5" placeholder="Add to the discussion!" />
          <button className="new-comment-submit" type="submit">Comment</button>
        </div>
      </ReactModal>
    </div>
  );
}

ForumPost.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired
};


export default ForumPost;