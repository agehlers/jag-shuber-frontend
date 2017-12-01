import {
  IActionType,
  IActionPayload,
  IAction
} from './actions'
import { SheriffTaskMap } from '../../api/index';

export type ReducerResponse<State> = State;
export type ReducerCases<State> = {
  [T in IActionType]: (
    state: State,
    payload: IActionPayload<T>
  ) => ReducerResponse<State>;
};

export function createReducer<State>(
  cases: Partial<ReducerCases<State>>
) {
  return function (state: State, action: IAction): ReducerResponse<State> {
    const fn = cases[action.type];
    if (fn) { // the "as any" part is a bit of a shame but ignore it
      return (fn as any)(state, action.payload, action);
    } else {
      return state || {};
    }
  };
}

export interface TaskState {
  map?: SheriffTaskMap;
  loading?: boolean;
  error?: string;
}


const reducer = createReducer<TaskState>({
  REQUEST_TASKS_BEGIN: (state, payload) => ({ loading: true }),
  REQUEST_TASKS_FAIL: (state, payload) => ({ loading: false, error: payload }),
  REQUEST_TASKS_SUCCESS: (state, payload) => ({ loading: false, map: payload }),
  ASSIGN_TASK: (state, payload) => {
    const { map, ...rest } = state;
    let newMap = Object.assign({}, map);
    newMap[payload.taskId].sheriffIds = [payload.badgeNumber];
    return { map: newMap, ...rest };
  }
});

export default reducer;