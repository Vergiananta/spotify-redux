import React, { Component } from 'react';
import { Container } from 'reactstrap';
import TwoColumnsLayout from './layout/TwoColumnsLayout';
import { BrowserRouter as Router } from "react-router-dom";

class App extends Component{
    render(){

        return(
            <Container fluid>
                <Router>
                <TwoColumnsLayout />
                </Router>
            </Container>
        );
    }
}

export default App;