import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { AdminScreen } from './Admin/AdminScreen.js';
import { HomeScreen } from './Home/HomeScreen.js';
import { VoteScreen } from './Vote/VoteScreen.js';
import { Navbar } from '../components/Navbar.js'

export const AppRouter = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container mt-4">
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/vote/:voteId" component={ VoteScreen } />
                    <Route exact path="/admin" component={ AdminScreen } />
                </Switch>
            </div>
        </Router>
    )
}