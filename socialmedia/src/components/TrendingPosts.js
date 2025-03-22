import { useEffect, useState } from "react";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const API_URL = "http://20.244.56.144/test/posts";
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI2Njg0LCJpYXQiOjE3NDI2MjYzODQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjBhODVlMjljLTI0ODMtNDg5NS04OTkyLTZjZWEwMTBkZDliMyIsInN1YiI6IjcxNzgyMnAzMDZAa2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0gQ29sbGVnZSBvZiBFbmdpbm5lcmluZyIsImNsaWVudElEIjoiMGE4NWUyOWMtMjQ4My00ODk1LTg5OTItNmNlYTAxMGRkOWIzIiwiY2xpZW50U2VjcmV0IjoiQnRjZWhHdk92V2todktaRiIsIm93bmVyTmFtZSI6IkJodXZhbmVzaHdhcmkiLCJvd25lckVtYWlsIjoiNzE3ODIycDMwNkBrY2UuYWMuaW4iLCJyb2xsTm8iOiI3MTc4MjJwMzA2In0.Tt34gbv3EuAcp7svkTxFN-U16ShtkRzBnJLD1PZZXwA"; // Replace with a valid token

  useEffect(() => {
    const fetchTrendingPosts = async () => {
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
        setTrendingPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <h2>🔥 Trending Posts</h2>
      {trendingPosts.length === 0 ? (
        <p>No trending posts available.</p>
      ) : (
        <ul>
          {trendingPosts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p><strong>Author:</strong> {post.author}</p>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendingPosts;
