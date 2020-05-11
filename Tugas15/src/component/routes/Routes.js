import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Genre from "../genres/Genre";
import Album from "../albums/Album";
import Artist from "../artists/Artist";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" >
                    <p>Home</p>
                    <p>This is Home Page</p>
                </Route>
                <Route path="/genres" render={() => <Genre />} />
                <Route path="/albums" render={() => <Album />} />
                <Route path="/artists" render={() => <Artist />} />
                <Route path="/songs" render={() => <p>songs Page</p>} />
            </Switch>
        )
    }
}

export default Routes;