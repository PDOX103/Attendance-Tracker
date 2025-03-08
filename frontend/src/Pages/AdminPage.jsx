import React, { useState, useEffect } from "react";

const SUPERUSER_EMAIL = import.meta.env.VITE_SUPERUSER_EMAIL;

const AdminPage = ({ loggedInAdminId }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Log current users and logged-in admin ID for debugging
    console.log("Current users:", users);
    console.log("Logged-in Admin ID:", loggedInAdminId);

    const results = users.filter(
      (user) =>
        user.id.toString() !==
          (loggedInAdminId ? loggedInAdminId.toString() : "") &&
        user.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    setFilteredUsers(results);
  }, [searchQuery, users, loggedInAdminId]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched users:", data);

      if (data.users && Array.isArray(data.users)) {
        setUsers(data.users);
        setFilteredUsers([]);
      } else {
        console.error("Expected an array but got:", data);
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  const handleRoleChange = async () => {
    console.log("Selected User ID:", selectedUserId);
    console.log("New Role:", newRole);
    console.log("Selected User Email:", selectedUserEmail);
    console.log("Superuser Email:", SUPERUSER_EMAIL);
    console.log("Logged-in Admin ID:", loggedInAdminId);

    if (
      !selectedUserId ||
      !newRole ||
      selectedUserEmail.trim() === SUPERUSER_EMAIL.trim() ||
      (loggedInAdminId &&
        selectedUserId.toString() === loggedInAdminId.toString())
    ) {
      console.log("Role update prevented for superuser or logged-in admin.");
      return;
    }

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

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update role:", errorData);
        return;
      }

      setSuccessMessage("User updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchQuery && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105 ${
                selectedUserId === user.id ? "border border-blue-500" : ""
              }`}
              onClick={() => {
                setSelectedUserId(user.id);
                setSelectedUserEmail(user.email);
              }}
            >
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))
        ) : searchQuery ? (
          <p>No users found.</p>
        ) : (
          <p>Type to search for users.</p>
        )}
      </div>

      {selectedUserId && (
        <div className="mt-6">
          <h2 className="text-xl mb-2">Update User Role</h2>
          <select
            onChange={(e) => setNewRole(e.target.value)}
            value={newRole}
            disabled={
              selectedUserEmail === SUPERUSER_EMAIL ||
              selectedUserId === loggedInAdminId
            }
            className="border p-2 rounded mr-2"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
          <button
            onClick={handleRoleChange}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={
              selectedUserEmail === SUPERUSER_EMAIL ||
              selectedUserId === loggedInAdminId
            }
          >
            Update Role
          </button>
          {selectedUserEmail === SUPERUSER_EMAIL && (
            <p className="text-red-500 mt-2">
              You cannot update the superuser's role.
            </p>
          )}
          {selectedUserId === loggedInAdminId && (
            <p className="text-red-500 mt-2">
              You cannot update your own role.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
