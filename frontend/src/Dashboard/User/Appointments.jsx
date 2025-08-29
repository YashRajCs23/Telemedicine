// src/components/Dashboard/User/Appointments.jsx
export default function Appointments() {
  // later you can fetch user appointments from backend using API
  const appointments = [
    { id: 1, doctor: "Dr. Sharma", date: "2025-09-01", time: "10:00 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Mehta", date: "2025-09-05", time: "02:30 PM", status: "Pending" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      {appointments.length > 0 ? (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li key={appt.id} className="border p-4 rounded-lg shadow">
              <h2 className="font-semibold text-lg">{appt.doctor}</h2>
              <p>Date: {appt.date}</p>
              <p>Time: {appt.time}</p>
              <p>Status: <span className="font-medium">{appt.status}</span></p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">You have no appointments yet.</p>
      )}
    </div>
  );
}
