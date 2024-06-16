import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../service/api";
import { useAuth } from "../contexts/AuthContext";
import { getFeedbacks } from "../service/api"; // Adjust import based on your API structure

const AdminPanel = () => {
  const [auth] = useAuth();
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        let usersData = await getUsers();
        usersData = usersData.filter((u) => u.username !== "Admin");
        setUsers(usersData);

        // Fetch feedbacks
        const feedbacksData = await getFeedbacks(); // Implement getFeedbacks() in your service/api
        setFeedbacks(feedbacksData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  return auth?.user && auth?.user.role === "admin" ? (
    <div className="container mx-auto py-4 p-96 h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Admin Panel</h2>
      {error && <p className="text-red-500">{error}</p>}
      {/* Users Table */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Users</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50">ID</th>
              <th className="px-6 py-3 bg-gray-50">Email</th>
              <th className="px-6 py-3 bg-gray-50">Username</th>
              <th className="px-6 py-3 bg-gray-50">Roll Number</th>
              <th className="px-6 py-3 bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user._id}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.roll}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Feedbacks Table */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Feedbacks</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50">ID</th>
              <th className="px-6 py-3 bg-gray-50">Course</th>
              <th className="px-6 py-3 bg-gray-50">Rating</th>
              <th className="px-6 py-3 bg-gray-50">Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks?.map((feedback) => (
              <tr key={feedback._id}>
                <td className="px-6 py-4">{feedback._id}</td>
                <td className="px-6 py-4">{feedback.course}</td>
                <td className="px-6 py-4">{feedback.rating}</td>
                <td className="px-6 py-4">{feedback.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p className="text-center text-red-500">
      You are not authorized to view this page
    </p>
  );
};

export default AdminPanel;
