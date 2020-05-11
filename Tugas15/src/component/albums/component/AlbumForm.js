import React, { Component, Fragment } from 'react';
import { Input, Card, Col, Label, Form, CardHeader, FormGroup, CardBody, CustomInput } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { createAlbum, updateAlbum } from '../services/AlbumService';
import { INPUT_ALBUM, SET_LOADING, SUBMIT_ALBUM, IMAGE_ALBUM } from '../reducers/Actions';
import * as Service from '../services/AlbumService'


class AlbumForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,

        }
    }

    submitArtistData = async () => {
        const { form, image } = this.props;
        return await createAlbum(form, image);
    }



    //isSubmiting akan berubah menjadi false ketika submit sudah komplit

    handleSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete, history } = this.props;
        setLoading();
        this.submitArtistData()
            .then((data) => {
                submitComplete();
                history.replace('/albums');
            });
    }

    isValid = () => {
        const { form, isLoading } = this.props;
        const forms = form.title.length > 0 && form.description.length > 0 && form.releaseYear.length > 0 && form.discount.length > 0;
        return forms || isLoading;
    }

    optionYear(x, y) {
        let year = [];
        for (let i = x; i <= y; i++) {
            year.push(<option key={i} value={year[i]}>{i}</option>);
        }
        return year;
    }

    handleReturn = () => {
        const { history } = this.props;
        history.replace("/albums");
    }

    render() {
        const { form, isLoading, handleInputChanges, handleImageButton } = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag="form">Album Form</CardHeader>
                    <CardBody>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup row>
                                <Label for="title" sm="3">Album Name</Label>
                                <Col sm="9">
                                    <Input type="text" id="title" name="title" value={form.title} placeholder="Enter Album Name" onChange={(event) => handleInputChanges('title', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="description" sm="3">Description</Label>
                                <Col sm="9">
                                    <Input type="text" id="description" name="description" value={form.description} placeholder="Enter Album Description" onChange={(event) => handleInputChanges('description', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="releaseYear" sm="3">Release Year</Label>
                                <Col sm="9">
                                    <Input type="select" id="releaseYear" name="releaseYear" value={form.releaseYear} onChange={(event) =>
                                        handleInputChanges('releaseYear', event.target.value)}>
                                        <option default >--select year--</option>
                                        {this.optionYear(1950, 2020)}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="discount" sm="3">Discount</Label>
                                <Col sm="9">
                                    <Input type="text" id="discount" name="discount" value={form.discount} placeholder="Enter Album Discount" onChange={(event) => handleInputChanges('discount', event.target.value)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="image" sm="3">Image</Label>
                                <Col sm="9">
                                    <CustomInput type="file" accept="image/png, image/jpeg, image/jpg" label={form.image} onChange={(event) => handleImageButton(event.target.files)} />
                                    {/* <Input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.handleImage} /> */}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3 }}>
                                    <Button type="submit" color="primary" disabled={!this.isValid()}>

                                        {!isLoading ? 'Save Genre' : 'Submiting Data...'}
                                    </Button>

                                    <Button type="button" color="secondary" onClick={this.handleReturn}>
                                        Return
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return { ...state };
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChanges: (inputName, inputValue) => dispatch({ type: INPUT_ALBUM, payload: { inputName, inputValue } }),
        setLoading: () => dispatch({ type: SET_LOADING }),
        submitComplete: () => dispatch({ type: SUBMIT_ALBUM }),
        handleImageButton: (payload) => dispatch({ type: IMAGE_ALBUM, payload }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AlbumForm));
