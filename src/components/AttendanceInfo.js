import React from 'react';
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import BaseApiUrl from "../BaseApiUrl";

import AttendanceApi from "../api/AttendanceApi";

class AttendanceInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        }

        this.getAttendanceImages = this.getAttendanceImages.bind(this);
    }

    componentDidMount() {
        this.getAttendanceImages(this.props.attendance.AttendanceID);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getAttendanceImages(nextProps.attendance.AttendanceID);
    }

    getAttendanceImages(attendanceId)
    {
        AttendanceApi.getAttendanceImages(attendanceId).then(res => {
           this.setState({
               images: res.images || []
           });
        });
    }

    render() {
        return (
            <div style={{ width: '200px' }}>
                <Carousel showArrows={true}>
                    {this.state.images.map((image, index) => (
                        <div key={index}>
                            <img src={"http://app.acibd.com/marketvisit_api/public/"+image.ImagePath} alt=""/>
                        </div>
                    ))}
                </Carousel>
            </div>
        )
    }
}

export default AttendanceInfo;