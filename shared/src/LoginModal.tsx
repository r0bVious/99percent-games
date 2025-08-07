import { useState } from "react";

export const LoginModal: React.FC<{
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}> = ({ onClose, onLogin }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(usernameInput, passwordInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User ID"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 text-sm text-gray-500 underline"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
