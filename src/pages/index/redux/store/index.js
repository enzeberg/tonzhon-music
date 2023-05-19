import { createStore } from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);
const { providers,  searchKeyword } = store.getState();
let lastKeyword = searchKeyword;

store.subscribe(() => {
  const { searchKeyword } = store.getState();
  if (lastKeyword !== searchKeyword) {
    // 更新 lastKeyword 必须放在包含dispatch方法的函数前面，否则会造成无限递归
    lastKeyword = searchKeyword;
    updateSearchHistory(searchKeyword);
    onSearch();
    let resultsResponded = 0;
    providers.forEach((provider) => {
      fetch(`/api/search?provider=${provider}&keyword=${window.encodeURIComponent(searchKeyword)}`, {
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
  store.dispatch({ type: 'UPDATE_SEARCH_STATUS', data: 'done' });
};

const updateSearchHistory = (keyword) => {
  store.dispatch({ type: 'UPDATE_SEARCH_HISTORY', data: keyword });
};


export default store;