import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import T_Header from './components/Header';
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import SearchWithURL from './components/SearchWithURL';
import NotFound from './components/NotFound';
import TopSongs from './components/TopSongs';
import MusicPlayer from './components/MusicPlayer';
import './App.css';
import { themeColor } from '../../config';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { searchStatus, searchResults } = this.props;
    return (
      <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/m' : '/'}>
        <Layout>
          <Switch>
            <Route path="/search" component={SearchWithURL} />
          </Switch>

          <Header style={{ position: 'fixed', width: '100%', zIndex: 1040 }}>
            <T_Header />
          </Header>
          <Content>
            <div
              style={{
                marginTop: 50,
                padding: '10px 2px 0',
                marginBottom: 80,
              }}
            >
              <div style={{ marginBottom: 10 }}>
                <SearchBar />
              </div>
              <Switch>
                <Route exact path="/" />
                <Route path="/search" render={() => (
                  <div>
                    <TopSongs />
                    {
                      Object.keys(searchResults).map((key) => (
                        <Result
                          result={searchResults[key]}
                          provider={key}
                          key={key} />
                      ))
                    }
                    <div className="loading-anim-wrapper">
                      {
                        searchStatus === 'searching' &&
                          <Icon type="loading" style={{fontSize: 30, color: themeColor}} />
                      }
                    </div>
                  </div>
                )}/>
                <Route path="/*" render={NotFound}/>
              </Switch>
            </div>
          </Content>
          <MusicPlayer />
        </Layout>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps)(App);
