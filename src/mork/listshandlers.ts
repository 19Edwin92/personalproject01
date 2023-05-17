import { rest } from "msw";
import projectimgs01 from '../data/projectimgs01.jpg';
import { MainData } from "../model/homeType";

let lists: MainData[] = [
  {
    id: 1,
    title: "(1) 타입스크립트로, 리액트 컴포넌트 제어하기",
    desc: "이번에 타입스크립트 제대로 한 번 해보자.",
    imgs: projectimgs01,
  },
  {
    id: 2,
    title: "(2) msw 목서버 만들기",
    desc: "이번에 개인프로젝트 잘 만들어보자.",
    imgs: projectimgs01,
  },
  {
    id: 3,
    title: "(3) React-Redux로 상태관리하기",
    desc: "이번에 Redux 뚝배기 꺠보자!!!",
    imgs: projectimgs01,
  },
];

export const listshandlers = [
  // GET 요청 핸들러
  rest.get(`${process.env.REACT_SERVER_KEY}/lists`, async (req, res, ctx) => {
    return res(ctx.json({ lists }));
  }),

  // DELETE 요청 핸들러
  rest.delete(`${process.env.REACT_SERVER_KEY}/lists/:id`, async (req, res, ctx) => {
    const id = parseInt(req.params.id as string) ;
    if (id) {
      const listsIndex = lists.findIndex(items => items.id === id);
      lists.splice(listsIndex, 1)
      return res(ctx.status(200))
    } else {
      return res(ctx.status(400))
    }
  })
];