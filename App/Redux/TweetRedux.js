import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postTweet: ['data'],
  postTweetSuccess: ['payload'],
  postTweetFailure: null,
  fetchTimeline: null,
  fetchTimelineSuccess: ['response'],
  fetchTimelineFailure: ['error'],
  doRetweet: ['id'],
  doRetweetSuccess: ['response'],
  doRetweetFailure: ['error'],
  markFavorite: ['id'],
  markFavoriteSuccess: ['response'],
  markFavoriteFailure: ['error']
})

export const TweetTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  tweets: []
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


export const fetchTimelineSuccess = (state, { response }) => {
  const tweets = [];
  for (let tweet of response) {
    tweet = _.pick(tweet, [
      'id',
      'text',
      'favorited',
      'retweeted',
      'retweet_count',
      'favorite_count',
      'entities.urls',
      'entities.media',
      'user.id',
      'user.name',
      'user.screen_name',
      'user.description',
      'user.profile_image_url_https'
    ]);
    tweets.push(tweet);
  }
  return state.merge({ fetching: false, error: null, tweets })
}

// Something went wrong somewhere.
export const fetchTimelineFailure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const doRetweet = (state, { id }) => {
  const { tweets } = state
  for (let tweet of tweets) {
    if (tweet.id === id) {
      tweet.retweeted = true
      break
    }
  }
  return state.merge({ fetching: true, tweets })
}

export const doRetweetSuccess = (state, { response }) =>
  state.merge({ fetching: false, error: false, response })

export const doRetweetFailure = (state, { error }) =>
  state.merge({ fetching: false, error, response: '' })

export const markFavoriteSuccess = (state, { response }) =>
  state.merge({ fetching: false, error: false, response })

export const markFavoriteFailure = (state, { error }) =>
  state.merge({ fetching: false, error, response: '' })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_TWEET]: request,
  [Types.POST_TWEET_SUCCESS]: postSuccess,
  [Types.POST_TWEET_FAILURE]: postFailure,
  [Types.FETCH_TIMELINE]: request,
  [Types.FETCH_TIMELINE_SUCCESS]: fetchTimelineSuccess,
  [Types.FETCH_TIMELINE_FAILURE]: fetchTimelineFailure,
  [Types.DO_RETWEET]: doRetweet,
  [Types.DO_RETWEET_SUCCESS]: doRetweetSuccess,
  [Types.DO_RETWEET_FAILURE]: doRetweetFailure,
  [Types.MARK_FAVORITE]: request,
  [Types.MARK_FAVORITE_SUCCESS]: markFavoriteSuccess,
  [Types.MARK_FAVORITE_FAILURE]: markFavoriteFailure,
})
