import axios from "axios";
import React, { Component } from "react";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import BackButton from "../components/BackButton";
import { getOrderStatus } from "../components/Functions";
import OrderDetailItem from "../components/OrderDetailItem";

import UserContext from "../context/UserContext";

class OrderList extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            order_id: this.props.match.params.order_id,
            order_list: null,
        }
    }

    componentDidMount() {
        //fetch order list by order id
        const order_id = this.state.order_id;
        axios.post('/orders/' + order_id, {
            line_id: this.context.user.userId
        }).then((res) => {
            this.setState({ order_list: res.data})
        } ).catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container mb-4">
                <div className="light-top"></div>
                <div className="label-box mt-4 mb-4">
                    <div class="row">
                        <div className="col-6">รายการสั่งซื้อ</div>
                        <div className="col-6 text-right"><MdOutlineFormatListBulleted className="icons-white" size={30}></MdOutlineFormatListBulleted></div>
                    </div>
                </div>

                {this.state.order_list !== null ? this.state.order_list.map((order, index) => (
                    <div key={index} onClick={() => this.props.history.push(`/orders/${order.id}/track`)}>
                        <OrderDetailItem detail={order.detail} status={getOrderStatus(order.status)} class={order.status}></OrderDetailItem>
                    </div>
                ))
                :
                    <div>Loading ...</div>
                }

                {this.state.order_list !== null && this.state.order_list.length <= 0 &&
                    <div className="alert alert-warning" role="alert">ไม่พบรายการสั่งซื้อสินค้า</div>
                }

                <BackButton></BackButton>

            </div>
        )
    }
}

export default OrderList