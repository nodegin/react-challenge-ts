import React from 'react';

interface IChatContext {
  selectedUser?: string;
  setSelectedUser?: (value: string) => void;
  channels?: { [key: string]: string };
}

export const ChatContext = React.createContext<IChatContext>({});

const ContextProvider: React.FC<React.PropsWithChildren<any>> = ({ children }) => {
  const [selectedUser, setSelectedUser] = React.useState('Sam');

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        channels: {
          '1': 'General Channel',
          '2': 'Technology Channel',
          '3': 'LGTM Channel',
        },
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ContextProvider;
