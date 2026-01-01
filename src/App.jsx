import { useState, useEffect } from 'react'
import './App.css'

const Card = ({title}) => {

    const [hasLiked, setHasLiked] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`);
    }, [title, hasLiked]);

    return (
        <div className="card" onClick={() => setCount((prevState) => prevState + 1)}>
            <h2>{title} {count ? `- ${count} ` : null}</h2>

            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? 'Liked' : 'Like'}
            </button>
        </div>
    )
}

function App() {
  return (
  <>
      <div className="card-container">
          <Card title="Casablanca" />
          <Card title="The Godfather"/>
          <Card title="Once Upon a Time in the West"/>
          <Card title="The Big Sleep"/>
      </div>

  </>
  )
}

export default App
