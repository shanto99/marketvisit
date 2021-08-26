import React from "react";
import Dashboard from "./pages/Dashboard";
import {CssBaseline} from "@material-ui/core";

class App extends React.Component {
  render() {
    return (
        <React.Fragment>
          <CssBaseline/>
          <Dashboard/>
        </React.Fragment>
    );
  }
}

export default App;
