// src/components/Dashboard/User/Notifications.jsx
export default function Notifications() {
  // Later this will come from backend (API)
  const notifications = [
    { id: 1, message: "Your appointment with Dr. Anjali Sharma is confirmed.", time: "2 hours ago", type: "success" },
    { id: 2, message: "Dr. Raj Mehta rescheduled your appointment.", time: "1 day ago", type: "warning" },
    { id: 3, message: "New health article available: Skin Care Tips.", time: "3 days ago", type: "info" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`p-4 rounded-lg shadow transition ${
                note.type === "success"
                  ? "bg-green-100 text-green-800"
                  : note.type === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              <p className="font-medium">{note.message}</p>
              <span className="text-sm text-gray-600">{note.time}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No new notifications.</p>
      )}
    </div>
  );
}
