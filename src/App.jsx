import { useState } from 'react'
import './App.css'

const Card = ({cardName}) => {
    return (
        <div>
            <h2>{cardName} Card Component</h2>
        </div>
    )
}

function App() {
  return (
  <>
      <h2>Functional Arrow Component</h2>

      <Card cardName="tempCard" />
      <Card />
      <Card />
  </>
  )
}

export default App
