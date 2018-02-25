import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postTweet: ['status'],
  postTweetSuccess: ['response'],
  postTweetFailure: ['error'],
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
  posting: false,
  fetching: false,
  error: null,
  tweets: [],
  posted: false
})

/* ------------- Reducers ------------- */

// Fetch User Timeline
export const fetchTimeline = (state) =>
  state.merge({ ...INITIAL_STATE, fetching: true })

export const fetchTimelineSuccess = (state, { response }) => {
  const tweets = [];
  for (let tweet of response) {
    tweet = _.pick(tweet, [
      'id',
      'id_str',
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
  return state.merge({ fetching: false, error: null, tweets, posted: false })
}

export const fetchTimelineFailure = (state, { error }) =>
  state.merge({ ...INITIAL_STATE, error })

// Post Tweet
export const request = (state) =>
  state.merge({ ...INITIAL_STATE, posting: true })

export const postSuccess = (state, { response }) =>
  state.merge({ posting: false, error: null, posted: true })

export const postFailure = (state, { error }) =>
  state.merge({ posting: false, error, posted: false })

// Do a Retweet  
export const doRetweet = (state, { id }) => {
  const tweets = JSON.parse(JSON.stringify(state.tweets))
  for (let tweet of tweets) {
    if (tweet.id_str === id) {
      tweet.retweeted = true
      tweet.retweet_count++;
      break
    }
  }
  return state.merge({ tweets, error: null, posted: false })
}

export const doRetweetSuccess = state =>
  state.merge({ error: null, posted: false })

export const doRetweetFailure = (state, { error }) =>
  state.merge({ error, posted: false })

// Mark favorite
export const markFavorite = (state, { id }) => {
  const tweets = JSON.parse(JSON.stringify(state.tweets))
  for (let tweet of tweets) {
    if (tweet.id_str === id) {
      tweet.favorited = true
      tweet.favorite_count++;
      break
    }
  }
  return state.merge({ tweets, error: null, posted: false })
}

export const markFavoriteSuccess = (state, { response }) =>
  state.merge({ error: null, posted: false })

export const markFavoriteFailure = (state, { error }) =>
  state.merge({ error, posted: false })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_TWEET]: request,
  [Types.POST_TWEET_SUCCESS]: postSuccess,
  [Types.POST_TWEET_FAILURE]: postFailure,
  [Types.FETCH_TIMELINE]: fetchTimeline,
  [Types.FETCH_TIMELINE_SUCCESS]: fetchTimelineSuccess,
  [Types.FETCH_TIMELINE_FAILURE]: fetchTimelineFailure,
  [Types.DO_RETWEET]: doRetweet,
  [Types.DO_RETWEET_SUCCESS]: doRetweetSuccess,
  [Types.DO_RETWEET_FAILURE]: doRetweetFailure,
  [Types.MARK_FAVORITE]: markFavorite,
  [Types.MARK_FAVORITE_SUCCESS]: markFavoriteSuccess,
  [Types.MARK_FAVORITE_FAILURE]: markFavoriteFailure,
})
