import { call, put } from 'redux-saga/effects'
import TweetActions from '../Redux/TweetRedux'

export function* fetchTimeline(api, action) {
  const response = yield call(api.fetchTimeline)

  if (response.status == 200) {
    yield put(TweetActions.fetchTimelineSuccess(response.data))
  } else {
    yield put(TweetActions.fetchTimelineFailure(response.data.errors[0]))
  }
}

export function* postTweet(api, action) {
  const { status } = action
  const response = yield call(api.postTweet, status)
  if (response.status === 200) {
    yield put(TweetActions.postTweetSuccess(response.data))
  } else {
    yield put(TweetActions.postTweetFailure(response.data.errors[0]))
  }
}

export function* doRetweet(api, action) {
  const { id } = action
  const response = yield call(api.retweet, id)
  if (response.status === 200) {
    yield put(TweetActions.doRetweetSuccess(response))
  } else {
    yield put(TweetActions.doRetweetFailure(response.data.errors[0]))
  }
}

export function* markFavorite(api, action) {
  const { id } = action
  const response = yield call(api.markFavorite, id)
  if (response.status === 200) {
    yield put(TweetActions.markFavoriteSuccess(response))
  } else {
    yield put(TweetActions.markFavoriteFailure(response.data.errors[0]))
  }
}