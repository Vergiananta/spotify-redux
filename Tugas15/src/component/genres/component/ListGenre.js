import React, { Component, Fragment } from "react";
import { Table, Card, CardHeader, Spinner, Button } from "reactstrap";
import { FETCH_COMPLETE, SET_LOADING, EDIT_BUTTON } from "../reducers/Actions";
import * as Service from "../services/GenreService";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

class ListGenre extends Component {
    constructor(props) {
        super(props);

        this.state = {
            target: undefined,
            dialogOpen: false,
            dialogText: '',
        };
    }

    loadData() {
        const { fetchData, fetchComplete } = this.props;

        fetchData();

        Service.getGenres().then((genres) => {
            fetchComplete(genres);
        });
    }

    handleEdit = (genreId) => {
        const { handleEditButton, history } = this.props;
        handleEditButton(genreId);
        history.replace("/genres/form")
    }

    handleDelete = () => {
        const { target } = this.state;
        this.setState({ dialogOpen: false })
        Service.deleteGenre(target).then((isSuccess) => {
            if (isSuccess) this.loadData();
        });
    }

    confirmDelete = (target) => {
        this.setState({
            target, dialogOpen: true,
            dialogText: `Are you sure you want to delete genre ${target.name}?`
        });
    }


    componentDidMount() {
        const { fetchData, fetchComplete } = this.props;

        fetchData();

        Service.getGenres().then((genres) => {
            fetchComplete(genres);
        });

    }

    generateTableRows() {
        const { genres } = this.props;
        let rows = <tr><td colSpan="2" className="text-center"> <Spinner type="grow" color="primary" /></td></tr>

        if (!this.props.isLoading) {
            rows = genres.map((genre, index) => {
                return (
                    <tr key={index}>
                        <td>{genre.id}</td>
                        <td>{genre.name}</td>
                        <td>
                            <Button type="button"
                                color="warning" size="sm"
                                className="shadow"
                                onClick={() => this.handleEdit(genre.id)}>
                                Edit
                            </Button>
                            <Button type="button" color="danger" size="sm" onClick={() => this.confirmDelete(genre)}>
                                Delete
                            </Button>
                            {/* <Button type="button"
                                color="danger" size="sm"
                                className="shadow" onClick={() => this.handleDelete(genre.id)}>
                                Delete
                                </Button> */}
                        </td>

                    </tr>
                )
            });

        }

        return rows;

    }

    render() {
        const { dialogOpen, dialogText } = this.state;

        return (
            <Fragment>
                <Card className="shadow">
                    <CardHeader tag="strong">Genres
                <Link to="/genres/form"><Button className="float-right" size="sm" color="primary"> New Genre</Button></Link>>
                </CardHeader>

                    <Table responsive striped hover className="m-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th colSpan="2" width="15%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateTableRows()}
                        </tbody>
                    </Table>
                </Card>
                <Modal isOpen={dialogOpen} size="sm" centered>
                    <ModalHeader toggle={dialogOpen} tag="strong"> Delete Confirmation</ModalHeader>
                    <ModalBody>{dialogText}</ModalBody>
                    <ModalFooter>
                        <Button type="button" color="danger" onClick={this.handleDelete}>Confirm</Button>
                        <Button type="button" color="danger" onClick={() => this.setState({ target: undefined, dialogText: '', dialogOpen: false })}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListGenre));