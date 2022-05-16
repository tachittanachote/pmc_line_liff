import axios from "axios";
import moment from "moment";
import React, { Component } from "react";
import { BsClipboardCheck, BsCheckCircleFill } from "react-icons/bs";
import { getOrderStatus } from "../components/Functions";
import OrderDetailLabel from "../components/OrderDetailLabel";
import UserContext from "../context/UserContext";


import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import BackButton from "../components/BackButton";

class OrderTimeline extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            activities: null,
            order: null,
            product_images: null
        }
    }

    componentDidMount() {
        //fetch order activities
        axios.post('/orders/' + this.props.match.params.order_id + '/activities').then((res) => {
            this.setState({ activities: res.data })
        }).catch((err) => {
            console.log(err)
        })
        axios.post('/orders/' + this.props.match.params.order_id + '/detail', {
            line_id: this.context.user.userId
        }).then((res) => {
            this.setState({ order: res.data[0] }, () => {
                console.log(this.state.order)
            })

            axios.post('/product_images/', {
                product_code: res.data[0].product_code
            }).then((res) => {
                this.setState({ product_images: res.data })
            }).catch((err) => {
                console.log(err)
            })

        }).catch((err) => {
            console.log(err)
        })

        
    }

    renderProductImages() {
        return (
            <Splide className="mb-2" options={{
                arrows: this.state.product_images.length > 1 ? true : false,
            }}>

                {this.state.product_images.map((product, index) => (
                    <SplideSlide key={index}>
                        <img src={"https://order.phamaiintrend.co/storage/upload/" + product.image_url} alt={product.product_code} className="product__image" />
                    </SplideSlide>
                ))
                }
            </Splide>
        )
    }

    render() {
        return (
            <div className="container mb-4">
                <div className="light-top"></div>
                <div className="label-box mt-4 mb-4">
                    <div class="row">
                        <div className="col-8 h5">รายละเอียดสถานะสินค้า</div>
                        <div className="col-4 text-right"><BsClipboardCheck className="icons-white" size={30}></BsClipboardCheck></div>
                    </div>
                </div>

                {this.state.product_images !== null && this.state.product_images.length !== 0 && this.renderProductImages()}

                {this.state.order !== null ? 
                    <OrderDetailLabel class={this.state.order.status} status={getOrderStatus(this.state.order.status)} detail={this.state.order.detail}></OrderDetailLabel>
                :
                    <div>Loading</div>
                }
               

                <hr></hr>


                <div className="row">
                    <div className="col-6 timeline-text">
                        <div className="check-point"><BsCheckCircleFill size={18} className="icon-pending"></BsCheckCircleFill></div>
                        {this.state.activities !== null && this.state.activities.length > 0 &&
                            <div className="check-timeline-line-init"></div>
                        }
                        <div>อยู่ระหว่างรอดำเนินการ</div>
                    </div>
                </div>

                {this.state.activities !== null ? this.state.activities.map((act, index) => (
                    <div key={index} className={index === 0 ? "row mt-5" : "row mt-3"}>
                        <div className="col timeline-text">
                            <div className="check-point"><BsCheckCircleFill size={18} className={`icon-${act.status}`}></BsCheckCircleFill></div>
                            {index + 1 !== this.state.activities.length &&
                                <div className="check-timeline-line"></div>
                            }
                            <div className="label_status">{getOrderStatus(act.status) === "ตัดเสร็จแล้ว" ? `${getOrderStatus(act.status)} (รอเย็บ)` : getOrderStatus(act.status)}</div>
                            <div>ดำเนินการโดย: {act.employee}</div>
                            <div className="timestamp">เมื่อ {moment(act.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                    </div>
                ))
                :
                    <div>Loading ...</div>
                }

                <BackButton></BackButton>

            </div>
        )
    }
}

export default OrderTimeline