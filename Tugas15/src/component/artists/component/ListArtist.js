import React, { Component } from 'react';
import { Card, Table, CardHeader, Spinner, Button, Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as Service from "../services/ArtistService";
import { SET_LOADING, FETCH_COMPLETE, EDIT_BUTTON } from "../reducers/Actions";



class ListArtist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            target: undefined,
            dialogOpen: false,
            dialogText: '',
            imgOpen: false,
            photo: '',
        }
    }

    loadData() {
        const { fetchData, fetchComplete } = this.props;

        fetchData();

        Service.getArtist().then((artists) => {
            fetchComplete(artists);
        });
    }

    // handleDelete = () => {
    //     // const { setLoading } = this.props;
    //     const { target } = this.state;
    //     this.setState({dialogOpen: false});
    //     Service.deleteGenre(target)
    //         .then((isSuccess)=>{
    //             if(isSuccess) this.loadData();
    //         });
    // }

    // confirmDelete = (target) => {
    //     this.setState({
    //         target, dialogOpen: true,
    //         dialogText: `Are you sure you want to delete ${target.id}?`
    //     });
    // }



    handleDelete = (id) => {
        Service.deleteArtist(id)
            .then((isSuccess) => {
                if (!isSuccess) this.loadData();
            });
    }

    handleEdit = (artistId) => {
        const { handleEditButton, history } = this.props;
        handleEditButton(artistId);
        history.replace("/artists/form")
    }

    showImage = (target, artist) => {
        this.setState({
            target, imgOpen: true,
            dialogText: `Picture ${target.name}`
        });
    }

    componentDidMount() {

        this.loadData();
    }

    generateTableRows() {
        const { artists, isLoading } = this.props;
        const { imgOpen } = this.props;
        let rows = <tr><td colSpan="2" className="text-center"> <Spinner type="grow" color="primary" /></td></tr>

        if (!isLoading) {
            rows = artists.map((artist, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{artist.name}</td>
                        <td>{artist.debutYear}</td>
                        <td>{artist.gender}</td>
                        <td>{artist.biography}</td>
                        <img width="40%" src={`http://10.10.13.239:9090/albums/img/${artist.id}`}></img>
                        {/* <Modal isOpen={imgOpen} size="lg" centered={true}>
                             <ModalHeader toggle={imgOpen}>Album Photo</ModalHeader>
                             <ModalBody><center><img src={`http://10.10.13.245:9090/artists/img/${artist.id}`} /> </center> </ModalBody>
                             <ModalFooter>
                                 <Button type="button" color="secondary" onClick={() => this.setState({ target: undefined, dialogText: '', imgOpen: false })}>Close</Button>
                             </ModalFooter>
                          </Modal>
                          {/*<td><img src={`http://localhost:9090/artist/photos/${artist.id}`}alt="Example" width="193" height="130"/> </td>*/}
                        {/* <td> <Button type="button" color="danger" onClick={() => this.showImage(artist.id)}> Image</Button></td>  */}
                        <td>
                            <Button type="submit" color="warning" size="sm" onClick={() => this.handleEdit(artist.id)}>Edit</Button>
                        </td>
                        {/* <td colSpan="2" className="text-center"> <Button type="submit" color="danger" size="sm" onClick={this.confirmDelete()}>>Delete</Button></td>  */}

                        <td>
                            <Button type="submit" color="danger" size="sm" onClick={() => { if (window.confirm('Are You Sure Want to Delete?')) this.handleDelete(artist.id) }}>Delete</Button>
                        </td>
                    </tr>



                );
            });
        }

        return rows;
    }

    render() {
        const { artists, isLoading } = this.props;
        const { dialogOpen, dialogText } = this.props;
        return (
            <Card className="shadow">

                <CardHeader tag="strong">
                    Artists
                <Link to="/artists/form"><Button className="float-right" size="sm" color="primary">Add Artists</Button></Link>
                </CardHeader>

                <Table responsive striped hover className="m-0">
                    <thead>
                        <tr>
                            <th>
                                #
            </th>
                            <th>
                                Name
            </th>
                            <th>
                                Gender
            </th>
                            <th>
                                Biography
            </th>
                            <th>
                                Debut Year
            </th>
                            <th>
                                Photo
            </th>
                            <th colSpan="2" width="10%">
                                Actions
            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateTableRows()}
                    </tbody>
                </Table>
                {/* <Modal isOpen={dialogOpen} size="sm" centered>
            <ModalHeader toggle={dialogOpen} tag="strong">Delete Confimations</ModalHeader>
            <ModalBody>{dialogText}</ModalBody>
            <ModalFooter>
                <Button type="button" color="danger" onClick={this.handleDelete}>Confirm</Button>
                <Button type="button" color="secondary" onClick={() => this.setState({ target: undefined, dialogText: '', dialogOpen: false })}>Cancel</Button>
            </ModalFooter>
        </Modal> */}
            </Card>
        );
    }

}

function mapStateToProps(state) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch({ type: SET_LOADING }),
        fetchComplete: (payload) => dispatch({ type: FETCH_COMPLETE, payload }),
        handleEditButton: (payload) => dispatch({ type: EDIT_BUTTON, payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListArtist));