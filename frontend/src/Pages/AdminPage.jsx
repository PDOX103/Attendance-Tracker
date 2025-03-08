import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SUPERUSER_EMAIL = import.meta.env.VITE_SUPERUSER_EMAIL || "";

const AdminPage = ({ loggedInAdminId }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [selectedUserRole, setSelectedUserRole] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = users.filter(
      (user) =>
        user.id.toString() !== loggedInAdminId?.toString() &&
        (user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query))
    );
    setFilteredUsers(results);
    setSelectedUserId(null);
  };

  const handleRoleChange = async () => {
    if (!selectedUserId || !newRole) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${selectedUserId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!response.ok) throw new Error("Failed to update role");

      toast.success("User role updated successfully!", {
        position: "bottom-center",
        autoClose: 3000,
      });

      fetchUsers();
      setSelectedUserId(null);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Error updating role!", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="background-image">
        <img src="/images/Signin_back.png" alt="Background" />
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white p-3 rounded-lg shadow-md mb-6">
          <Search className="text-gray-400 ml-2" size={20} />
          <input
            type="text"
            placeholder="Search for a user..."
            value={searchQuery}
            onChange={handleSearch}
            className="border-none focus:ring-0 p-2 flex-1 outline-none"
          />
        </div>

        {/* Users List (Table Format) */}
        {searchQuery && (
          <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            {filteredUsers.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-blue-100 cursor-pointer ${
                        selectedUserId === user.id ? "bg-blue-200" : ""
                      }`}
                    >
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setSelectedUserEmail(user.email);
                            setSelectedUserRole(user.role);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center">No users found.</p>
            )}
          </div>
        )}

        {/* Update Role Form (Appears only after selecting a user) */}
        {selectedUserId && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Update User Role
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRoleChange();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  User:
                </label>
                <p className="text-gray-600 font-semibold">
                  {selectedUserEmail}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Current Role:
                </label>
                <p className="text-gray-600 font-semibold">
                  {selectedUserRole}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Select New Role:
                </label>
                <select
                  onChange={(e) => setNewRole(e.target.value)}
                  value={newRole}
                  disabled={
                    selectedUserEmail === SUPERUSER_EMAIL ||
                    selectedUserId === loggedInAdminId
                  }
                  className="w-full border-gray-300 p-2 rounded-lg focus:ring-blue-500"
                >
                  <option value="">Choose a Role</option>
                  <option value="admin">Admin</option>
                  <option value="instructor">Instructor</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                disabled={
                  selectedUserEmail === SUPERUSER_EMAIL ||
                  selectedUserId === loggedInAdminId
                }
              >
                Update Role
              </button>

              {selectedUserEmail === SUPERUSER_EMAIL && (
                <p className="text-red-500 mt-2 text-center">
                  You cannot update the superuser's role.
                </p>
              )}
              {selectedUserId === loggedInAdminId && (
                <p className="text-red-500 mt-2 text-center">
                  You cannot update your own role.
                </p>
              )}
            </form>
          </div>
        )}

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminPage;
