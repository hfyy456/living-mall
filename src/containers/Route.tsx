import React from 'react'
import App from './App'
import { Route, Switch, useLocation } from 'react-router-dom'
import Profile from './ProfilePage'
import Home from './HomePage'
import Room from './RoomPage'
import Good from './GoodPage'
import Login from './LoginPage'
import Payment from './PaymentPage'

import Explore from './ExplorePage'
import './App.scss'

export default function RootRoute() {
  const location: any = useLocation();
  return (
    <App>
      <Switch location={location}>
        <Route path='/profile/:id' component={Profile} />
        <Route exact path='/' component={Home} />
        <Route path='/room/:id' component={Room} />
        <Route path='/login' component={Login} />
        <Route path='/payment/:id' component={Payment} />
        <Route path='/explore' component={Explore} />
        <Route path='/good/:id' component={Good} />
      </Switch>
    </App>
  )
}

