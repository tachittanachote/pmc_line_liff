import React, { Component } from "react";
import axios from 'axios'
import BackButton from "../components/BackButton";

class Promotions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            promotions: null
        }
    }

    componentDidMount() {
        axios.post('/promotions').then((res) => {
            this.setState({ promotions: res.data}, () => {
                console.log(this.state.promotions)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container mb-4">
                <div className="light-top"></div>

                <div className="pt-4 mb-3 h5">Promotions - โปรโมชั่นพิเศษ</div>

                {this.state.promotions !== null && this.state.promotions.map((promotion, index) => (
                    <a href={promotion.link ? promotion.link : "#"}>
                    <div class="card mb-3">
                        <img className="img-fluid" src={`https://order.phamaiintrend.co/storage/upload/${ promotion.image_url}`} alt="Promotion"></img>
                        <div className="p-3">{promotion.detail}</div>
                    </div>
                    </a>
                ))}

                {this.state.promotions !== null && this.state.promotions.length <= 0 &&
                    <div className="alert alert-warning" role="alert">ไม่พบรายการโปรโมชั่น</div>
                }

                <BackButton></BackButton>

            </div>
        )
    }
}

export default Promotions