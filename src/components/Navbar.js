import React from "react";
import swal from "sweetalert";

import {AppBar, Toolbar, withStyles, Button, IconButton, Badge, Menu, MenuItem} from "@material-ui/core";
import {Mail, Notifications} from "@material-ui/icons";

import authHelpers from "../api/Authentication";

import avatar from "../static/avatar.jpg";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const styles = theme => ({
    appBar: {
        backgroundColor: '#fafafa',
        border: 'none',
        boxShadow: 'none'
    },
   toolbar: {
       display: 'flex',
       justifyContent: 'flex-end'
   },
    menuIcon: {
        padding: '20px 20px'
    },
    logo: {
        width: '30px',
        borderRadius: '50%'
    }
});

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        }

        this.openMenu = this.openMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.makeLogout = this.makeLogout.bind(this);
    }

    openMenu(e)
    {
        this.setState({
            anchorEl: e.currentTarget
        });
    }

    handleClose()
    {
        this.setState({
           anchorEl: null
        });
    }

    makeLogout()
    {
        this.props.start_loader();
        authHelpers.logOut().then(res => {
           this.props.end_loader();
           swal("Success!", "Logged out successfully", "success");
           this.props.make_logout();
           this.handleClose();
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            !this.props.isAuthenticated
            ? <Redirect to="/login"/>
            : <React.Fragment>
                <AppBar style={{ position: 'sticky' }} className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton aria-label="show 4 new mails" color="inherit" className={classes.menuIcon} >
                            <Badge badgeContent={4} color="secondary">
                                <Mail color="primary" />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit" className={classes.menuIcon}>
                            <Badge badgeContent={17} color="secondary">
                                <Notifications color="primary" />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            className={classes.menuIcon}
                            onClick={this.openMenu}
                        >
                            <img className={classes.logo} src={avatar} alt=""/>
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.makeLogout}>Logout</MenuItem>
                        </Menu>

                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.user
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
        }),
        start_loader: () => dispatch({
            type: 'START_LOADER'
        }),
        end_loader: () => dispatch({
            type: 'END_LOADER'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));

//export default withStyles(styles)(Navbar);