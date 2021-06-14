import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPosts from "./components/AddPosts";
import PostList from './components/PostList';
import EditPosts from './components/EditPosts';
import Comments from './components/Comments';
function App() {

  return (
    <Router >
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/posts/new" className="nav-link">
              Add New
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route path="/posts/:id/edit" exact component={EditPosts} />
          <Route path="/posts/new" exact component={AddPosts} />
          <Route path="/posts/:id/comments" exact component={Comments} />
          <Route path="/" component={PostList} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
