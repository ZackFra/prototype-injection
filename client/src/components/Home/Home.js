import React, { Component } from 'react';
import { Container, Image } from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <h1>Welcome to ArtLab!</h1>
                <p>ArtLab is a collection of poetry written by independent artists across the web.</p>
                <p>If you find yourself inspired by any of the poems you read here, feel free 
                    to submit your own!
                </p>
                <Image fluid src='/buddha-1910195_640.jpg' alt='buddha' />
            </Container>
        );
    }
}