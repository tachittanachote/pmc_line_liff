import React, { Component } from "react";
import linevertical from '../assets/images/logo-line.png'
import check from '../assets/images/check.png'
import UserContext from "../context/UserContext";

class Welcome extends Component {

    static contextType = UserContext;
    
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/')
        }, 2000)
    }

    render() {

        const { user } = this.context

        return (
            <div className="container">
                <div className="light-top"></div>
                <div class="text-center">
                    <img className="img-fluid padding-line-logo mr-8 mb-3 animate__animated animate__fadeIn" src={linevertical} />
                    <img className="img-fluid mt-4 animate__animated animate__fadeIn" src={check}/>
                    <div className="label mt-3 animate__animated animate__fadeIn">ลงทะเบียนสำเร็จ</div>

                    <img className="img-fluid mt-4 animate__animated animate__fadeIn userImage" src={user.pictureUrl}/>

                    <div className="label mt-3 animate__animated animate__fadeIn">สวัสดีคุณ {user.displayName}</div>
                </div>
            </div>
        )
    }
}

export default Welcome