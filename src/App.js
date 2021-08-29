import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";

import PrivateRoute from "./PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import {CssBaseline} from "@material-ui/core";
import Loader from "react-loader-spinner";
import Login from "./pages/Login";

const styles = theme => ({
    loaderContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
})

class App extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
        <React.Fragment>
            <CssBaseline/>
                <Router>
                    <Switch>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <PrivateRoute path="/" isAuthenticated={this.props.isAuthenticated}>
                            <MainLayout/>
                        </PrivateRoute>
                    </Switch>
                </Router>
            {this.props.isLoading
                ? <div className={classes.loaderContainer}>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </div>
            : null}
           </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.user,
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        make_login: (user) => dispatch({
            type: 'LOG_IN', payload: {
            user: user
            }
        }),
        make_logout: () => dispatch({
            type: 'LOG_OUT'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
