import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./Homepage";

export default function App() {
  return (
    <Router>
      <div>
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="about">
              Link
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/users">
              Link
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
            >
              Disabled
            </a>
          </li>
        </ul>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2 align="center">About</h2>;
}

function Users() {
  return <h2 align="center">Users</h2>;
}
