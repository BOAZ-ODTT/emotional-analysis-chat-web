// pages/index.tsx
import { useState } from "react";
import Onboarding from "@/components/onboarding";
import ChatContainer from "@/components/chat-container";

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <>
      {username ? (
        <ChatContainer username={username} />
      ) : (
        <Onboarding onEnter={(name) => setUsername(name)} />
      )}
    </>
  );
};

export default HomePage;
