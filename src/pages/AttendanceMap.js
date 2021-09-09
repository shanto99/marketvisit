import React from "react";
import 'date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeckGL, { HexagonLayer } from "deck.gl";
import MapGL, {
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    StaticMap
} from 'react-map-gl';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {Box, Container, Grid, Button} from "@material-ui/core";

import Pins from "../components/Pins";
import AttendanceInfo from "../components/AttendanceInfo";
import AttendanceApi from "../api/AttendanceApi";
import TextField from "@material-ui/core/TextField";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import UserApi from "../api/UserApi";


export class AttendanceImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attendances: [],
            subordinates: [],
            selectedSubordinate: null,
            selectedAttendance: null,
            fromDate: new Date(),
            toDate: new Date(),
            viewState: {
                longitude: 90.399452,
                latitude: 23.777176,
                zoom: 12,
                altitude: 2
            }
        }

        this.onMarketClick = this.onMarketClick.bind(this);
        this.setViewport = this.setViewport.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.handleSubordinateChange = this.handleSubordinateChange.bind(this);
        this.handleFromDateChange = this.handleFromDateChange.bind(this);
        this.handleToDateChange = this.handleToDateChange.bind(this);
        this.getAttendances = this.getAttendances.bind(this);
    }

    componentDidMount() {
        UserApi.getSubordinates().then(res => {
            this.setState({
                subordinates: res.subordinates
            }, this.getAttendances);
        });
    }

    onMarketClick(attendance) {
        this.setState({
            selectedAttendance: attendance
        });
    }

    getAttendances()
    {
        let attendanceUserId = this.state.selectedSubordinate && this.state.selectedSubordinate.UserID;
        let fromDate = `${this.state.fromDate.getFullYear()}-${this.state.fromDate.getMonth()+1}-${this.state.fromDate.getDate()}`;
        let toDate = `${this.state.toDate.getFullYear()}-${this.state.toDate.getMonth()+1}-${this.state.toDate.getDate()}`;
        AttendanceApi.getAttendances(attendanceUserId, fromDate, toDate).then(res => {
            let attendances = res.attendances;
            this.setState(preState => {
                if(attendances.length > 0) {
                    return {
                        ...preState,
                        attendances: attendances,
                        viewState: {
                            longitude: Number(attendances[0].Lng),
                            latitude: Number(attendances[0].Lat),
                            zoom: 12,
                            altitude: 2
                        }
                    }
                } else {
                    return {
                        ...preState,
                        attendances: attendances,
                    }
                }
            })
            if(attendances && attendances.length > 0) {
                this.setState({
                    attendances: attendances,
                    viewState: {
                        longitude: Number(attendances[0].Lng),
                        latitude: Number(attendances[0].Lat),
                        zoom: 12,
                        altitude: 2
                    }
                });
            }


        })
    }

    setViewport(viewport)
    {
        this.setState({
           viewState: {...viewport}
        });
    }

    handlePopupClose()
    {
        this.setState({
            selectedAttendance: null
        })
    }

    handleSubordinateChange(event, subordinate) {
        this.setState({
            selectedSubordinate: subordinate,
            selectedAttendance: null
        }, this.getAttendances)
    }

    handleFromDateChange(date)
    {
        this.setState({
            fromDate: date
        });
    }

    handleToDateChange(date) {
        this.setState({
            toDate: date
        });
    }

    render() {
        return (
            <Box width="100" height="90vh">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={2}>
                        <Grid item lg={3} md={6} sm={12}>
                            <Box mt={2}>
                                <Autocomplete
                                    id="subordinate"
                                    options={this.state.subordinates}
                                    value={this.state.selectedSubordinate}
                                    getOptionLabel={(option) => {
                                        return option.UserName || "";
                                    }}
                                    style={{ width: 300 }}
                                    onChange={this.handleSubordinateChange}
                                    renderInput={
                                        (params) =>
                                            <TextField {...params} label="Select user" />
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item lg={3} md={6} sm={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                onChange={this.handleFromDateChange}
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={this.state.fromDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} sm={12}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                onChange={this.handleToDateChange}
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={this.state.toDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={6} sm={12}>
                            <Box mt={4}>
                                <Button variant="contained" color="primary" onClick={this.getAttendances}>
                                    show
                                </Button>
                            </Box>

                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
                <br/>
                <MapGL style={{position: 'relative'}}
                    {...this.state.viewState}
                        height="100%"
                        width="100%"
                       mapStyle="mapbox://styles/mapbox/navigation-night-v1"
                       mapboxApiAccessToken="pk.eyJ1Ijoic2hhbnRvOSIsImEiOiJja3N6eHh3NXIxcTNhMndsZzc0dmtvZzBqIn0.mLVlMcoA4RODtkY4cfzRpQ"
                       onViewportChange={this.setViewport}
                >
                        <Pins
                            data={this.state.attendances} onClick = {this.onMarketClick}
                        />
                        {this.state.selectedAttendance && (
                            <Popup
                                tipSize={5}
                                anchor="top"
                                longitude={Number(this.state.selectedAttendance.Lng)}
                                latitude={Number(this.state.selectedAttendance.Lat)}
                                closeOnClick={false}
                                onClose={this.handlePopupClose}
                            >
                                <AttendanceInfo attendance = {this.state.selectedAttendance} />
                            </Popup>
                        )}
                </MapGL>
            </Box>
        )
    }
}

export default AttendanceImage;