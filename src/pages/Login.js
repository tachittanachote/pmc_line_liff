
import React, { Component } from "react";
import $ from 'jquery'

import logo from '../assets/images/logo.png'
import axios from "axios";

import UserContext from "../context/UserContext";

class Login extends Component {

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {
            customer_id: null,
            customer_id_input: '#customer_id'
        }
    }

    handleLogin() {
        if (this.state.customer_id === null) {
            $(this.state.customer_id_input).addClass('is-invalid')
            return false;   
        } else {
            $(this.state.customer_id_input).removeClass('is-invalid')

            axios.post("/login", {
                line_id: this.context.user.userId,
                user_id: this.state.customer_id
            }).then((res) => {
                if(res.data.status !== "success") {
                    $(this.state.customer_id_input).removeClass('is-valid')
                    $(this.state.customer_id_input).addClass('is-invalid')

                    $("#result").css("display", 'block')
					$("#result").text(res.data.result)
                }
                else {
                    this.props.history.push('/welcome')
                }
            }).catch((err) => {
                console.log(err)
            })

        }
    }

    handleChange(data) {
        this.setState({ customer_id: data.target.value })
        // if (data.target.value.length === 10) {
        //     $(this.state.customer_id_input).addClass('is-valid')
        //     $(this.state.customer_id_input).removeClass('is-invalid')
        // }
    }

    render() {
        return (
            <div className="container mb-4">
                <div className="light-top"></div>
                <div className="content">
                    <div className="text-center"><img className="img-fluid logo-image" src={logo} alt="Phamai Intrend"></img></div>
                    <div className="text-center text-label custom-margin-bottom">กรอกหมายเลขไอดีลูกค้าของคุณ</div>
                    <input className="form-control mb-4" type="text" placeholder="หมายเลขไอดีลูกค้า" id="customer_id" onChange={(data) => this.handleChange(data)} autoComplete="1"></input>
                    <div className="text-center text-label custom-margin-bottom text-danger" id="result"></div>
                    <button className="btn btn-primary" onClick={() => this.handleLogin()}>ตกลง</button>
                </div>
            </div>
        )
    }
}

export default Login