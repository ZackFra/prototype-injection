import React, { Component } from 'react';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
import Poems from './components/Poems/Poems';
import ViewPoem from './components/ViewPoem/ViewPoem';
import store from './store';
import poems from './base-poems';

export default class App extends Component {

  constructor(props) {
    super(props);
    for(const poem of poems) {
      store.setItem(poem.title, poem);
    }
  }

  render() {
    return (
      <Router>
        <NavBar />

        <Switch>
          <Route exact path={['/home', '/']}>
            <Home />
          </Route>
          <Route exact path='/upload'>
            <Upload store={store} />
          </Route>
          <Route exact path='/poems'>
            <Poems store={store} />
          </Route>
          <Route exact path='/view/:poemTitle'
            component={
              ({match}) => <ViewPoem match={match} store={store}/>
            }
          />
        </Switch>
      </Router>
    );
  }
}