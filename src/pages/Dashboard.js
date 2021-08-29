import React from "react";
import {Container, Grid, withStyles, CssBaseline, Box, Paper, Typography, Hidden} from "@material-ui/core";
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";
import WebsiteVisitChart from "../components/WebsiteVisitChart";
import ZoneOverviewChart from "../components/ZoneOverviewChart";

import logo from "../static/logo.svg";
import {People, Store, PinDrop, PhotoCamera} from "@material-ui/icons";

const styles = (theme) => ({
    mainBody: {
        height: '100vh',
        flex: '1'
    },
    marginDiv: {
      width: '280px'
    },
    summaryBoxContainer: {
        padding: theme.spacing(2),
        position: 'relative'
    },
    summaryBox: {
        height: '240px',
        width: '100%',
        borderRadius: '20px',
    },
    mainSection: {
        padding: '2rem'
    },
    firstBox: {
        backgroundColor: 'rgb(200, 250, 205)',
        color: 'rgb(0, 123, 85)',
    },
    secondBox: {
        backgroundColor: 'rgb(208, 242, 255)',
        color: 'rgb(12, 83, 183)',

    },
    thirdBox: {
        backgroundColor: 'rgb(255, 247, 205)',
        color: 'rgb(183, 129, 3)',

    },
    fourthBox: {
        backgroundColor: 'rgb(255, 231, 217)',
        color: 'rgb(183, 33, 54)',

    },
    boxContentContainer: {
        position: 'absolute',
        left: '50%',
        top: '45%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1rem',
        textAlign: 'center'
    },
    boxIconContainer: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px'
    },
    firstBoxIconContainer: {
        backgroundImage: 'linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)',
    },
    secondBoxIconContainer: {
        backgroundImage: 'linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)'
    },
    thirdBoxIconContainer: {
        backgroundImage: 'linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)'
    },
    fourthBoxIconContainer: {
        backgroundImage: 'linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)'
    },
    summaryCount: {
        fontSize: '2.2rem',
        fontWeight: '600'
    },
    summaryLabel: {
        fontSize: '15px',
        fontWeight: '500'
    },
    greeting: {
        margin: '30px 0',
        fontSize: '1.5rem',
        color: theme.palette.text.primary
    }
});

class Dashboard extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
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
                        <Typography variant="h4" className={classes.greeting}>
                            <strong>Hi, Welcome back</strong>
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.firstBox}`} boxShadow={1}>
                                    <div className={classes.boxContentContainer}>
                                        <div className={`${classes.boxIconContainer} ${classes.firstBoxIconContainer}`}>
                                            <People fontSize="large"/>
                                        </div>
                                        <Typography variant="h3" className={classes.summaryCount}>
                                            120K
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Total user
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.secondBox}`} boxShadow={1}>
                                    <div className={classes.boxContentContainer}>
                                        <div className={`${classes.boxIconContainer} ${classes.secondBoxIconContainer}`}>
                                            <Store fontSize="large"/>
                                        </div>
                                        <Typography variant="h3" className={classes.summaryCount}>
                                            314K
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Total store
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.thirdBox}`} boxShadow={1}>
                                    <div className={classes.boxContentContainer}>
                                        <div className={`${classes.boxIconContainer} ${classes.thirdBoxIconContainer}`}>
                                            <PinDrop fontSize="large"/>
                                        </div>
                                        <Typography variant="h3" className={classes.summaryCount}>
                                            230
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Total territory
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid container lg={3} sm={12} className={classes.summaryBoxContainer}>
                                <Box className={`${classes.summaryBox} ${classes.fourthBox}`} boxShadow={1}>
                                    <div className={classes.boxContentContainer}>
                                        <div  className={`${classes.boxIconContainer} ${classes.fourthBoxIconContainer}`}>
                                            <PhotoCamera fontSize="large"/>
                                        </div>
                                        <Typography variant="h3" className={classes.summaryCount}>
                                            870K
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Total photo
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                        <br/><br/>
                        <Grid container spacing={2}>
                            <Grid item lg={6} sm={12}>
                                <strong>Website visit</strong>
                                <Box width="100" display="flex" justifyContent="flex-start" mt={3}>
                                    <WebsiteVisitChart/>
                                </Box>

                            </Grid>
                            <Grid item lg={6} sm={12}>
                                <strong>Website visit</strong>
                                <Box width="100" display="flex" justifyContent="flex-end" mt={5}>
                                    <ZoneOverviewChart/>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(Dashboard);