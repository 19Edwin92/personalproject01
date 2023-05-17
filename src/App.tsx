import React, { useState } from 'react'
import { InputValue, MainData } from './model/homeType'
import projectimgs01 from './data/projectimgs01.jpg'

const App: React.FC = () => {
  const [getData, setGetData] = useState<MainData[]>([])
  const handlerClick = (): void => {
    fetch(`${process.env.REACT_APP_SERVER_KEY}/lists`, {
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

  const [inputValue, setInputValue] = useState<InputValue>({
    title:'',
    desc:''
  })
  const inputHandler = ():void => {
    const newItem:MainData = {
      id: Date.now(),
      ...inputValue,
      imgs: projectimgs01
    }
    fetch(`${process.env.REACT_APP_SERVER_KEY}/lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // 데이터 형식을 JSON으로 지정
      },
      body: JSON.stringify(newItem),
    })
    .then(response => {
      setInputValue({title:'',desc:''})
      handlerClick()
    })
    .catch (e => {
      console.log("error", e.message);
    }) 
    
  }
  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setInputValue({...inputValue, [e.target.name]:e.target.value})
  }

  return (
    <div>
      MorkingTest
      <hr/>
      <button onClick={handlerClick}>데어터 가져오기</button>
      <hr/>
      <input type='text' name='title' value={inputValue.title} onChange={e => onChangeHandler(e)}/>
      <input type='text' name='desc' value={inputValue.desc} onChange={e => onChangeHandler(e)}/>
      <button onClick={inputHandler}>제출하기</button> 
      {getData && getData.map(item => (
        <div key={item.id}>
          <img src={item.imgs} alt={item.title} width="100px"/>
          <EditedItem info={item} handlerClick={handlerClick}/>
        </div>))}
    </div>
  )
}

export default App

interface OwnProps {
  info: MainData;
  handlerClick():void;
}

const EditedItem:React.FC<OwnProps> = ({info, handlerClick}) => {

  const deleteHandler = (id:number) => {
    fetch(`${process.env.REACT_APP_SERVER_KEY}/lists/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      handlerClick()
    })
    .catch (e => {
      console.log("error", e.message);
      
    }) 
  }
  
  const [edited, setEdited] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<InputValue>({
    title:'',
    desc:''
  })
  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setInputValue({...inputValue, [e.target.name]:e.target.value})
  }

  const patchHandler = (id:number): void => {
    fetch(`${process.env.REACT_APP_SERVER_KEY}/lists/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json', // 데이터 형식을 JSON으로 지정
      },
      body: JSON.stringify(inputValue),
    })
    .then(() => {
      setEdited(pre=>!pre)
      setInputValue({
        title:'',
        desc:''
      })
      handlerClick()
    })
    .catch (e => {
      console.log("error", e.message);
      
    }) 
  }


  return (
    <div>
    {!edited
      ? (<>
            {info.title}, {info.desc}
          <button onClick={()=> deleteHandler(info.id)}>해당 데이터 삭제하기</button>
          <button onClick={()=> setEdited(pre=>!pre)}>해당 데이터 수정하기</button>
        </>)
      : (<>
        <input type='text' name='title' value={inputValue.title} onChange={e => onChangeHandler(e)}/>
      <input type='text' name='desc' value={inputValue.desc} onChange={e => onChangeHandler(e)}/>
      <button onClick={()=> deleteHandler(info.id)}>해당 데이터 삭제하기</button>
          <button onClick={()=> patchHandler(info.id)}>해당 데이터 수정하기</button>
        </>)  
    }
    </div>
  )
}