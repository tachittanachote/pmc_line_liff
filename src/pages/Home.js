import React, { Component } from "react";
import linevertical from '../assets/images/logo-line.png'
import cover from '../assets/images/cover.png'

import { AiOutlineInstagram } from "react-icons/ai";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiFacebookCircleFill, RiMailSendLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import UserContext from "../context/UserContext";

class Home extends Component {

    static contextType = UserContext;

    render() {

        const { user } = this.context
        
        console.log(user)

        return (
            <div className="container mb-4">
                <div className="light-top"></div>
                <div class="text-center">
                    <img className="img-fluid padding-line-logo mr-8 mb-3 animate__animated animate__fadeIn" src={linevertical} alt="Phamai Intrend" />
                    <img className="img-fluid" src={cover} alt="Phamai Intrend Cover"></img>
                </div>
                <div className="mt-3 mb-3">
                    <div className="font-weight-bold">สวัสดีคุณ {user.displayName}</div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <Link to="/promotions">
                        <div className="card">
                            <div className="card-body center-icon">
                                <BsFillBookmarkStarFill size={50} className="icons"></BsFillBookmarkStarFill>
                            </div>
                        </div>
                        </Link>
                        <div class="text-center mt-2 menu-title">โปรโมชั่น</div>
                    </div>
                    <div className="col-4">
                        <Link to="/orders">
                        <div className="card">
                            <div className="card-body center-icon">
                                <FiPackage size={50} className="icons"></FiPackage>
                            </div>
                        </div>
                        </Link>
                        <div class="text-center mt-2 menu-title">สถานะสินค้า</div>
                    </div>
                    <div className="col-4">
                        <Link to="/profile">
                        <div className="card">
                            <div className="card-body center-icon">
                                <BiUser size={50} className="icons"></BiUser>
                            </div>
                        </div>
                        </Link>
                        <div class="text-center mt-2 menu-title">ข้อมูลส่วนตัว</div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <a target="_blank" href="https://www.facebook.com/PhaMaiIntrend">
                        <div className="card">
                            <div className="card-body center-icon">
                                <RiFacebookCircleFill size={50} className="icons"></RiFacebookCircleFill>
                            </div>
                        </div>
                        </a>
                        <div class="text-center mt-2 menu-title">Facebook</div>
                    </div>
                    <div className="col-4">
                        <a target="_blank" href="https://www.instagram.com/">
                            <div className="card">
                                <div className="card-body center-icon">
                                    <AiOutlineInstagram size={50} className="icons"></AiOutlineInstagram>
                                </div>
                            </div>
                        </a>
                        <div class="text-center mt-2 menu-title">Instagram</div>
                    </div>
                    <div className="col-4">
                        <a href="tel:0888215969">
                            <div className="card">
                                <div className="card-body center-icon">
                                    <IoPhonePortraitOutline size={50} className="icons"></IoPhonePortraitOutline>
                                </div>
                            </div>
                        </a>
                        <div class="text-center mt-2 menu-title">ติดต่อเรา</div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <Link to="/order-track">
                        <div className="card">
                            <div className="card-body center-icon">
                                <RiMailSendLine size={50} className="icons"></RiMailSendLine>
                            </div>
                        </div>
                        </Link>
                        <div class="text-center mt-2 menu-title">หมายเลขติดตามพัสดุ</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Home