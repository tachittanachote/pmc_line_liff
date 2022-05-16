import React, { Component } from "react";
import linevertical from '../assets/images/logo-line.png'
import axios from "axios";
import $ from 'jquery';
import Swal from 'sweetalert2'

import { FiSave } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";

import UserContext from "../context/UserContext";
import BackButton from "../components/BackButton";

import liff from '@line/liff';

class Profile extends Component {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            users: null,
            customerSize: null
        }
    }

    componentDidMount() {

        liff.permission.query('chat_message.write').then(permissionStatus => {
            if (permissionStatus.state === 'prompt') {
                liff.permission.requestAll();
            }
        });

        this.getCustomerSize()
        axios.post('/users', {
            line_id: this.context.user.userId
        }).then((res) => {
            this.setState({ users: res.data[0] }, () => {
                console.log(this.state.users)
            })
        }).catch(err => {
            console.log(err)
        })
    }

    logout() {
        axios.post('/logout', {
            line_id: this.context.user.userId
        }).then((res) => {
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    saveProfile() {
        axios.post('/users/save', {
            line_id: this.context.user.userId,
            name: $("#name").val(),
            phone_number: $("#phone_number").val(),
            address: $("#address").val()
        }).then((res) => {
            if (res.data.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: 'ดำเนินการสำเร็จ',
                })
                if (!res.data.is_update_address) {
                    liff.sendMessages([
                        {
                            type: 'text',
                            text: `หมายเลขผู้ใช้งาน: PM000-${res.data.user.id} แจ้งอัพเดตปรับเปลี่ยนข้อมูลที่อยู่จาก ${res.data.old_address ? res.data.old_address : "ไม่มีที่อยู่"} เป็น ${res.data.new_address ? res.data.new_address : "ไม่มีที่อยู่"}`
                        }
                    ]).then(() => {
                        console.log('message sent');
                    })
                        .catch((err) => {
                            console.log('error', err);
                        });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'ไม่สามารถดำเนินการได้',
                })
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                text: 'ไม่สามารถดำเนินการได้',
            })
        })
    }

    updateSize() {

        var shirtSize = $("#shirt_shirt_size")
        var waistSize = $("#shirt_waist_size")
        var sarongwaistSize = $("#sarong_waist_size")
        var saronghipSize = $("#sarong_hip_size")
        var saronglongSize = $("#sarong_long_size")

        axios.post('/users/size/update', {
            line_id: this.context.user.userId,
            shirtSize: shirtSize.val(),
            waistSize: waistSize.val(),
            sarongwaistSize: sarongwaistSize.val(),
            saronghipSize: saronghipSize.val(),
            saronglongSize: saronglongSize.val(),
        }).then((res) => {
            if (res.data.status === "success") {
                Swal.fire({
                    icon: 'success',
                    text: 'ดำเนินการสำเร็จ',
                })
                liff.sendMessages([
                    {
                        type: 'text',
                        text: `หมายเลขผู้ใช้งาน: PM000-${res.data.user.id} แจ้งอัพเดตปรับเปลี่ยนข้อมูลไซส์`
                    }
                ])
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'ไม่สามารถดำเนินการได้',
                })
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                text: 'ไม่สามารถดำเนินการได้',
            })
        })
    }

    getCustomerSize() {
        axios.post('/users/size', {
            line_id: this.context.user.userId,
        }).then((res) => {
            this.setState({ customerSize: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {

        const { user } = this.context

        return (
            <div className="container mb-4">
                <div className="light-top"></div>
                <div class="text-center">
                    <img className="img-fluid padding-line-logo mr-8 mb-3 animate__animated animate__fadeIn" src={linevertical} />
                    <img className="img-fluid mt-4 animate__animated animate__fadeIn userImage mb-3" src={user.pictureUrl} />
                    <div className="h4 mt-2 animate__animated animate__fadeIn">ข้อมูลผู้ใช้งาน</div>
                </div>

                {this.state.users !== null ?
                    <>

                        <div class="form-group">
                            <label>Facebook</label>
                            <input type="text" class="form-control" value={this.state.users.facebook_name} id="facebook_name" readOnly />
                        </div>
                        <div class="form-group">
                            <label>ชื่อ - นามสกุล</label>
                            <input type="text" class="form-control" defaultValue={this.state.users.real_name} id="name" />
                        </div>
                        <div class="form-group">
                            <label>เบอร์โทรศัพท์</label>
                            <input type="text" class="form-control" defaultValue={this.state.users.phone_number} id="phone_number" />
                        </div>
                        <div class="form-group">
                            <label>ที่อยู่</label>
                            <textarea class="form-control" rows="4" id="address">
                                {this.state.users.address}
                            </textarea>
                        </div>


                        <button className="btn btn-danger w-100 mb-3" onClick={() => this.logout()}> ออกจากระบบ</button>

                        <button className="btn btn-secondary w-100 mb-2" data-toggle="modal" data-target="#staticBackdrop"><AiOutlineEdit></AiOutlineEdit> ปรับข้อมูลไซส์</button>
                        <button className="btn btn-primary w-100" onClick={() => this.saveProfile()}><FiSave></FiSave> บันทึกข้อมูล</button>

                        <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">รายละเอียดข้อมูลไซส์</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <label>ไซส์เสื้อ</label>
                                            <input type="text" class="form-control" id="shirt_shirt_size" defaultValue={this.state.customerSize === null ? "" : this.state.customerSize.length !== 0 && this.state.customerSize.shirt_shirt_size ? this.state.customerSize.shirt_shirt_size : ""}/>
                                        </div>
                                        <div class="form-group">
                                            <label>ไซส์เอวเสื้อ</label>
                                            <input type="text" class="form-control" id="shirt_waist_size" defaultValue={this.state.customerSize === null ? "" : this.state.customerSize.length !== 0 && this.state.customerSize.shirt_waist_size ? this.state.customerSize.shirt_waist_size : ""}/>
                                        </div>
                                        <hr />
                                        <div class="form-group">
                                            <label>ไซส์เอวผ้าถุง</label>
                                            <input type="text" class="form-control" id="sarong_waist_size" defaultValue={this.state.customerSize === null ? "" : this.state.customerSize.length !== 0 && this.state.customerSize.sarong_waist_size ? this.state.customerSize.sarong_waist_size : ""}/>
                                        </div>
                                        <div class="form-group">
                                            <label>ไซส์สะโพกผ้าถุง</label>
                                            <input type="text" class="form-control" id="sarong_hip_size" defaultValue={this.state.customerSize === null ? "" : this.state.customerSize.length !== 0 && this.state.customerSize.sarong_hip_size ? this.state.customerSize.sarong_hip_size : ""}/>
                                        </div>
                                        <div class="form-group">
                                            <label>ความยาวผ้าถุง</label>
                                            <input type="text" class="form-control" id="sarong_long_size" defaultValue={this.state.customerSize === null ? "" : this.state.customerSize.length !== 0 && this.state.customerSize.sarong_long_size ? this.state.customerSize.sarong_long_size : ""}/>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">ยกเลิก</button>
                                        <button type="button" class="btn btn-primary" onClick={() => this.updateSize()}>บันทึก</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </>
                    :

                    <div>Loading</div>

                }


                


                <BackButton></BackButton>


            </div>
        )
    }
}

export default Profile