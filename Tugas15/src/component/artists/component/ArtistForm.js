import React, { Component, Fragment } from "react";
import { Form, FormGroup, Col, Label, Input, Button, CardBody, Card, CardHeader, CustomInput } from "reactstrap"; 
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createArtist, updateArtist } from "../services/ArtistService";
import { SET_LOADING, SUBMIT_COMPLETE, HANDLE_INPUT, HANDLE_IMAGE} from "../reducers/Actions";


class ArtistForm extends Component{

        submitArtistData= async () =>{
            const { form, photo } = this.props;
            return await createArtist(form, photo);
        }
         
        

//isSubmiting akan berubah menjadi false ketika submit sudah komplit

    handleSubmit= (event) => {
        event.preventDefault();
        const { setLoading, submitComplete, history } = this.props;
        setLoading();
        this.submitArtistData()
        .then((data) => {
            submitComplete();
            history.replace('/artists');
        });
    }

    isValid = () => {
       const { form, isLoading } = this.props;
        return form.name.length > 0 || isLoading;        
    }

    optionYear(x, y) {
        let year = [];
        for (let i = x; i <= y; i++) {
            year.push(<option key={i} value={year[i]}>{i}</option>);
        }
        return year;
    }

    render(){
        const { form,isLoading, handleInputChange, handleImageUpload}  = this.props;
        return (
            <Fragment>
                <Card>
                    <CardHeader tag="form">Artists Form</CardHeader>
                    <CardBody>
               
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <FormGroup row>
                                <Label for ="name" sm="3">Artists Name</Label>
                                <Col sm="9">
                                    <Input type="text" id="name" name="name" value={form.name} placeholder="Artist Name" onChange={(event) => handleInputChange('name', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for ="name" sm="3">Gender</Label>
                                <Col sm="9">
                                    <Input type="text" id="gender" name="gender" value={form.gender} placeholder="Gender" onChange={(event) => handleInputChange('gender', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for ="name" sm="3">Biography</Label>
                                <Col sm="9">
                                    <Input type="textarea" id="biography" name="biography" value={form.biography} placeholder="Biography" onChange={(event) => handleInputChange('biography', event.target.value)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for ="name" sm="3">Debut Year</Label>
                                <Col sm="9">
                                <Input type="select" id="debutYear" name="debutYear" value={form.debutYear} onChange={(event) => handleInputChange('debutYear', event.target.value)}>
                                <option>Select Debut Year</option>
                                {this.optionYear(1990, 2020)}
                            </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for ="photo" sm="3">Artist Photo</Label>
                                <Col sm="9">
                                    <CustomInput type="file" label={form.photo} onChange={(event)=> handleImageUpload(event.target.files)} />
                                </Col>
                            </FormGroup>
                    
                            <FormGroup row>
                                <Col sm={{ size: 9, offset: 3}}>
                                    <Button type="submit" color="primary" disabled={!this.isValid()}>
                                        {!isLoading ? 'Save Artist' : 'Submiting Data...'}
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        </CardBody>
                </Card>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return { ...state };
    
}

function mapDispatchToProps(dispatch) {
    return{
        handleInputChange: (inputName, inputValue) => dispatch({type: HANDLE_INPUT, payload: {inputName, inputValue}}),
        setLoading: () => dispatch({type: SET_LOADING}),
        submitComplete: () => dispatch({type: SUBMIT_COMPLETE}),
        handleImageUpload: (payload) => dispatch({type: HANDLE_IMAGE, payload}),
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArtistForm));