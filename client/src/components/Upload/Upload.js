import React, { Component } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { merge } from 'lodash';
import sanitize from 'sanitize-html';
import './Upload.css';

const disallowAll = {
    allowedTags: [],
    allowedAttributes: {}
};



export default class Upload extends Component {
    

    state = {
        file: undefined,    // <file>
        err: '',            // <string>
        redirect: undefined // <string>
    }

    // @desc : handles poetry submission
    // @e    : <event>
    handleSubmit = (e) => {
        e.preventDefault();
        const { file } = this.state;
        const { store } = this.props;
        const { flash } = this;
        const reader = new FileReader();

        if(!file) {
            flash('Must select a file');
            return;
        }

        reader.onload = (e) => {
            const json_text = e.target.result;
            try {
                const json_data = Object.assign({}, JSON.parse(json_text));

                if(!json_data.title) {
                    flash('Your poem is missing a title');
                    return;
                }

                Object.keys(json_data)
                .forEach(key => {
                    json_data[key] = sanitize(json_data[key], disallowAll);
                });

                json_data.author = json_data.author;
                json_data.content = json_data.content;

                store.setItem(json_data['title'], json_data)
                .then(() => {
                    this.setState({redirect: json_data['title']});
                })
                .catch(console.error)
            } catch(err) {
                flash('Invalid file format, only JSON accepted');
                return;
            }
        }

        reader.readAsText(file);

    }

    // @desc : flash a messsage on the screen
    // @text : <string>
    flash = (text) => {
        this.setState({err: text});
    }

    // @desc : remove error from screen
    unflash = () => {
        this.setState({err: ''});
    }

    // @desc : on change event listener for file upload
    // @e    : <event>
    onFileChange = (e) => {
        this.setState({file: e.target.files[0]});
    }
    
    render() {
        const { handleSubmit, onFileChange } = this;
        const { err, redirect } = this.state;

        if(redirect) {
            return <Redirect to={`/view/${redirect}`} />
        }

        return (
            <Container>
                <h1>Upload you own art!</h1>
                <p>We only accept JSON files, so please format your poem accordingly.</p>
                { (err) ? <Alert variant='danger'>{err}</Alert> : undefined}
                <Card className='Upload-card'>
                    <Card.Img variant='top' src="/JSON_format.png" />
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.File id="file-input" label="Submit poetry here :)" onChange={onFileChange} />
                            </Form.Group>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </ Card.Body>
                </Card>
            </Container>
        )
    }
}