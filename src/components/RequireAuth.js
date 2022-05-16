import React, { Component } from "react";
import liff from '@line/liff';
import axios from 'axios'
import PageLoad from "./PageLoad";

export default function RequireAuth(ComposedComponent) {
    class Authenticate extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                loadState: false
            }
        }

        componentDidMount() {
            this.authCheck()
        }

        componentWillUnmount() {
            this.authCheck()
        }

        authCheck() {
            liff.getProfile()
                .then(profile => {

                    const userId = profile.userId;

                    axios.post('/check', {
                        line_id: userId
                    }).then((res) => {
                        this.setState({
                            loadState: true,
                        }, () => {
                            if (res.data.status !== "success") {
                                return this.props.history.push('/login')
                            }
                        })
                        
                    }).catch((err) => {
                        console.log(err);
                    })
                })
                .catch((err) => {
                    console.log('error', err);
                });
        }
        render() {
            return (
            <>
                {!this.state.loadState ?
                    <PageLoad></PageLoad>
                    :
                    <ComposedComponent {...this.props} />
                }
            </>
            )
        }
    }

    return Authenticate;
}