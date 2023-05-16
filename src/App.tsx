import React from 'react'

const App: React.FC = () => {
  const handlerClick = () => {
    fetch(`${process.env.REACT_SERVER_KEY}/lists`)
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(JSON.stringify(json))
    })
    .catch (e => {
      console.log("error", e.message);
      
    }) 
  }

  return (
    <div>
      MorkingTest
      <hr/>
      <button onClick={handlerClick}>데어터 가져오기</button>
    </div>
  )
}

export default App