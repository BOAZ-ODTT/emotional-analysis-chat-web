// components/chat-container.tsx
import React, { useState, useEffect, useRef } from "react";

interface Room {
  name: string;
  userCount: number;
}
interface Message {
  username: string;
  message: string;
}

const websocketUrl = "ws://34.64.139.68:8000/chat/connect";

const ChatContainer: React.FC<{ username: string }> = ({
  username: username,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([
    "JP",
    "CN",
    "ML",
    "JP",
    "CN",
    "ML",
    "JP",
    "CN",
    "ML",
  ]);
  const [rooms, setRooms] = useState<Room[]>([
    { name: "General Chat", userCount: 12 },
    { name: "Design Feedback", userCount: 8 },
    { name: "Engineering Discussions", userCount: 15 },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(websocketUrl);

    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, JSON.parse(event.data)]);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() === "") {
      return;
    }

    ws.current?.send(
      JSON.stringify({
        username: username,
        message: inputMessage,
      })
    );

    setInputMessage("");
  };

  return (
    <div
      id="chatContainer"
      className="flex h-screen w-full flex-col bg-gray-100 overflow-hidden"
    >
      <header className="flex h-14 shrink-0 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-2">
          <div>
            이름:
            <input
              type="text"
              id="usernameInput"
              placeholder="유저 이름"
              className="p-2 rounded-l border border-gray-300 "
              disabled
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6 text-gray-500"
          >
            <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <circle cx="12" cy="10" r="2"></circle>
            <line x1="8" x2="8" y1="2" y2="4"></line>
            <line x1="16" x2="16" y1="2" y2="4"></line>
          </svg>
          <h1 className="text-lg font-semibold">Chat Rooms</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5 text-gray-500"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </header>
      <div className="flex h-full">
        <div className="hidden w-64 shrink-0 border-r bg-gray-50 p-4 md:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Active Rooms</h2>
            <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5 text-gray-500"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            {rooms.map((room, index) => {
              return (
                <div key={index}>
                  <a
                    className="flex items-center gap-3 rounded-lg bg-white p-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100"
                    href="#"
                  >
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                        JP
                      </span>
                    </span>
                    <div className="flex-1">
                      <div className="line-clamp-1">{room.name}</div>
                      <div className="text-xs text-gray-500">
                        {room.userCount} active users
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="mt-4 mb-2 text-sm font-semibold">Active Users</div>
          <div className="flex flex-wrap gap-2">
            {users.map((room, index) => {
              return (
                <div key={index}>
                  <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      JP
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex h-full flex-col">
            <div id="chatspace" className="overflow-y-scroll p-4 h-[80vh]">
              <div className="space-y-4">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 mt-5 mb-5"
                    >
                      <span className="relative flex h-10 w-10 overflow-hidden rounded-full shrink-0">
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                          {message.username[0]}
                        </span>
                      </span>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <div className="font-medium">{message.username}</div>
                        <div className="text-sm text-gray-500">
                          {message.message}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          10:46 AM
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex h-[15vh] shrink-0 items-center border-t bg-white px-4">
              <input
                id="messageInput"
                className="flex h-10 w-full border border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm focus:bg-white"
                placeholder="Type your message..."
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <button
                id="sendButton"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 ml-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5 text-gray-500"
                >
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
