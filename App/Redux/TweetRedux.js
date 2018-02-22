import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postTweet: ['data'],
  postTweetSuccess: ['payload'],
  postTweetFailure: null,
  fetchTimeline: null,
  fetchTimelineSuccess: ['response'],
  fetchTimelineFailure: ['error']
})

export const TweetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const postSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const postFailure = state =>
  state.merge({ fetching: false, error: true, payload: null })


export const fetchTimelineSuccess = (state, action) => {
  const { response } = action
  return state.merge({ fetching: false, error: null, response })
}

// Something went wrong somewhere.
export const fetchTimelineFailure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_TWEET]: request,
  [Types.POST_TWEET_SUCCESS]: postSuccess,
  [Types.POST_TWEET_FAILURE]: postFailure,
  [Types.FETCH_TIMELINE]: request,
  [Types.FETCH_TIMELINE_SUCCESS]: fetchTimelineSuccess,
  [Types.FETCH_TIMELINE_FAILURE]: fetchTimelineFailure

})
