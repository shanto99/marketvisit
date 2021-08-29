import React from "react";
import {Container, Grid, withStyles, Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Registration from "../static/registration.png";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '15px'
    },
    form: {
        width: '100%'
    },

    submit: {
        maxWidth: '100px'
    },
    registrationBanner: {
        width: '100%'
    }
});
class AddUser extends React.Component {
    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="lg">
                <Box className={classes.paper} boxShadow={3} px={3} py={5}>
                    <Typography component="h1" variant="h5">
                        Add user
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12}>
                                <img className={classes.registrationBanner} src={Registration} alt=""/>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userId"
                                        label="User id"
                                        name="UserID"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User name"
                                        name="UserName"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userZone"
                                        label="Zone"
                                        name="UserZone"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userTerritory"
                                        label="Territory"
                                        name="Territory"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userEmail"
                                        label="Email"
                                        name="Email"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userPhone"
                                        label="Phone"
                                        name="Phone"
                                        autoComplete="off"
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
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        );
    }
}

export default withStyles(styles)(AddUser)

