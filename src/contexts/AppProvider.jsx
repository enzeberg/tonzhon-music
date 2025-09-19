import React from 'react'
import { MusicProvider } from './MusicContext'
import { SearchProvider } from './SearchContext'

// 组合所有 Provider 的高阶组件
export const AppProvider = ({ children }) => {
  return (
    <MusicProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </MusicProvider>
  )
}

// 或者使用更灵活的 compose 函数
const composeProviders = (...providers) => {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) => {
      return ({ children }) => (
        <AccumulatedProviders>
          <CurrentProvider>
            {children}
          </CurrentProvider>
        </AccumulatedProviders>
      )
    },
    ({ children }) => <>{children}</>
  )
}

// 使用 compose 函数的版本
export const ComposedProviders = composeProviders(
  MusicProvider,
  SearchProvider
)
