import React, { Component } from "react";

import { IoIosArrowForward } from "react-icons/io";

class OrderItem extends Component {

    render() {
        return (
            <div className="card mb-3 p-3">
                <div className="row">
                    <div className="col-6">
                        <div className="order-label font-weight-bold">ออเดอร์ #{this.props.orderId}</div>
                        <div className="order-time">{this.props.created_at}</div>
                    </div>
                    <div className="col-6 d-flex justify-content-end d-flex align-items-center">
                        <IoIosArrowForward className="icons" size={26}></IoIosArrowForward>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default OrderItem