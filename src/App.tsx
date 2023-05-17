import React, { useState } from 'react'
import { MainData } from './model/homeType'

const App: React.FC = () => {
  const [getData, setGetData] = useState<MainData[]>([])
  const handlerClick = () => {
    fetch(`${process.env.REACT_SERVER_KEY}/lists`, {
      method: 'GET'
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setGetData(data.lists)  
    })
    .catch (e => {
      console.log("error", e.message);
      
    }) 
  }
  const deleteHandler = (id:number) => {
    fetch(`${process.env.REACT_SERVER_KEY}/lists/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      handlerClick()
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
      {getData && getData.map(item => (
        <div key={item.id}>
          <img src={item.imgs} alt={item.title} width="100px"/>
          {item.title}, {item.desc}
          <button onClick={()=> deleteHandler(item.id)}>해당 데이터 삭제하기</button>
        </div>))}
    </div>
  )
}

export default App