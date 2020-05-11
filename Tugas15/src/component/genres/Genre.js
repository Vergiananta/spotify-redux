import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Row, Col } from "reactstrap";
import genreReducer from "./reducers/GenreReducer";
import ListGenre from "./component/ListGenre";
import GenreForm from "./component/GenreForm";
import { Route } from 'react-router-dom';

const genreStore = createStore(genreReducer);
class Genre extends Component {
    render() {

        return (
            <Provider store={genreStore}>
                <Row>
                    <Col>
                        <Route exact path="/genres" render={() => <ListGenre />} />
                        <Route path="/genres/form" render={() => <GenreForm />} />
                    </Col>
                </Row>
            </Provider>
        )
    }
}

export default Genre;