import React, { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function App() {

  return (
      <RouterProvider
          router={router}
          future={{ v7_startTransition: true }}
      />
  )
}

export default App
