import React from "react";
import {Container, Grid, withStyles, CssBaseline, Box, Typography} from "@material-ui/core";
import {PieChart, PeopleAlt, PersonAdd} from "@material-ui/icons";
import logo from "../static/logo.svg";
import avatar from "../static/avatar.jpg";
import {Link} from "react-router-dom";

const styles = (theme) => ({
    sideBar: {
        position: 'fixed',
        width: '280px',
        height: '100vh',
        borderRight: '1px solid rgba(145, 158, 171, 0.24)'
    },
    logo: {
        width: '40px',
        borderRadius: '50%'
    },
    avatarBox: {
        display: 'flex',
        justifyContent: 'start',
        backgroundColor: 'rgba(176, 179, 183, 0.24)',
        borderRadius: '10px'
    },
    menuContainer: {

    },
    menuList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
        cursor: 'pointer'
    },
    menuName: {
        fontSize: '.9rem',
        fontWeight: '600',
        color: 'rgb(172 162 162)',
    },
    menuIcon: {
        color: 'rgb(99, 115, 129)',
    }
});

class Sidebar extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <Box className={classes.sideBar}>
                <Box p={2} width="100" display="flex" justifyContent="flex-start" mb={1}>
                    <img className={classes.logo} src={logo} alt=""/>
                </Box>
                <Box width="100" p={2}>
                    <Box width="100" className={classes.avatarBox} p={2}>
                        <img className={classes.logo} src={avatar} alt=""/>
                        <Box display="flex" alignItems="center" ml={3}>
                            <span>Jhon doe</span>
                        </Box>
                    </Box>
                </Box>
                <Box width="100" mt={3}>
                    <ul className={classes.menuList}>
                        <li>
                            <Link to="/">
                                <Box className={classes.menuItem} display="flex" width="100" px={5} py={1}>
                                <span className={classes.menuIcon}>
                                    <PieChart/>
                                </span>
                                    <Box ml={2} display="flex" justifyContent="flex-start">
                                        <Typography variant="subtitle2" className={classes.menuName}>
                                            Dashboard
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </li>
                        <li>
                            <Box className={classes.menuItem} display="flex" width="100" px={5} py={1}>
                                <span className={classes.menuIcon}>
                                    <PeopleAlt/>
                                </span>
                                <Box ml={2} display="flex" justifyContent="flex-start">
                                    <Typography variant="subtitle2" className={classes.menuName}>
                                        Users
                                    </Typography>
                                </Box>
                            </Box>
                        </li>
                        <li>
                            <Link to="/add-user">
                                <Box className={classes.menuItem} display="flex" width="100" px={5} py={1}>
                                <span className={classes.menuIcon}>
                                    <PersonAdd/>
                                </span>
                                    <Box ml={2} display="flex" justifyContent="flex-start">
                                        <Typography variant="subtitle2" className={classes.menuName}>
                                            Add user
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </li>
                    </ul>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(Sidebar);