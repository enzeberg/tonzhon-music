import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, ConfigProvider, Layout } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import T_Header from './components/Header';
import T_Footer from './components/Footer';
import SearchTypeMenu from './components/SearchTypeMenu';
import Result from './components/Result';
import { themeColor } from '../../config';
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
        <ConfigProvider locale={zh_CN}>
          <Layout>
            <Switch>
              <Route path="/search" component={SearchWithURL} />
            </Switch>

            <Header style={{ position: 'fixed', width: '100%', zIndex: 1040 }}>
              <T_Header />
            </Header>
            <Content>
              <div className="container"
                style={{
                  marginTop: 80,
                  marginBottom: 20,
                  borderBottom: '1px solid #DBDBDB',
                }}
              >
                <Switch>
                  <Route exact path="/" component={Hot}/>
                  <Route path="/search" render={() => (
                    <div>
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
                           <Icon type="loading" style={{fontSize: 30, color: themeColor}} />
                        }
                      </div>
                    </div>
                  )}/>
                  <Route path="/*" render={NotFound}/>
                </Switch>
              </div>
            </Content>
            <Footer style={{ marginBottom: 80 }}>
              <T_Footer />
            </Footer>
            <MusicPlayer />
          </Layout>
        </ConfigProvider>
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
