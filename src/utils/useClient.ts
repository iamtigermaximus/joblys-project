// hooks/useClient.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ClientHandlers {
  onConnect: () => void;
  onChatResponse: (data: any) => void;
  onDisconnect: () => void;
}

const useClient = (handlers: ClientHandlers, serverURL: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io(serverURL);

    newSocket.on('connect', () => {
      handlers.onConnect();
    });

    newSocket.on('chat-rsp', (data) => {
      handlers.onChatResponse(data);
    });

    newSocket.on('disconnect', () => {
      handlers.onDisconnect();
    });

    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [handlers, serverURL]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.emit('send-message', message);
    }
  };

  return {
    sendMessage,
  };
};

export default useClient;
