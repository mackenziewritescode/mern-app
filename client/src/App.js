import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.scss";

import { Posts } from "./components/Posts/Posts";
import { Replies } from "./components/Posts/Post/Replies/Replies";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Posts />
        </Route>
        {/* <Route path="/posts/:postId"> */}
        <Route path="/posts">
          <Replies />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
