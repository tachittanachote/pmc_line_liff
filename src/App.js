import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import OrderList from './pages/OrderList';
import Orders from './pages/Orders';
import OrderTimeline from './pages/OrderTimeline';
import Profile from './pages/Profile';
import Promotions from './pages/Promotions';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import OrderTrack from './pages/OrderTrack';
import RequireAuth from './components/RequireAuth';

class App extends Component {
  render() {

    return (
      
        <Router>
            <UserProvider>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={RequireAuth(Home)} />
                <Route exact path="/promotions" component={RequireAuth(Promotions)} />
                <Route exact path="/orders" component={RequireAuth(Orders)} />
                <Route exact path="/orders/:order_id" component={RequireAuth(OrderList)} />
                <Route exact path="/orders/:order_id/track" component={RequireAuth(OrderTimeline)} />
                <Route exact path="/profile" component={RequireAuth(Profile)} />
                <Route exact path="/welcome" component={RequireAuth(Welcome)} />
                <Route exact path="/order-track" component={RequireAuth(OrderTrack)} />
              </Switch>
          </UserProvider>
        </Router>
      
    )
  }
}

export default App;