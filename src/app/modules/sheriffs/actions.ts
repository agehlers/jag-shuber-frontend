import { Action } from 'redux'
import { Sheriff } from "../../api/index";


// The following gives us type-safe redux actions
// see https://medium.com/@dhruvrajvanshi/some-tips-on-type-safety-with-redux-98588a85604c
// Todo: Would be great to make this more generic and factor it out into infrastructure, leaving as is for now

type IActionMap = {
  "REQUEST_SHERIFF_LIST_BEGIN": null;
  "REQUEST_SHERIFF_LIST_FAIL": string;
  "REQUEST_SHERIFF_LIST_SUCCESS": Sheriff[]
}

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
  type: K,
  payload: IActionPayload<K>
}

export type IAction = {
  [P in IActionType]: IActionObject<P>
}[IActionType]

function actionCreator<Type extends IActionType>(type: Type) {
  return (payload: IActionPayload<Type>): IActionObject<Type> =>
    ({ type: type, payload: payload });
}


// Action creator for getting Sheriff List
export const getSheriffList = () => (async (dispatch: any, getState: any, { api }: any) => {
  dispatch(beginGetSheriffList());
  try {
    let sheriffs = await api.getSheriffs();
    dispatch(sheriffListSuccess(sheriffs));
  } catch (error) {
    dispatch(sheriffListFailed(`Error getting sheriffs: '${error}'`));
  }
});

export const beginGetSheriffList = () => actionCreator("REQUEST_SHERIFF_LIST_BEGIN")(null);
export const sheriffListFailed = actionCreator("REQUEST_SHERIFF_LIST_FAIL");
export const sheriffListSuccess = actionCreator("REQUEST_SHERIFF_LIST_SUCCESS");