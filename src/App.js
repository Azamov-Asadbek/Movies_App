import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Home from './components/home/Home';
import { MovieDetail } from './components/movieDetail/MovieDetail';

const App = () => {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  );
};

export default App;
