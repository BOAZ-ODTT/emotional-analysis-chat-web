// components/onboarding.tsx
import React, { useState } from "react";

interface Props {
  onEnter: (userName: string) => void;
}

const Onboarding: React.FC<Props> = ({ onEnter }) => {
  const [username, setusername] = useState(makeRandomUsername());

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (username.trim() === "") {
        alert("사용자 이름을 입력하세요.");
        return;
      }
      onEnter(username);
    }
  };

  return (
    <div
      id="onboardingContainer"
      className="min-h-screen flex justify-center items-center"
    >
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h1 className="text-xl font-bold mb-4">채팅 참여</h1>
        <p id="error" className="text-red-500 mb-1 hidden">
          사용자 이름을 입력해주세요.
        </p>
        <input
          type="text"
          id="onboardinguserNameInput"
          placeholder="사용자 이름"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          onKeyUp={handleKeyPress}
          className="w-full mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          id="enterButton"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={() => onEnter(username)}
        >
          입장
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
function makeRandomUsername(): string | (() => string) {
  return `익명#${Math.random().toString().substring(2, 6)}`;
}
