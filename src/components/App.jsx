import React from 'react'
import Header from './Header'
// import '../pages/App.css';

const App = ({ children }) => (
  <main>
    <Header />
    {children}
  </main>
)

export default App
