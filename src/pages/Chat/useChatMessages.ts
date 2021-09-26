import React from 'react';
import { useParams } from 'react-router';
import { ChatContext } from '../../context/chatContext';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

interface Message {
  messageId: string;
  text: string;
  datetime: number;
  userId: string;
}

const FETCH_LATEST_MESSAGES = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      userId
      text
      datetime
    }
  }
`

const useChatMessages = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const { selectedUser } = React.useContext(ChatContext);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [fetchLatestMessages, latestMessagesOp] = useLazyQuery(FETCH_LATEST_MESSAGES, {
    onError: (err) => window.alert(err.message),
  });
  const [fetchMoreMessages, moreMessagesOp] = useLazyQuery(gql`
    query FetchMoreMessages($channelId: String!, $messageId: String!, $old: Boolean!) {
      fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
        messageId
        userId
        text
        datetime
      }
    }
  `, {
    onError: (err) => window.alert(err.message),
  });
  const [sendMessageMutation] = useMutation(gql`
    mutation postMessage($channelId: String!, $userId: String!, $text: String!) {
      postMessage(channelId: $channelId, userId: $userId, text: $text) {
        messageId
        userId
        text
        datetime
      }
    }
  `, {
    onError: (err) => window.alert(err.message),
    refetchQueries: result => [{ query: FETCH_LATEST_MESSAGES, variables: { channelId } }],
  });

  // Fetch latest messages on mount
  React.useEffect(() => {
    fetchLatestMessages({ variables: { channelId } });
  }, [fetchLatestMessages, channelId]);

  // On latest messages operation change
  React.useEffect(() => {
    if (latestMessagesOp.loading) {
      setLoading(true);
    } else {
      setLoading(false);
      if (!latestMessagesOp.error) {
        if (latestMessagesOp.data) {
          const msg = [...latestMessagesOp.data.fetchLatestMessages].reverse()
          setMessages(msg);
        }
      }
    }
  }, [latestMessagesOp]);

  // Fetch more messages

  const fetchMoreOldMessages = React.useCallback(() => {
    fetchMoreMessages({
      variables: {
        channelId,
        messageId: messages.length > 0 ? messages[0].messageId : undefined,
        old: true,
      },
    });
  }, [fetchMoreMessages, channelId, messages]);

  const fetchMoreNewMessages = React.useCallback(() => {
    fetchMoreMessages({
      variables: {
        channelId,
        messageId: messages.length > 0 ? messages[messages.length - 1].messageId : undefined,
        old: false,
      },
    });
  }, [fetchMoreMessages, channelId, messages]);

  const sendMessage = React.useCallback((text) => {
    sendMessageMutation({
      variables: {
        channelId,
        userId: selectedUser,
        text,
      },
    });
  }, [sendMessageMutation, channelId, selectedUser]);

  React.useEffect(() => {
    if (moreMessagesOp.loading) {
      setLoading(true);
    } else {
      setLoading(false);
      if (!moreMessagesOp.error) {
        if (moreMessagesOp.data) {
          const msg = [...moreMessagesOp.data.fetchMoreMessages].reverse()
          if (moreMessagesOp.variables && moreMessagesOp.variables.old) {
            setMessages((oldMessage) => [
              ...msg,
              ...oldMessage,
            ])
          } else {
            setMessages((oldMessage) => [
              ...oldMessage,
              ...msg,
            ])
          }
        }
      }
    }
  }, [moreMessagesOp]);

  return {
    messages,
    loading,
    fetchMoreOldMessages,
    fetchMoreNewMessages,
    sendMessage,
  }
}

export default useChatMessages
