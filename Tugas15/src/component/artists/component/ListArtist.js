import React, { Component, Fragment } from 'react';
import * as Service from '../services/ArtistService'
import { FETCH_COMPLETE, SET_LOADING, EDIT_BUTTON } from '../reducers/Actions';
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { Table, Card, CardHeader, Spinner, Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";



class ListArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target: undefined,
            dialogOpen: false,
            dialogText: '',
            imgOpen: false,
            photo: ''
        }
    }
    loadData() {
        const { fetchData, fetchComplete } = this.props;
        fetchData();
        Service.getArtist()
            .then((artists) => {
                fetchComplete(artists);
            });
    }
    handleEdit = (artistId) => {
        const { handleEditButton, history } = this.props;
        handleEditButton(artistId);
        history.replace("/artists/form")
    }
    handleDelete = () => {
        // const { setLoading } = this.props;
        const { target } = this.state;
        this.setState({ dialogOpen: false });
        Service.deleteArtist(target)
            .then((isSuccess) => {
                if (isSuccess) this.loadData();
            });
    }

    confirmDelete = (target) => {
        this.setState({
            target, dialogOpen: true,
            dialogText: `Are you sure you want to delete ${target.name}?`
        });
    }
    showImage = (target, album) => {
        this.setState({
            target, imgOpen: true,
            dialogText: `Picture ${target.name}`
        });
    }
    componentDidMount() {
        const { fetchData, fetchComplete } = this.props;

        fetchData();

        Service.getArtist().then((artists) => {
            fetchComplete(artists);
        });
    }
    generatedTableRows() {
        const { artists, isLoading } = this.props;
        const { imgOpen } = this.state;
        let rows = <tr>
            <td colSpan="2" className="text-center"><Spinner color="primary" /></td>
        </tr>
        if (!isLoading) {
            rows = artists.map((artist, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{artist.name}</td>
                        <td>{artist.gender}</td>
                        <td>{artist.debutYear}</td>
                        <td>{artist.biography}</td>
                        <Modal isOpen={imgOpen} size="lg" centered={true}>
                            <ModalHeader toggle={imgOpen}>Artist Photo</ModalHeader>
                            <ModalBody><center><img src={`http://10.10.13.239:9090/artists/img/${artist.id}`} /> </center> </ModalBody>
                            <ModalFooter>
                                <Button type="button" color="secondary" onClick={() => this.setState({ target: undefined, dialogText: '', imgOpen: false })}>Close</Button>
                            </ModalFooter>
                        </Modal>
                        {/*<td><img src={`http://localhost:9090/artist/photos/${artist.id}`}alt="Example" width="193" height="130"/> </td>*/}
                        <td> <Button type="button" color="danger" onClick={() => this.showImage(artist.id)}> Image</Button></td>
                        <td>
                            <Button type="button" color="warning" onClick={() => this.handleEdit(artist.id)}>Edit</Button>
                        </td>
                        <td>
                            <Button type="button" color="danger" onClick={() => this.confirmDelete(artist)}> Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
        return rows;
    }
    render() {
        const { dialogOpen, dialogText, imgOpen } = this.state;
        return (
            <Fragment>
                <Card className="shadow">
                    <CardHeader tag='strong'>Artists
                        <Link to='/artists/form' className="float-right">
                            <Button type="button" color="light">New Artist </Button>
                        </Link>
                    </CardHeader>
                    <Table responsive striped hover className='m-0'>
                        <thead>
                            <tr>
                                <th width="5%">#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Debut Year</th>
                                <th>Biography</th>
                                <th>Photo</th>
                                <th colSpan="3" width="20%">Action</th>
                            </tr>
                        </thead>
                        <tbody>{this.generatedTableRows()}</tbody>
                    </Table>
                    <Modal isOpen={dialogOpen} size="sm" centered={true}>
                        <ModalHeader toggle={dialogOpen} tag='strong'>Delete Confirmation</ModalHeader>
                        <ModalBody>{dialogText}</ModalBody>
                        <ModalFooter>
                            <Button type="button" color="danger" onClick={this.handleDelete}>Confirm</Button>
                            <Button type="button" color="secondary" onClick={() => this.setState({ target: undefined, dialogText: '', dialogOpen: false })}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Card>
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    return { ...state }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch({ type: SET_LOADING }),
        fetchComplete: (payload) => dispatch({ type: FETCH_COMPLETE, payload }),
        handleEditButton: (payload) => dispatch({ type: EDIT_BUTTON, payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListArtist));