import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

import authHelpers from "../api/Authentication";
import {Redirect} from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                ACI MIS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.userIdRef = React.createRef();
        this.passwordRef = React.createRef();

        this.makeLogin = this.makeLogin.bind(this);
    }

    makeLogin(e) {
        e.preventDefault();
        this.props.start_loader();
        let userId = this.userIdRef.current.value;
        let password = this.passwordRef.current.value;

        authHelpers.logIn(userId, password).then(res => {
            this.props.end_loader();
            let user = res.data.data.user;
            this.props.make_login(user);
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            this.props.isAuthenticated
            ? <Redirect to="/"/>
            : <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            inputRef={this.userIdRef}
                            id="userId"
                            label="User id"
                            name="UserID"
                            autoComplete="off"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            inputRef={this.passwordRef}
                            name="Password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.makeLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));