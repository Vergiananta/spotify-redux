import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Row, Col } from 'reactstrap';
import albumReducer from './reducers/AlbumReducer';
import { Route } from 'react-router-dom';
import ListAlbum from './component/ListAlbum';
import AlbumForm from './component/AlbumForm';


const albumStore = createStore(albumReducer);
class Album extends Component {
    render() {
        return (
            <Provider store={albumStore}>
                <Row>
                    <Col>
                        <Route exact path="/albums" render={() => <ListAlbum />} />
                        <Route path="/albums/form" render={() => <AlbumForm />} />
                    </Col>
                </Row>
            </Provider>
        )
    }
}

export default Album;