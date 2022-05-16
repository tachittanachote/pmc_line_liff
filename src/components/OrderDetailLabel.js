import React, { Component } from "react";

class OrderDetailLabel extends Component {
    render() {
        return (
            <div className="card mb-3">
                <div className={`card-header font-weight-bold ` + this.props.class}>
                    {this.props.status}
                </div>
                <div className="card-body p-3 content-body-text">
                    {this.props.detail}
                </div>
            </div>
        )
    }
}

export default OrderDetailLabel