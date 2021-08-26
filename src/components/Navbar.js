import React from "react";

import {AppBar, Toolbar, withStyles, Button, IconButton, Badge} from "@material-ui/core";
import {Mail, Notifications, AccountCircle} from "@material-ui/icons";
import logo from "../static/logo.svg";
import avatar from "../static/avatar.jpg";

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
    render() {
        const classes = this.props.classes;
        return (
            <React.Fragment>
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
                        >
                            <img className={classes.logo} src={avatar} alt=""/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Navbar);