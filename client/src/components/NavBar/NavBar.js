import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { AiOutlineMenu } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import './NavBar.css';


export default class NavBar extends Component {
    state = {
        hover: false // <bool>
    }

    // @desc : toggles menu slide
    toggleMenu = () => {
        const { hover } = this.state;
        this.setState({hover: !hover});
    }

    render() {
        const { hover } = this.state;
        const { toggleMenu } = this;

        return (
            <div>
                <button onClick={toggleMenu} className='NavBar-menu-btn'>
                    <IconContext.Provider value = {{ className: 'NavBar-menu-outline' }}>
                        <AiOutlineMenu />
                    </IconContext.Provider>
                </button>
                <CSSTransition
                    classNames='NavBar-wrapper'
                    in={hover}
                    timeout={400}
                >
                    <div className='NavBar-wrapper'>
                        <ul className='NavBar-links'>
                            <li className='NavBar-link'><Link className='NavBar-a' to='/home'>Home</Link></li>
                            <li className='NavBar-link'><Link className='NavBar-a' to='/poems'>Poems</Link></li>
                            <li className='NavBar-link'><Link className='NavBar-a' to='/upload'>Upload</Link></li>
                        </ul>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}