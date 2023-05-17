import { setupWorker } from "msw";
import { listshandlers } from "./listshandlers";

export const worker = setupWorker(...listshandlers)
// handlers가 복수라면 스프레드 연산자를 이용해서 setupWorker에 추가해주면 된다. 