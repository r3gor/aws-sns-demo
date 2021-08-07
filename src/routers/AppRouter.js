import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { AdminScreen } from '../components/AdminScreen';
import { HomeScreen } from '../components/HomeScreen';
import { Navbar } from '../components/Navbar.js'
import { VoteScreen } from '../components/VoteScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container m-3">
                <Switch>
                    <Route exact path="/" component={HomeScreen} />
                    <Route exact path="/vote/:voteId" component={ VoteScreen } />
                    <Route exact path="/admin" component={ AdminScreen } />
                </Switch>
            </div>
        </Router>
    )
}