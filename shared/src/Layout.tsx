import React from "react";
import "./styles.css";
import { usePlayer } from "./PlayerContext";

export const Layout: React.FC<{
  children: React.ReactNode;
  gameName: string;
}> = ({ children, gameName }) => {
  const { player, playerPoints, login, logout, loading } = usePlayer();

  return (
    <div className="bg-gray-700 px-4 pt-4">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{gameName}</h1>
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
              className="text-blue-600 underline"
            >
              Login
            </button>
          )}
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
};
