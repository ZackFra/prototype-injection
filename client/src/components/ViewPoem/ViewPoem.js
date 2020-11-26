import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import './ViewPoem.css';

export default class ViewPoem extends Component {

    state = {
        poem: undefined // <object> poem object 
    }

    componentDidMount() {
        const { store, match } = this.props;
        const { params } = match;
        const { poemTitle } = params;

        store.getItem(poemTitle)
        .then(poem => {
            poem.content = 
                poem.content
                .split('\n')
                .map(chunk => <Card.Text key={uuid()} dangerouslySetInnerHTML={{__html: chunk}} />);

            this.setState({poem: poem});
        })
        .catch(console.error);
    }

    render() {
        const { poem } = this.state;
        
        if(!poem) return <div></div>

        return ( 
            <Container>
                <Card className='ViewPoem-card'>
                    <Card.Title className='ViewPoem-title'>
                        <h1>{poem.title}</h1>
                    </Card.Title>
                    <Card.Body>
                        <Card.Text>{poem.author}</Card.Text>
                        {poem.content}
                    </Card.Body>
                </Card>

            </Container>
        )
    }
}