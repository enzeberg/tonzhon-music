import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);
const { providers,  searchParameters } = store.getState();
let lastKeyword = searchParameters.keyword,
    lastType = searchParameters.type;

store.subscribe(() => {
  const { searchParameters } = store.getState();
  const { keyword, type } = searchParameters;
  if (lastKeyword !== keyword || lastType !== type) {
    // 更新lastKeyword,lastType必须放在包含dispatch方法的函数前面，否则会造成无限递归
    lastKeyword = keyword;
    lastType = type;
    updateSearchHistory(keyword);
    onSearch();
    let resultsResponded = 0;
    providers.forEach((provider) => {
      fetch(`/api/search?provider=${provider}&keyword=${window.encodeURIComponent(keyword)}&type=${type}`, {
        // withCredentials: true
        credentials: 'include'
      })
        .then(res => res.json())
        .then(json => {
          onResultResponded(provider, json);
          resultsResponded++;
          if (resultsResponded === providers.length) searchEnded();
        })
        .catch(err => {
          console.log('err ', err);
        });
    });

  }

});

const onSearch = () => {
  store.dispatch({ type: 'CLEAR_RESULTS' });
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'searching' });
};
const onResultResponded = (provider, data) => {
  store.dispatch({
    type: 'UPDATE_SEARCH_RESULTS', provider, data
  });
};

const searchEnded = () => {
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'searched' });
};

const updateSearchHistory = (keyword) => {
  store.dispatch({ type: 'UPDATE_SEARCH_HISTORY', data: keyword });
};


export default store;
