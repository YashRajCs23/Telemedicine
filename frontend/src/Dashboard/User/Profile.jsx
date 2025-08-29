// src/components/Dashboard/User/Profile.jsx
export default function Profile() {
  // Later this data will come from API
  const user = {
    name: "Yash Srivastava",
    email: "yash@example.com",
    phone: "+91 9876543210",
    age: 24,
    gender: "Male",
    bloodGroup: "B+",
    address: "Lucknow, Uttar Pradesh, India",
    profileImage: "https://via.placeholder.com/120", // Replace with user profile image
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="flex items-center gap-6 mb-6">
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-lg"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
        <div>
          <p className="text-gray-500">Age</p>
          <p className="font-medium">{user.age}</p>
        </div>
        <div>
          <p className="text-gray-500">Gender</p>
          <p className="font-medium">{user.gender}</p>
        </div>
        <div>
          <p className="text-gray-500">Blood Group</p>
          <p className="font-medium">{user.bloodGroup}</p>
        </div>
        <div>
          <p className="text-gray-500">Address</p>
          <p className="font-medium">{user.address}</p>
        </div>
      </div>

      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
