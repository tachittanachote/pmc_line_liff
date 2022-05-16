import React, { Component } from "react";

import load from '../assets/images/load.gif'

class PageLoad extends Component {
    render() {
        return (
            <div className="pageLoad animate__animated animate__fadeIn">
                <div className="pageBox">
                    <img src={load} className="img-max-load"></img>
                </div>
            </div>
        )
    }
}

export default PageLoad