import React, { Component } from "react";
import axios from 'axios'
import BackButton from "../components/BackButton";
import UserContext from "../context/UserContext";
import express from '../assets/images/express-delivery.png'
import moment from 'moment'

class OrderTrack extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            tracking_list: null
        }
    }

    componentDidMount() {
        axios.post('/order-tracking', {
            line_id: this.context.user.userId,
        }).then((res) => {
            this.setState({ tracking_list: res.data}, () => {
                console.log(this.state.tracking_list)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container mb-4">
                <div className="light-top"></div>

                <div className="pt-4 mb-3 h5">รายการพัสดุที่จัดส่ง</div>

                {this.state.tracking_list !== null && this.state.tracking_list.map((track_list, index) => (
                    <a href={`https://track.thailandpost.co.th/?trackNumber=` + track_list.tracking_id}>
                        <div class="card mb-3 p-3">
                            <div class="d-flex">
                                <div className="center-img">
                                    <img className="img-fluid express_img" src={express} alt="Express Delivery"></img>
                                </div>
                                <div>
                                    <div className="express_info">หมายเลขติดตามพัสดุ {track_list.tracking_id}</div>
                                    <div className="express_info">จัดส่งโดย {track_list.carrier}</div>
                                    <div className="express_info">จัดส่งเมื่อ {moment(track_list.delivery_date).format("YYYY-MM-DD")}</div>
                                </div>
                            </div>

                        </div>
                    </a>
                ))}

                {this.state.tracking_list !== null && this.state.tracking_list.length <= 0 &&
                    <div className="alert alert-warning" role="alert">ไม่พบรายการพัสดุ</div>
                }

                <BackButton></BackButton>

            </div>
        )
    }
}

export default OrderTrack