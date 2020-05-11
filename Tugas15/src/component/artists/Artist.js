import React, { Component} from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Row, Col } from "reactstrap";
import { Route } from "react-router-dom";
import artistReducer from "./reducers/ArtistReducer";
import ListArtist from "./component/ListArtist";
import ArtistsForm from "./component/ArtistForm";

const artistStore = createStore(artistReducer);
class Artist extends Component{



render(){
    
    return(
        <Provider store={artistStore}>
            <Row>
                <Col>
                    <Route exact path="/artists" render={() => <ListArtist />} />
                    <Route path="/artists/form" render={() => <ArtistsForm />} />
                </Col>
            </Row>
        </Provider>
    )
}
}

export default Artist;