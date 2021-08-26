import React from "react";
import {Container, Grid, withStyles, CssBaseline, Box, Paper, Typography} from "@material-ui/core";
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import logo from "../static/logo.svg";
import {People} from "@material-ui/icons";

const styles = (theme) => ({
    mainBody: {
        height: '100vh',
        flex: '1'
    },
    summaryBoxContainer: {
        padding: theme.spacing(2),
        position: 'relative'
    },
    summaryBox: {
        height: '270px',
        width: '100%',
        borderRadius: '10px'
    },
    mainSection: {
        padding: '4rem'
    },
    firstBox: {
        backgroundColor: 'rgb(200, 250, 205)',
        color: 'rgb(0, 123, 85)',
        backgroundImage: 'linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)'
    },
    secondBox: {
        backgroundColor: 'rgb(208, 242, 255)'
    },
    thirdBox: {
        backgroundColor: 'rgb(255, 247, 205)'
    },
    fourthBox: {
        backgroundColor: 'rgb(255, 231, 217)'
    },
    boxContentContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1rem',
        textAlign: 'center'
    }
});

class Dashboard extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <Box display="flex" width="100">
                <Box item md={2} className={classes.sideBar}>
                    <Sidebar/>
                </Box>
                <Box item container className={classes.mainBody}>
                    <Navbar/>
                    <Box width="100" className={classes.mainSection}>
                        <Grid container spacing={3}>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.firstBox}`} boxShadow={1}>
                                    <div className={classes.boxContentContainer}>
                                        <People fontSize="large"/>
                                        <Typography variant="h6">
                                            Total Users
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.secondBox}`} boxShadow={1}/>
                            </Grid>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.thirdBox}`} boxShadow={1}/>
                            </Grid>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.fourthBox}`} boxShadow={1}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(Dashboard);