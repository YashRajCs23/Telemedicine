// src/components/Dashboard/User/Doctors.jsx
export default function Doctors() {
  // Later this will come from backend (API)
  const doctors = [
    { id: 1, name: "Dr. Anjali Sharma", specialty: "Cardiologist", experience: "10 years", availability: "Mon-Fri" },
    { id: 2, name: "Dr. Raj Mehta", specialty: "Dermatologist", experience: "7 years", availability: "Tue-Thu" },
    { id: 3, name: "Dr. Neha Verma", specialty: "Pediatrician", experience: "12 years", availability: "Mon-Sat" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Doctors</h1>
      {doctors.length > 0 ? (
        <ul className="grid md:grid-cols-2 gap-6">
          {doctors.map((doc) => (
            <li key={doc.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="font-semibold text-lg">{doc.name}</h2>
              <p>Specialty: {doc.specialty}</p>
              <p>Experience: {doc.experience}</p>
              <p>Availability: {doc.availability}</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Book Appointment
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No doctors available right now.</p>
      )}
    </div>
  );
}
