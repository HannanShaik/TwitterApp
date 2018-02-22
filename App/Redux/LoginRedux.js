import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: null,
  loginSuccess: ['data'],
  loginFailure: ['error']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  logingIn: null,
  error: '',
  response: {
    credentials: {}
  },
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ logingIn: true })

// successful api lookup
export const success = (state, { data }) => {
  return state.merge({ logingIn: false, response: data.response })
}

// Something went wrong somewhere.
export const failure = (state, { error }) => {
  return state.merge({ logingIn: false, error: error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure
})
