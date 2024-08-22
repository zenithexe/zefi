'use client'
import { GlobalStateProvider } from '@/provider/GlobalStateProvider'
import React from 'react'
import App from './App'

function AppProvider() {
  return (
    <>
    <GlobalStateProvider>
        <App/>
    </GlobalStateProvider>
    </>
  )
}

export default AppProvider