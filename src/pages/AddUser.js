import React from "react";
import swal from "sweetalert";
import {Container, Grid, withStyles, Box, List,
    FormControl, InputLabel, Select, MenuItem, ListItem} from "@material-ui/core";

import Autocomplete from '@material-ui/lab/Autocomplete';

import {LocalConvenienceStoreOutlined, People} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import ZoneApi from "../api/Zone";
import TerritoryApi from "../api/Territory";
import UserApi from "../api/UserApi";

import MyListItem from "../components/MyListItem";

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
        maxWidth: '150px'
    },
    registrationBanner: {
        width: '100%'
    }
});
class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.userForm = React.createRef();
        this.selectedUser = null;
        this.state = {
            users: [],
            zones: [],
            territories: [],
            userName: '',
            userPassword: '',
            userDesignation: '',
            userId: '',
            userZone: null,
            userTerritory: null,
            userEmail: '',
            userPhone: '',
            supervisor: null
        }

        this.getAllUsers = this.getAllUsers.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.handleZoneChange = this.handleZoneChange.bind(this);
        this.handleTerritoryChange = this.handleTerritoryChange.bind(this);
        this.handleSupervisorChange = this.handleSupervisorChange.bind(this);
        this.getTerritories = this.getTerritories.bind(this);
    }

    componentDidMount()
    {
        ZoneApi.getAllZones().then(res => {
            let response = res.data;
            let zones = response.zones;

            this.setState({
                zones: zones
            }, this.getAllUsers);
        })
    }

    getAllUsers()
    {
        UserApi.getAllUsers()
        .then((res) => {
            let response = res.data;
            this.setState({
                users: response.users || []
            });
        })
        .catch((err) => {
            swal("Error!", "Could not fetch users", "error");
        });
    }

    editUser(userId)
    {
        let user = this.state.users.find(user => {
            return user.UserID === userId;
        });

        if(!user) return;

        this.selectedUser = user;

        let userSupervisor = user.supervisor && user.supervisor[0];

        let userZone = user.territory && user.territory.zone;

        this.setState({
            userName: user.UserName,
            userId: user.UserID,
            userDesignation: user.Designation,
            userEmail: user.Email,
            userPhone: user.MobileNo,
            userZone: userZone,
            supervisor: userSupervisor
        }, this.getTerritories);

    }

    saveUser(e)
    {
        e.preventDefault();
        let {userId, userName, userDesignation, userEmail, userPhone, userPassword} = this.state;
        let userTerritory = this.state.userTerritory && this.state.userTerritory.TerritoryID;

        let supervisor = this.state.supervisor && this.state.supervisor.UserID;

        UserApi.saveUser(userId, userName, userPassword, userDesignation, userEmail, userPhone, userTerritory, supervisor).then(res => {
            swal("Success!", "User created successfully", "success");
            this.userForm.current.reset();
        }).catch((err) => {
            swal("Error!", "User could not be created", "error");
        });

    }

    handleZoneChange(event, value)
    {
        this.setState({
            userZone: value
        }, this.getTerritories);
        
    }

    getTerritories()
    {
        let zoneId = this.state.userZone ? this.state.userZone.ZoneID : '';
        TerritoryApi.getAllTerritories(zoneId).then(res => {
            let response = res.data;
            let territories = response.territories;
            let userTerritory = null;
            if(this.selectedUser) {
                userTerritory = territories.find(territory => territory.TerritoryID === this.selectedUser.TerritoryID);
            }

            this.setState({
                territories: response.territories || [],
                userTerritory: userTerritory
            });
        });
    }

    handleTerritoryChange(event, value)
    {
        this.setState({
            userTerritory: value
        });
    }

    handleSupervisorChange(event, value)
    {
        this.setState({
            supervisor: value
        });
    }

    deleteUser(userId)
    {
        UserApi.deleteUser(userId).then(res => {
            swal("Success!", "User deleted successfully", "success");
            let users = this.state.users.filter(user => user.UserID !== userId);
            this.setState({
                users: users
            });
        }).catch(err => {
            swal("Error!","Could not delete user", "error");
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="lg">
                <Box className={classes.paper} boxShadow={3} px={3} py={5}>
                    <Typography component="h1" variant="h5">
                        Add user
                    </Typography>
                    <form className={classes.form} ref={this.userForm} noValidate>
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12}>
                                <List>
                                    {this.state.users.map(user => {
                                        return (
                                            <MyListItem
                                                itemIcon={<People/>}
                                                key={user.UserID}
                                                itemId={user.UserID}
                                                primaryText={`${user.UserID}-${user.UserName}`}
                                                editCallback={this.editUser}
                                                deleteCallback={this.deleteUser}
                                            />
                                        )
                                    })}
                                </List>
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
                                        value={this.state.userId}
                                        name="UserID"
                                        autoComplete="off"
                                        onChange={e => this.setState({
                                            userId: e.target.value
                                        })}
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
                                        value={this.state.userName}
                                        autoComplete="off"
                                        onChange={e => this.setState({
                                            userName: e.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userDesignation"
                                        label="User designation"
                                        name="UserDesignation"
                                        value={this.state.userDesignation}
                                        autoComplete="off"
                                        onChange={e => this.setState({
                                            userDesignation: e.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="userPassword"
                                        label="Password"
                                        name="UserPassword"
                                        value={this.state.userPassword}
                                        autoComplete="off"
                                        onChange={e => this.setState({
                                            userPassword: e.target.value
                                        })}
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <Autocomplete
                                        id="user-zone"
                                        options={this.state.zones}
                                        value={this.state.userZone}
                                        getOptionLabel={(option) => option.Zone}
                                        style={{ width: 300 }}
                                        onChange={this.handleZoneChange}
                                        renderInput={
                                            (params) => 
                                            <TextField {...params} label="Zone" variant="outlined" />
                                        }
                                        />
                                </Grid>
                                <br/>
                                <Grid item lg={12} sm={12}>
                                    <Autocomplete
                                        id="user-territory"
                                        options={this.state.territories}
                                        value={this.state.userTerritory}
                                        onChange={this.handleTerritoryChange}
                                        getOptionLabel={(option) => option.Territory}
                                        style={{ width: 300 }}
                                        renderInput={
                                            (params) => 
                                            <TextField {...params} label="Territory" variant="outlined" />
                                        }
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
                                        value={this.state.userEmail}
                                        onChange={(e) => {
                                            this.setState({
                                                userEmail: e.target.value
                                            })
                                        }}
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
                                        value={this.state.userPhone}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            this.setState({
                                                userPhone: e.target.value
                                            })
                                        }}
                                    />
                                </Grid>
                                <br/>
                                <Grid item lg={12} sm={12}>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={this.state.users}
                                        value={this.state.supervisor}
                                        onChange={this.handleSupervisorChange}
                                        getOptionLabel={(option) => option.UserName}
                                        style={{ width: 300 }}
                                        renderInput={
                                            (params) => 
                                            <TextField {...params} label="Supervisor" variant="outlined" />
                                        }
                                        />
                                </Grid>
                                <br/>
                                <Grid item lg={12} sm={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={this.saveUser}
                                    >
                                        Save user
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

