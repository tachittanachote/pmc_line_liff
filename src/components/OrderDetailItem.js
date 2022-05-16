import React, { Component } from "react";

import { IoIosArrowForward } from "react-icons/io";

class OrderDetailItem extends Component {
    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div>{this.props.detail}</div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <div class="status-label"><span class={`dot ${this.props.class}`}></span>{this.props.status}</div>
                            </div>
                            <div className="col-6 d-flex justify-content-end d-flex align-items-center">
                                <div class="detail-label">รายละเอียด <IoIosArrowForward className="icons-white" size={16}></IoIosArrowForward></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetailItem