import React, { Component } from 'react'
import axios from 'axios'
import liff from '@line/liff';
import PageLoad from '../components/PageLoad';

import { withRouter } from 'react-router-dom';

const UserContext = React.createContext()

class UserContextProvider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loadState: false,
        }
    }

    componentDidMount() {
        liff
            .init({
                liffId: "1656853914-9PxOOqpy" // Use own liffId
            })
            .then(() => {
                if (!liff.isLoggedIn()) {
                    liff.login()
                }
                liff.getProfile()
                    .then(profile => {
                        

                        liff.permission.query('chat_message.write').then(permissionStatus => {
                            if (permissionStatus.state === 'prompt') {
                                liff.permission.requestAll();
                            }
                        });

                        const userId = profile.userId;

                        axios.post('/check', {
                            line_id: userId
                        }).then((res) => {
                            if(res.data.status === "success") {
                                this.setState({ user: profile, loadState: true }, () => {
                                    return this.props.history.push('/')
                                })
                            } else {
                                this.setState({ user: profile, loadState: true }, () => {
                                    return this.props.history.push('/login')
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })

                        

                        
                    })
                    .catch((err) => {
                        liff.logout()
                        liff.login()
                        console.log('error', err);
                    });
            })
            .catch((err) => {
                // Error happens during initialization
                console.log(err.code, err.message);
            });
    }

    render() {
        return (
            <>
                {!this.state.loadState ?
                    <PageLoad></PageLoad>
                :
                    <UserContext.Provider value={{ user: this.state.user }}>
                        {this.props.children}
                    </UserContext.Provider>
                }
            </>
        )
    }
}

export default UserContext

const UserProvider = withRouter(UserContextProvider)
export { UserProvider }