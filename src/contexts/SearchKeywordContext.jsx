import React, { createContext, useContext, useState } from 'react'

const SearchKeywordContext = createContext()

export const useSearchKeyword = () => {
  const context = useContext(SearchKeywordContext)
  if (!context) {
    throw new Error('useSearchKeyword must be used within a SearchKeywordProvider')
  }
  return context
}

export const SearchKeywordProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState('')

  const updateSearchKeyword = (keyword) => {
    setSearchKeyword(keyword)
  }

  return (
    <SearchKeywordContext.Provider 
      value={{ 
        searchKeyword, 
        updateSearchKeyword
      }}
    >
      {children}
    </SearchKeywordContext.Provider>
  )
}
