import React, { useState } from "react";
import { usePlayer } from "./PlayerContext";
import { LoginModal } from "./LoginModal";

export const Layout: React.FC<{
  children: React.ReactNode;
  gameName: string;
}> = ({ children, gameName }) => {
  const {
    player,
    playerPoints,
    login,
    logout,
    loading,
    setShowLoginModal,
    showLoginModal,
  } = usePlayer();

  return (
    <div className="bg-gray-700 px-4 pb-4">
      <header className="flex justify-between items-center px2 font-bold text-white py-2">
        <h1 className="text-lg">{gameName}</h1>
        <div className="flex items-center gap-4">
          {!loading && player && (
            <>
              <div className="flex flex-col">
                <div className="flex justify-between w-36">
                  <span className="text-sm font-semibold">User:</span>
                  <span className="text-sm">{player.username}</span>
                </div>
                <div className="flex justify-between w-36">
                  <span className="text-sm font-semibold">Points:</span>
                  <span className="text-sm">{playerPoints}</span>
                </div>
              </div>
              <button
                onClick={logout}
                className="
              px-4 py-1
              bg-gradient-to-t from-indigo-800 to-indigo-900
              text-white font-semibold rounded-lg
              shadow-md
              hover:from-blue-700 hover:to-blue-500
              focus:outline-none focus:ring-2 focus:ring-blue-300
              transition-colors duration-200 ease-in-out border-1 border-white
            "
              >
                Logout
              </button>
            </>
          )}

          {!loading && !player && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="
              px-4 py-1
              bg-gradient-to-t from-indigo-800 to-indigo-900
              text-white font-semibold rounded-lg
              shadow-md
              hover:from-blue-700 hover:to-blue-500
              focus:outline-none focus:ring-2 focus:ring-blue-300
              transition-colors duration-200 ease-in-out border-1 border-white
            "
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
