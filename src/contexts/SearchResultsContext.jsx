import React, { createContext, useContext, useState } from 'react'

const SearchResultsContext = createContext()

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext)
  if (!context) {
    throw new Error('useSearchResults must be used within a SearchResultsProvider')
  }
  return context
}

export const SearchResultsProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState({})

  const updateSearchResults = (provider, data) => {
    setSearchResults(prevResults => ({
      ...prevResults,
      [provider]: data
    }))
  }

  const clearResults = () => {
    setSearchResults({})
  }

  return (
    <SearchResultsContext.Provider 
      value={{ 
        searchResults, 
        updateSearchResults,
        clearResults 
      }}
    >
      {children}
    </SearchResultsContext.Provider>
  )
}
