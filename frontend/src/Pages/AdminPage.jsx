import React, { useState, useEffect } from "react";

const SUPERUSER_ID = 9; 

const AdminPage = () => {
   const [users, setUsers] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [selectedUserId, setSelectedUserId] = useState(null);
   const [newRole, setNewRole] = useState("");

   useEffect(() => {
       fetchUsers();
   }, []);

   useEffect(() => {
       const results = users.filter(user =>
           user.name.toLowerCase().includes(searchQuery.toLowerCase())
       );
       setFilteredUsers(results);
   }, [searchQuery, users]);

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
       if (!selectedUserId || !newRole || selectedUserId === SUPERUSER_ID) return; // Prevent updates for superuser

       await fetch(`http://127.0.0.1:8000/api/users/${selectedUserId}/role`, {
           method: "PUT",
           headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
           },
           body: JSON.stringify({ role: newRole }),
       });

       fetchUsers(); 
   };

   return (
       <div className="container mx-auto text-center">
           <h1 className="text-2xl font-bold">Admin Page</h1>

           <div>
               <input
                   type="text"
                   placeholder="Search for a user..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="border p-2 mb-4"
               />
           </div>

           <div className="user-list">
               {searchQuery && filteredUsers.length > 0 ? (
                   filteredUsers.map(user => (
                       <div
                           key={user.id}
                           className={`user-item p-2 border rounded mb-2 cursor-pointer ${selectedUserId === user.id ? 'bg-gray-200' : ''}`}
                           onClick={() => setSelectedUserId(user.id)}
                       >
                           {user.name} - {user.email}
                       </div>
                   ))
               ) : (
                   searchQuery ? <p>No users found.</p> : <p>Type to search for users.</p>
               )}
           </div>

           {selectedUserId && (
               <div className="role-selection">
                   <select onChange={(e) => setNewRole(e.target.value)} value={newRole} disabled={selectedUserId === SUPERUSER_ID}>
                       <option value="">Select Role</option>
                       <option value="admin">Admin</option>
                       <option value="instructor">Instructor</option>
                       <option value="student">Student</option>
                   </select>
                   <button onClick={handleRoleChange} className="ml-2" disabled={selectedUserId === SUPERUSER_ID}>
                       Update Role
                   </button>
                   {selectedUserId === SUPERUSER_ID && (
                       <p className="text-red-500">You cannot update the superuser's role.</p>
                   )}
               </div>
           )}

      
       </div>
   );
};

export default AdminPage;