import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { TweetTypes } from '../Redux/TweetRedux'

/* ------------- Sagas ------------- */

import { authorize } from './LoginSagas'
import { postTweet, fetchTimeline, doRetweet, markFavorite } from './TweetSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, authorize, api),

    takeLatest(TweetTypes.POST_TWEET, postTweet, api),

    takeLatest(TweetTypes.FETCH_TIMELINE, fetchTimeline, api),

    takeLatest(TweetTypes.DO_RETWEET, doRetweet, api),

    takeLatest(TweetTypes.MARK_FAVORITE, markFavorite, api),

  ])
}
