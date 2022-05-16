import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class BackButton extends Component {

    handleBack() {
        this.props.history.goBack()
    }

    render() {
        return (
            <div className="back__button btn btn-info w-100" onClick={() => this.handleBack()}>
                ย้อนกลับ
            </div>
        )
    }

}

export default withRouter(BackButton)