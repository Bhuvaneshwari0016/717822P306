import { useEffect, useState } from "react";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const API_URL = "http://20.244.56.144/test/users";
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI2MzEzLCJpYXQiOjE3NDI2MjYwMTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBhODVlMjljLTI0ODMtNDg5NS04OTkyLTZjZWEwMTBkZDliMyIsInN1YiI6IjcxNzgyMnAzMDZAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0gQ29sbGVnZSBvZiBFbmdpbm5lcmluZyIsImNsaWVudElEIjoiMGE4NWUyOWMtMjQ4My00ODk1LTg5OTItNmNlYTAxMGRkOWIzIiwiY2xpZW50U2VjcmV0IjoiQnRjZWhHdk92V2todktaRiIsIm93bmVyTmFtZSI6IkJodXZhbmVzaHdhcmkiLCJvd25lckVtYWlsIjoiNzE3ODIycDMwNkBrY2UuYWMuaW4iLCJyb2xsTm8iOiI3MTc4MjJwMzA2In0.AERySOTZ7dFURPPo1vmNv8Y1NNCZcrLa6QOh5qd8JlQ"; // Replace with a valid token

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTopUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      <ul>
        {topUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;

