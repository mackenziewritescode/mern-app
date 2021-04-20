import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.scss";

import { Posts } from "./components/Posts/Posts";
import { Replies } from "./components/Posts/Post/Replies/Replies";

export const PostContext = createContext();

const App = () => {
  const [currentPostId, setCurrentPostId] = useState("");

  return (
    <Router>
      <PostContext.Provider value={{ currentPostId, setCurrentPostId }}>
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/posts/:postId" component={Replies} />
        </Switch>
      </PostContext.Provider>
    </Router>
  );
};

export default App;
