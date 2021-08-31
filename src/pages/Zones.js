import React from "react";
import {Container, Grid, withStyles, Box, List} from "@material-ui/core";
import {PinDrop, Delete, Edit, Place} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import {connect} from "react-redux";

import MyListItem from "../components/MyListItem";

import ZoneApi from "../api/Zone";

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
class Zones extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            zones: [],
            zoneId: '',
            zoneName: ''
        };
        this.getAllZones = this.getAllZones.bind(this);
        this.saveZone = this.saveZone.bind(this);
        this.editZone = this.editZone.bind(this);
    }
    componentDidMount() {
        this.getAllZones();
    }

    editZone(zoneId)
    {
        let zone = this.state.zones.find(function(zone) {
           return zone.ZoneID ===  zoneId;
        });

        if(zone) {
            this.setState({
                zoneId: zone.ZoneID,
                zoneName: zone.Zone
            });
        }
    }

    getAllZones() {
        this.props.start_loader();
        ZoneApi.getAllZones().then(response => {
            let data = response.data;
            this.setState({
               zones: data.zones || []
            });
            this.props.end_loader();
        })
    }

    saveZone(e)
    {
        e.preventDefault();
        this.props.start_loader();
        let form = e.currentTarget;

        let {zoneId, zoneName} = this.state;

        ZoneApi.saveZone(zoneId, zoneName).then(res => {
            swal("Success!", "Zone created successfully", "success");
            this.getAllZones();
            form.reset();
        })
        .catch(() => {
            swal("Error!", "Could not create zone", "error");
            this.props.end_loader();
        });
    }

    render() {
        const classes = this.props.classes;
        return (
            <Container component="main" maxWidth="lg">
                <Typography variant="h4" className={classes.pageTitle}>
                    <strong>Configure your zones here</strong>
                </Typography>
                <Box className={classes.paper} boxShadow={3} px={3} py={5}>
                        <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12}>
                                <Typography component="h1" variant="h5">
                                    Zone list
                                </Typography>
                                <List>
                                    {this.state.zones.map( zone => {
                                        return (<MyListItem
                                            itemIcon={<PinDrop color="primary"/>}
                                            key={zone.ZoneID}
                                            itemId={zone.ZoneID}
                                            primaryText={`${zone.ZoneID}-${zone.Zone}`}
                                            editCallback={this.editZone}
                                        />)
                                    })}
                                </List>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <Typography component="h1" variant="h5">
                                    Add a Zone
                                </Typography>
                                <form className={classes.form} noValidate onSubmit={this.saveZone}>
                                    <Grid item lg={12} sm={12}>
                                        <TextField
                                            value={this.state.zoneId}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="zoneCode"
                                            label="Zone code"
                                            name="ZoneCode"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                this.setState({zoneId: e.target.value})
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12} sm={12}>
                                        <TextField
                                            value={this.state.zoneName}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="zoneName"
                                            label="Zone name"
                                            name="Zone"
                                            autoComplete="off"
                                            onChange={(e) => {
                                                this.setState({zoneName: e.target.value})
                                            }}
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

export default connect(null, mapDispatchToProps)(withStyles(styles)(Zones));

