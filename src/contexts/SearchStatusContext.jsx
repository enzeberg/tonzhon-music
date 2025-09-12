import React, { createContext, useContext, useState } from 'react'

const SearchStatusContext = createContext()

export const useSearchStatus = () => {
  const context = useContext(SearchStatusContext)
  if (!context) {
    throw new Error('useSearchStatus must be used within a SearchStatusProvider')
  }
  return context
}

export const SearchStatusProvider = ({ children }) => {
  const [searchStatus, setSearchStatus] = useState('not_searched_yet')

  const updateSearchStatus = (status) => {
    setSearchStatus(status)
  }

  const clearResults = () => {
    setSearchStatus('not_searched_yet')
  }

  return (
    <SearchStatusContext.Provider 
      value={{ 
        searchStatus, 
        updateSearchStatus,
        clearResults 
      }}
    >
      {children}
    </SearchStatusContext.Provider>
  )
}
