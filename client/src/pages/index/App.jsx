import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import TheHeader from './components/Header';
import TheFooter from './components/Footer';
import SearchTypeMenu from './components/SearchTypeMenu';
import Result from './components/Result';
import SearchWithURL from './components/SearchWithURL';
import NotFound from './components/NotFound';
import TopSongs from './components/TopSongs';
import MusicPlayer from './components/MusicPlayer';
import Hot from './components/Hot';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { searchStatus, searchResults, searchParameters } = this.props;
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/search" component={SearchWithURL} />
          </Switch>

          <Header style={{ position: 'fixed',
              width: '100%',
              zIndex: 1040,
              borderBottom: '1px solid #DBDBDB',
              padding: '12px 0',
            }}
          >
            <TheHeader />
          </Header>
          <Content>
            <div className="container"
              style={{
                marginTop: 65,
                marginBottom: 20,
                borderBottom: '1px solid #DBDBDB',
              }}
            >
              <Switch>
                <Route exact path="/" component={Hot}/>
                <Route path="/search" render={() => (
                  <>
                    {
                      searchStatus !== 'not_searched_yet' && <SearchTypeMenu />
                    }
                    {
                      searchParameters.type === 'song' && <TopSongs />
                    }
                    {
                      Object.keys(searchResults).map((key) => (
                        <Result
                          searchType={searchParameters.type}
                          result={searchResults[key]}
                          provider={key}
                          key={key} />
                      ))
                    }
                    <div className="loading-anim-wrapper">
                      {
                        searchStatus === 'searching' &&
                          <Icon type="loading"/>
                      }
                    </div>
                  </>
                )}/>
                <Route path="/*" render={NotFound}/>
              </Switch>
            </div>
          </Content>
          <Footer style={{ marginBottom: 80 }}>
            <TheFooter />
          </Footer>
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
    searchParameters: state.searchParameters
  };
}

export default connect(mapStateToProps)(App);
