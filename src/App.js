import React from "react";
import MainLayout from "./layouts/MainLayout";
import {CssBaseline} from "@material-ui/core";

class App extends React.Component {
  render() {
    return (
        <React.Fragment>
          <CssBaseline/>
          <MainLayout/>
        </React.Fragment>
    );
  }
}

export default App;
