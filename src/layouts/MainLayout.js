import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {withStyles, Box, Hidden} from "@material-ui/core";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import AddUser from "../pages/AddUser";
import Zones from "../pages/Zones";
import Territories from "../pages/Territories";
import Outlets from "../pages/Outlets";
import LayeredMap from "../pages/NationalDataVisualization";

import Sidebar from "../components/Sidebar";
import {connect} from "react-redux";

const styles = (theme) => ({
    mainBody: {
        height: '100vh',
        flex: '1'
    },
    marginDiv: {
        width: '280px'
    },
    mainSection: {
        padding: '2rem'
    }
});

class MainLayout extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
             <React.Fragment>
                <Box display="flex" width="100">
                    <Hidden mdDown>
                        <Box item md={2} className={classes.sideBar}>
                            <Sidebar/>
                        </Box>
                        <div className={classes.marginDiv}/>
                    </Hidden>

                    <Box item container className={classes.mainBody}>
                        <Navbar/>
                        <Box width="100" className={classes.mainSection}>
                            <Switch>
                                <Route exact path="/users">
                                    <AddUser/>
                                </Route>
                                <Route path="/zones">
                                    <Zones/>
                                </Route>
                                <Route path="/territories">
                                    <Territories/>
                                </Route>
                                <Route path="/outlets">
                                    <Outlets/>
                                </Route>
                                <Route path="/national-overview">
                                    <LayeredMap/>
                                </Route>
                                <Route path="/">
                                    <Dashboard/>
                                </Route>
                            </Switch>
                        </Box>
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MainLayout);