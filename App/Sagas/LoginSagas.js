import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

export function* authorize(api) {
  try {
    const response = yield call(api.authorize)
    yield put(LoginActions.loginSuccess(response))
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }

}
