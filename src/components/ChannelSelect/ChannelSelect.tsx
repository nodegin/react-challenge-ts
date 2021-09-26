
import React from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { ChatContext } from '../../context/chatContext';

const ChannelSelect = () => {
  const { channels } = React.useContext(ChatContext);
  const history = useHistory();
  const location = useLocation();
  const match: any = matchPath(location.pathname, {
    path: '/chat/:channelId',
  });
  return (
    <>
      <p>2. Choose your Channel</p>
      <ul className="users">
        {Object.keys(channels!).map((channelId) => {
          let isActive = false
          if (match && match.params.channelId === channelId) {
            isActive = true
          }
          return (
            <li
              key={channelId}
              className={`channel ${isActive ? 'active-user' : ''}`}
              onClick={() => {
                history.push(`/chat/${channelId}`);
              }}
            >
              <p className="name-time">
                <span className="name">{channels![channelId]}</span>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ChannelSelect;
