import React, { useEffect, useState } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI2MzEzLCJpYXQiOjE3NDI2MjYwMTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBhODVlMjljLTI0ODMtNDg5NS04OTkyLTZjZWEwMTBkZDliMyIsInN1YiI6IjcxNzgyMnAzMDZAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0gQ29sbGVnZSBvZiBFbmdpbm5lcmluZyIsImNsaWVudElEIjoiMGE4NWUyOWMtMjQ4My00ODk1LTg5OTItNmNlYTAxMGRkOWIzIiwiY2xpZW50U2VjcmV0IjoiQnRjZWhHdk92V2todktaRiIsIm93bmVyTmFtZSI6IkJodXZhbmVzaHdhcmkiLCJvd25lckVtYWlsIjoiNzE3ODIycDMwNkBrY2UuYWMuaW4iLCJyb2xsTm8iOiI3MTc4MjJwMzA2In0.AERySOTZ7dFURPPo1vmNv8Y1NNCZcrLa6QOh5qd8JlQ";

  const userId = "12345"; 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://20.244.56.144/test/users/${userId}/posts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`, // 🔹 Required Authorization Header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]); // Fetch posts when `userId` changes

  return (
    <div>
      <h2>User Posts</h2>
      <ul>
        {posts.length > 0 ? (
          posts.map((post, index) => <li key={index}>{post.content}</li>)
        ) : (
          <p>No posts available</p>
        )}
      </ul>
    </div>
  );
};

export default Feed;


