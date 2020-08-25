import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TheHeader from './components/Header';
// import TheFooter from './components/Footer';
import SearchResult from './components/SearchResult';
import SearchWithURL from './components/SearchWithURL';
import NotFound from './components/NotFound';
import TopSongs from './components/TopSongs';
import Player from './components/Player';
import Hot from './components/Hot';
import NeteasePlaylistPage from './components/NeteasePlaylistPage';
import './App.css';

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { searchStatus, searchResults } = this.props;
    return (
      <BrowserRouter>
        <Layout
          style={{
            backgroundColor: '#f7f7f7',
          }}
        >
          <Switch>
            <Route path="/search" component={SearchWithURL} />
          </Switch>

          <Header
            style={{
              position: 'fixed',
              width: '100%',
              zIndex: 1040,
              // borderBottom: '1px solid #DBDBDB',
              padding: '8px 0',
              boxShadow: '0 1px 3px rgba(26,26,26,.1)',
            }}
          >
            <TheHeader />
          </Header>

          <Content>
            <div className="container"
              style={{
                marginTop: 59,
                marginBottom: 74,
                minHeight: 800,
              }}
            >
              <Switch>
                <Route exact path="/" component={Hot} />
                <Route path="/search"
                  render={
                    () => {
                      const filtered = Object.keys(searchResults)
                                        .filter(key => {
                                          const result = searchResults[key];
                                          return result.searchSuccess &&
                                            result.data.totalCount > 0;
                                        });
                      return (
                        <>
                          <TopSongs />
                          {
                            filtered.map((key) => (
                              <SearchResult
                                result={searchResults[key]}
                                provider={key}
                                key={key}
                              />
                            ))
                          }
                          {
                            filtered.length === 0 && searchStatus === 'done' &&
                            <div className="white-card">
                              抱歉，未搜索到相关内容。
                            </div>
                          }
                          {
                            searchStatus === 'searching' &&
                            <LoadingOutlined />
                          }
                        </>
                      );
                    }
                  }
                />
                <Route path="/netease-playlist/:playlistId"
                  component={NeteasePlaylistPage}
                />
                <Route path="/*" render={NotFound} />
              </Switch>
            </div>
          </Content>
          {/* <Footer style={{ marginBottom: 80 }}>
            <TheFooter />
          </Footer> */}
          <Player />
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