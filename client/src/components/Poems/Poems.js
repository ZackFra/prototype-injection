import React, { Component } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { chunk } from 'lodash';
import './Poems.css';

export default class Poems extends Component {

    state = {
        poems: [], // <array> list of poem pages
        page: 1    // <number> page of titles we're on
    }

    // @desc : retrieves poems from indexedDB
    retrievePoems = async () => {
        const { store } = this.props;
        
        const poems = await store.keys()
        .then(titles => {
            const titleCards = titles.map(title => (
                <li key={title} className='Poems-li'>
                    <Card>
                        <Card.Title className='Poems-title'>
                            <Link to={`/view/${title}`}>{title}</Link>
                        </Card.Title>
                    </Card>
                </li>
            ))
            return chunk(titleCards, 10);
        });
        this.setState({poems: poems});
    }

    componentDidMount() {
        this.retrievePoems();
    }

    // @desc : look at prev poems
    prevPage = () => {
        const { page } = this.state;
        if(page > 1) {
            this.setState({page: page - 1});
        }
    }

    // @desc : look at next poems
    nextPage = () => {
        const { page, poems } = this.state;
        if(page < poems.length) {
            this.setState({page: page + 1});
        }
    }

    render() {
        const { poems, page } = this.state;
        const { prevPage, nextPage } = this;

        return (
            <Container>
                <h1>Poems: The Best of The Best!</h1>
                <button className='Poems-nav-btn' onClick={prevPage}>prev</button> | <button className='Poems-nav-btn' onClick={nextPage}>next</button>
                {poems ? poems[page-1] : undefined}
            </Container>
        )
    }
}