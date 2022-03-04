import React, { Component } from 'react';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Header from './components/Header';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
class App extends Component {
  render() {
    return (
    <div>
    <Header />
    <div>
      <Routes>
        <Route path="/" element={<LinkList/>} />
        <Route
          path="/create"
          element={<CreateLink/>}
        />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  </div>
  );
  }
}

export default App;