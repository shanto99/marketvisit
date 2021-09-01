import React from "react";
import {Container, Grid, withStyles, Box, List,
    FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import {connect} from "react-redux";
import {Store} from "@material-ui/icons";
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
        this.saveOutlet = this.saveOutlet.bind(this);
        this.editOutlet = this.editOutlet.bind(this);
    }
    componentDidMount() {
        Zone.getAllZones().then(res => {
            let zones = res.data.zones;
            TerritoryApi.getAllTerritories().then(res => {
                let territories = res.data.territories;

                this.setState({
                    zones: zones,
                    territories: territories,
                }, this.getAllOutlets);
            });
        });
    }

    editOutlet(outletId)
    {
        console.log(outletId);
        let outlet = this.state.outlets.find(function(outlet) {
            return outlet.OutletCode ===  outletId;
        });

        console.log(outlet);

        // if(outlet) {
        //     this.setState({
        //         zoneId: territory.ZoneID,
        //         territoryId: territory.TerritoryID,
        //         territoryName: territory.Territory
        //     });
        // }
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

    saveOutlet(e)
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
                                        itemIcon={<Store color="secondary"/>}
                                        key={outlet.OutletCode}
                                        itemId={outlet.OutletCode}
                                        primaryText={`${outlet.OutletCode}-${outlet.OutletName}`}
                                        editCallback={this.editOutlet}
                                    />)
                                })}
                            </List>
                        </Grid>
                        <Grid container item lg={6} md={6} sm={12} spacing={2}>
                            <Typography component="h1" variant="h5">
                                Add an outlet
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.saveOutlet}>
                                <br/>
                                <Grid item lg={12} sm={12}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Zone</InputLabel>
                                        <Select
                                            labelId="zone-label"
                                            id="zone"
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
                                </Grid>
                                <br/>
                                <Grid item lg={12} sm={12}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Territory</InputLabel>
                                        <Select
                                            labelId="territory-label"
                                            id="territory"
                                            value={this.state.textRendering}
                                            label="Select territory"
                                            fullWidth
                                            onChange={(e) => this.setState({
                                                zoneId: e.target.value
                                            })}
                                        >
                                            <MenuItem value="">
                                                <em>Select territory</em>
                                            </MenuItem>
                                            {this.state.territories.map(territory => {
                                                return (
                                                    <MenuItem key={territory.TerritoryID} value={territory.TerritoryID}>
                                                        {territory.Territory}
                                                    </MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        value={this.state.outletName}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="outletName"
                                        label="Outlet name"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        value={this.state.outletAddress}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="outletAddress"
                                        label="Outlet address"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        value={this.state.contactPerson}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="contactPerson"
                                        label="Contact person"
                                        autoComplete="off"
                                    />
                                </Grid>
                                <Grid item lg={12} sm={12}>
                                    <TextField
                                        value={this.state.contactPhone}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="contactPhone"
                                        label="Contact phone"
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

