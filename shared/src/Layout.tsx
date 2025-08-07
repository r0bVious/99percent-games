import React from "react";
import "./styles.css";
import { usePlayer } from "./PlayerContext";

export const Layout: React.FC<{
  children: React.ReactNode;
  gameName: string;
}> = ({ children, gameName }) => {
  const { player, playerPoints, login, logout, loading } = usePlayer();

  return (
    <div className="bg-gray-700 p-4 h-screen">
      <header className="flex justify-between items-center px2">
        <h1 className="text-xl font-bold text-white">{gameName}</h1>
        <div className="flex items-center gap-4">
          {loading ? (
            <span>Loading...</span>
          ) : player ? (
            <>
              <span className="text-sm">User: {player.userId}</span>
              <span className="text-sm">Points: {playerPoints}</span>
              <button onClick={logout} className="text-blue-600 underline">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => login(1)}
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
    </div>
  );
};
