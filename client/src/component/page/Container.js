import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from '../ui/Header'
import Footer from '../ui/Footer'
import Sidebar from '../ui/Sidebar'

import Home from './Home'
import Error from './Error'
import Add from './Add'
import Post from './Post'
import Nofication from './Nofication'

function Container(props) {
    return (
        <Router>
            <Header />
            <div className="App ssm:flex pt-12">
                <Sidebar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/add" component={Add} />
                    <Route path="/post/:id" component={Post} />
                    <Route path="/nofication" component={Nofication} />
                    <Route component={Error} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default Container;