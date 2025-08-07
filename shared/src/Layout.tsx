import React, { useState } from "react";
import { usePlayer } from "./PlayerContext";
import { LoginModal } from "./LoginModal";

export const Layout: React.FC<{
  children: React.ReactNode;
  gameName: string;
}> = ({ children, gameName }) => {
  const { player, playerPoints, login, logout, loading } = usePlayer();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="bg-gray-700 p-4 h-screen">
      <header className="flex justify-between items-center px2 font-bold text-white">
        <h1 className="text-xl">{gameName}</h1>
        <div className="flex items-center gap-4">
          {loading ? (
            <span>Loading...</span>
          ) : player ? (
            <>
              <span className="text-sm">User: {player.username}</span>
              <span className="text-sm">Points: {playerPoints}</span>
              <button onClick={logout} className="text-blue-600 underline">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-blue-600 underline bg-white"
            >
              Login
            </button>
          )}
        </div>
      </header>
      <main className="flex justify-center items-center size-full">
        {children}
      </main>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(username, password) => {
            login(username, password);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
};
