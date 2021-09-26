import React from 'react';
import { useParams } from 'react-router';
import { ChatContext } from '../../context/chatContext';
import useChatMessages from './useChatMessages';

const Chat = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const { selectedUser, channels } = React.useContext(ChatContext);
  const {
    messages,
    loading,
    fetchMoreOldMessages,
    fetchMoreNewMessages,
    sendMessage,
  } = useChatMessages();
  const [message, setMessage] = React.useState('');

  const handleClick = React.useCallback(() => {
    console.log('wtf');
    sendMessage(message);
    setMessage('');
  }, [sendMessage, message]);

  return (
    <>
      {loading && (
        <div className="loading">Loading...</div>
      )}
      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
        <div className="selected-user">
          <span>{channels![channelId]}</span>
        </div>
        <div className="chat-container">
          <ul className="chat-box chatContainerScroll">
            <li className="chat-left">
              <button
                type="button"
                className="btn btn-info"
                onClick={fetchMoreOldMessages}
              >
                Read More <i className="fa fa-arrow-up"></i>
              </button>
            </li>
            {messages.map((message) => {
              const date = new Date(message.datetime);
              return (
                <li
                  key={message.messageId}
                  className={`chat-${selectedUser === message.userId ? 'right' : 'left'}`}
                >
                  <div className="chat-hour">
                    {date.toISOString().split('T')[1].split('.')[0].slice(0, -3)}
                    <span className="fa fa-check-circle" />
                    <span className="chat-message">Sent</span>
                  </div>
                  <div className="chat-text">
                    {message.text}
                  </div>
                  <div className="chat-avatar">
                    <img src={`https://angular-test-backend-yc4c5cvnnq-an.a.run.app/${message.userId}.png`} alt="User" />
                    <div className="chat-name">{message.userId}</div>
                  </div>
                </li>
              )
            })}
            <li className="left">
              <button
                type="button"
                className="btn btn-info"
                onClick={fetchMoreNewMessages}
              >
                Read More <i className="fa fa-arrow-down"></i>
              </button>
            </li>
          </ul>
          <div className="form-group mt-3 mb-0">
            <textarea
              rows={3}
              className="form-control"
              placeholder={`Chatting as ${selectedUser}, type your message here...`}
              value={message}
              onInput={(event) =>
                setMessage((event.target as HTMLTextAreaElement).value)
              }
            />
            <button
              type="button"
              className="btn btn-info"
              onClick={handleClick}
            >
              Send Message <i className="fa fa-send"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
