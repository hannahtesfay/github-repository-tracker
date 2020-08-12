import React from "react";
import "./styles/App.css";
import SearchContainer from "./Containers/SearchContainer";

class App extends React.Component {
  state = {};
  render() {
    return (
      <>
        <nav>
          <a href="http://localhost:8000" id="title">
            <h1><i className="fab fa-github"/></h1>
            <h1>GitHub <span id="grey">Repository Tracker</span></h1>
          </a>
        </nav>
        <SearchContainer/>
      </>
    );
  }
}
export default App;
