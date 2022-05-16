import React, { Component } from "react";
import { FiPackage } from "react-icons/fi";
import OrderItem from "../components/OrderItem";
import axios from "axios";
import moment from "moment"
import UserContext from "../context/UserContext";
import BackButton from "../components/BackButton";

class Orders extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            orders: null
        }
    }

    componentDidMount() {
        axios.post('/orders', {
            line_id: this.context.user.userId
        }).then((res) => {
            this.setState({ orders: res.data})
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container mb-4">
                <div className="light-top"></div>
                <div className="label-box mt-4 mb-4">
                    <div class="row">
                        <div className="col-6">สถานะสินค้า</div>
                        <div className="col-6 text-right"><FiPackage className="icons-white" size={30}></FiPackage></div>
                    </div>
                </div>

                {this.state.orders !== null ? this.state.orders.map((value, index) => (
                    <div onClick={() => this.props.history.push(`/orders/${value.order_number}`)}>
                        <OrderItem orderId={value.order_number} created_at={moment(value.created_at).format("YYYY-MM-DD HH:mm:ss")}></OrderItem>
                    </div>
                ))
                    :
                    <div>Loading ...</div>
                }

                {this.state.orders !== null && this.state.orders.length <= 0 &&
                    <div className="alert alert-warning" role="alert">ไม่พบรายการสั่งซื้อสินค้า</div>
                }

                <BackButton></BackButton>

            </div>
        )
    }
}

export default Orders