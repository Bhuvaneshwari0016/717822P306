import React from "react";
import TopUsers from "./components/TopUsers";
import TrendingPosts from "./components/TrendingPosts";
import Feed from "./components/Feed";
import "./App.css";
const App =()=>{
  return(
    <div classname="app-container">
      <h1>Social Media Analytics</h1>
      <div className ="grid-container">
        <div className ="card">
          <TopUsers/>
        </div>
        <div className="card">
          <TrendingPosts/>
                 </div>
                 <div className="card">
                  <Feed/>
                 </div>
      </div>
    </div>
  );
};
export default App;
