import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ChatContextProvider from './context/chatContext';
import UserSelect from './components/UserSelect/UserSelect';
import ChannelSelect from './components/ChannelSelect/ChannelSelect';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import './App.css';

function App() {
  return (
    <ChatContextProvider>
      <BrowserRouter>
        <div className="page-title">
          <div className="row gutters">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <h5 className="title">1 day chat App</h5>
              <p>All messages will be deleted at every 00:00 UTC</p>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
          <div className="row gutters">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card m-0">
                <div className="row no-gutters">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
                    <div className="users-container">
                      <div className="form-group">
                        <UserSelect />
                      </div>
                      <ChannelSelect />
                    </div>
                  </div>
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="/chat/:channelId">
                      <Chat />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </ChatContextProvider>
  );
}

export default App;
