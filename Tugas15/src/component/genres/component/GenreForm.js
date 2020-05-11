import React, { Component, Fragment } from 'react';
import { Input, Card, Col, Label, Form, CardHeader, FormGroup, CardBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'reactstrap/lib/Button';
import { INPUT_GENRE, SUBMIT_COMPLETE, SET_LOADING } from '../reducers/Actions';
import { createGenre, updateGenre } from '../services/GenreService';


class GenreForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmiting: false
        }
    }

    submitGenreData = async () => {
        const { form } = this.props;
        // return await createGenre(form)
        if (form.id) return await updateGenre(form);
        else return await createGenre(form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { setLoading, submitComplete, history } = this.props;
        this.setState({ isSubmiting: true });

        setLoading();
        this.submitGenreData().then((data) => {
            submitComplete();
            this.setState({ isSubmiting: false });
            history.replace('/genres');
        });
    }

    isValid = () => {
        const { form, isLoading } = this.props;
        console.log('IS VALID LOG: ', form.name.length > 0 && isLoading);

        return form.name.length > 0 || isLoading;
    }

    handleReturn = () => {
        const { history } = this.props;
        history.replace("/genres")
    }

    render() {
        const { form, isLoading, handleInputChanges } = this.props
        return (
            <Fragment>
                <Card>
                    <CardHeader tag="form">Genre Form</CardHeader>
                    <CardBody>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup row>
                                <Label for="name" sm="3">Genre Name</Label>
                                <Col sm="9">
                                    <Input type="text" id="name" name="name" value={form.name} placeholder="Genre Name" onChange={(event) => handleInputChanges('name', event.target.value)} />
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
    return { ...state }
}

function mapDispatchToProps(dispatch) {
    return {
        handleInputChanges: (inputName, inputValue) => dispatch({ type: INPUT_GENRE, payload: { inputName, inputValue } }),
        setLoading: () => dispatch({ type: SET_LOADING }),
        submitComplete: () => dispatch({ type: SUBMIT_COMPLETE }),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GenreForm));