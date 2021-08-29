import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {withStyles, Box, Hidden} from "@material-ui/core";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";

import Sidebar from "../components/Sidebar";

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
            <Router>
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
                                <Route path="/">
                                    <Dashboard/>
                                </Route>
                            </Switch>
                        </Box>
                    </Box>
                </Box>
            </Router>
        );
    }
}

export default withStyles(styles)(MainLayout);