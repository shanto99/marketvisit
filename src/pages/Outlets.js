import React from "react";
import {Container, Grid, withStyles, Box, List, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import {connect} from "react-redux";

import MyListItem from "../components/MyListItem";

import TerritoryApi from "../api/Territory";
import Zone from "../api/Zone";
import OutletApi from "../api/Outlet";
import Zones from "./Zones";

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
    },
    pageTitle: {
        margin: '30px 0',
        fontSize: '1.5rem',
        color: theme.palette.text.primary
    },
});
class Outlets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            outlets: [],
            zones: [],
            territories: [],
            zoneId: '',
            territoryId: '',
            outletId: '',
            outletName: '',
            outletAddress: '',
            contactPerson: '',
            contactPhone: ''
        };
        this.getAllOutlets = this.getAllOutlets.bind(this);
        this.saveTerritory = this.saveTerritory.bind(this);
        this.editTerritory = this.editTerritory.bind(this);
    }
    componentDidMount() {
        Zone.getAllZones().then(res => {
            this.setState({
                zones: res.data.zones
            }, this.getAllTerritories);
        });
    }

    editTerritory(territoryId)
    {
        let territory = this.state.territories.find(function(territory) {
            return territory.TerritoryID ===  territoryId;
        });

        if(territory) {
            this.setState({
                zoneId: territory.ZoneID,
                territoryId: territory.TerritoryID,
                territoryName: territory.Territory
            });
        }
    }

    getAllOutlets() {
        this.props.start_loader();
        OutletApi.getAllOutlets().then(response => {
            let data = response.data;
            this.setState({
                outlets: data.outlets || []
            });
            this.props.end_loader();
        })
            .catch((err) => {
                swal("Error", "Could not fetch outlets!", "error");
            })
    }

    saveTerritory(e)
    {
        // e.preventDefault();
        // this.props.start_loader();
        // let form = e.currentTarget;
        //
        // let {territoryId, territoryName, zoneId} = this.state;
        //
        // console.log({territoryId, territoryName, zoneId});
        //
        // TerritoryApi.saveTerritory(territoryId, territoryName, zoneId).then(res => {
        //     swal("Success!", "Territory created successfully", "success");
        //     this.getAllTerritories();
        //     form.reset();
        // })
        //     .catch(() => {
        //         swal("Error!", "Could not create territory", "error");
        //         this.props.end_loader();
        //     });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="lg">
                <Typography variant="h4" className={classes.pageTitle}>
                    <strong>Configure your outlets here</strong>
                </Typography>
                <Box className={classes.paper} boxShadow={3} px={3} py={5}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12}>
                            <Typography component="h1" variant="h5">
                                Outlet list
                            </Typography>
                            <List>
                                {this.state.outlets.map( outlet => {
                                    return (<MyListItem
                                        key={outlet.OutletCode}
                                        itemId={outlet.OutletName}
                                        primaryText={`${outlet.OutletCode}-${outlet.OutletName}`}
                                        editCallback={this.editTerritory}
                                    />)
                                })}
                            </List>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12}>
                            <Typography component="h1" variant="h5">
                                Add an outlet
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.saveTerritory}>
                                <br/>
                                <Grid item lg={12} sm={12}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Zone</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={this.state.zoneId}
                                            label="Select zone"
                                            fullWidth
                                            onChange={(e) => this.setState({
                                                zoneId: e.target.value
                                            })}
                                        >
                                            <MenuItem value="">
                                                <em>Select zone</em>
                                            </MenuItem>
                                            {this.state.zones.map(zone => {
                                                return (
                                                    <MenuItem key={zone.ZoneID} value={zone.ZoneID}>{zone.Zone}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        value={this.state.territoryId}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="territoryCode"
                                        label="Territory code"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        value={this.state.territoryName}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="territoryName"
                                        label="Territory name"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        start_loader: () => dispatch({
            type: 'START_LOADER'
        }),
        end_loader: () => dispatch({
            type: 'END_LOADER'
        })
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Outlets));

