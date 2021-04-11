import React from 'react'
import App from './App'
import { Route, Switch, useLocation } from 'react-router-dom'
import About from './AboutPage'
import Home from './HomePage'
import Room from './RoomPage'
import Explore from './ExplorePage'
import './App.scss'

export default function RootRoute() {
  const location: any = useLocation();
  return (
    <App>
      <Switch location={location}>
        <Route path='/about' component={About} />
        <Route exact path='/' component={Home} />
        <Route path='/room/:id' component={Room} />
        <Route path='/explore' component={Explore} />
      </Switch>
    </App>
  )
}

