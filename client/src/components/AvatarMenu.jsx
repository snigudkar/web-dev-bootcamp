import { useState } from "react";

export default function AvatarMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center"
      >
        {user.name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl border p-3 space-y-2">
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <div className="text-sm">
            <p>Team: <b>{user.team}</b></p>
            <p>Role: <b>{user.role}</b></p>
          </div>

          <button
            onClick={onLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-bold"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
