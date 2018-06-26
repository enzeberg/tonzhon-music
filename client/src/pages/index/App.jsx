import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, LocaleProvider, Layout } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import T_Header from './components/Header';
import SearchTypeMenu from './components/SearchTypeMenu';
import Result from './components/Result';
import T_Footer from './components/Footer';
import { themeColor } from '../../config';
import SearchWithURL from './components/SearchWithURL';
import NotFound from './components/NotFound';
import TopSongs from './components/TopSongs';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor() {
    super();
  }

  render() {
    let { searchStatus, searchResults, searchParameters } = this.props;
    return (
      <BrowserRouter>
        <LocaleProvider locale={zh_CN}>
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
                  marginTop: 80, borderBottom: '1px solid #DBDBDB'
                }}
              >
                <Switch>
                  <Route exact path="/" render={() => (
                    <div>
                      <h3>在铜钟上，你可以：</h3>
                      <ul>
                        <li>播放QQ音乐、网易云音乐和虾米上面的歌曲</li>
                        <li>搜索歌曲、专辑和艺人，从而快速地知道自己想听的歌的原唱版本在哪个平台上</li>
                        <li>保存自己喜欢的歌曲</li>
                      </ul>
                      <p>更多带感新功能，敬请期待！</p>
                    </div>
                  )} />
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
            <Footer style={{ marginBottom: 70 }}>
              <T_Footer />
            </Footer>
            <MusicPlayer />
          </Layout>
        </LocaleProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
    searchParameters: state.searchParameters
  };
}
function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
