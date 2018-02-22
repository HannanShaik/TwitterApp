import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../Redux/LoginRedux'

export function* authorize(api) {
  try {
    const response = yield call(api.authorize)
    yield put(LoginActions.loginSuccess())
  } catch (e) {
    yield put(LoginActions.loginFailure(e))
  }

}
