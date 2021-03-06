import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { Gradient } from 'react-gradient';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends Component {
  render() {
    // const gradients = [
    //   ['#bd19d6', '#ea7d10'],
    //   ['#ff2121', '#25c668'],
    // ];
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/" component={ Login } />
          <Route exact path="*" component={ NotFound } />
          {/* <Gradient
            gradients={ gradients } // required
            property="background"
            duration={ 3000 }
            angle="45deg"
          /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
