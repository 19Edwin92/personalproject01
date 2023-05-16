import { rest } from "msw"

export const handlers = [
  
  rest.get(`${process.env.REACT_SERVER_KEY}/lists`, async(req, res, ctx) => {
    return res(
      ctx.json({
        "lists": [
          {
            "id":1,
            "title":"(1) 타입스크립트로, 리액트 컴포넌트 제어하기",
            "desc":"이번에 타입스크립트 제대로 한 번 해보자."        
          },
          {
            "id":2,
            "title":"(2) msw 목서버 만들기",
            "desc":"이번에 개인프로젝트 잘 만들어보자."        
          },
          {
            "id":3,
            "title":"(3) React-Redux로 상태관리하기",
            "desc":"이번에 Redux 뚝배기 꺠보자!!!"        
          }
        ]
      })
    )
  })
]