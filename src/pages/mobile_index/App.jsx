import { connect } from 'react-redux';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TheHeader from './components/Header';
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import TopSongs from './components/TopSongs';
import Player from './components/Player';
import { themeColor } from '../../config';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';

const { Header, Content } = Layout;

function App() {
  let { searchStatus, searchResults } = this.props;
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === 'development' ? '/m' : '/'}
    >
      <Layout>
        <Header style={{ width: '100%', zIndex: 1040 }}>
          <TheHeader />
        </Header>
        <Content>
          <div
            style={{
              marginTop: 5,
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
                <>
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
                      <LoadingOutlined
                        style={{ fontSize: 30, color: themeColor }}
                      />
                    }
                  </div>
                </>
              )} />
            </Switch>
          </div>
        </Content>
        <Player />
      </Layout>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    searchStatus: state.searchStatus,
    searchResults: state.searchResults,
  };
}

export default connect(mapStateToProps)(App);