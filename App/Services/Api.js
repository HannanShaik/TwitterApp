import OAuthManager from 'rn-oauth'
import queryString from 'query-string'

// our "constructor"

const TWITTER = 'twitter';

const create = (baseURL = 'https://api.twitter.com/1.1') => {

  const config = {
    twitter: {
      consumer_key: '<KEY>',
      consumer_secret: '<SECRET>'
    }
  }

  const manager = new OAuthManager('hannantwitterapp')
  manager.configure(config);

  const authorize = () => {
    manager.deauthorize(TWITTER)
    return manager.authorize(TWITTER)
  }

  const fetchTimeline = () => {
    const params = {}
    //params.include_entities = false
    params.exclude_replies = true
    const queryParam = queryString.stringify(params);
    const timelineEndpoint = `${baseURL}/statuses/home_timeline.json?${queryParam}`
    return manager.makeRequest(TWITTER, timelineEndpoint)
  }

  const postTweet = (message) => {
    const params = {}
    params.status = message
    const queryParam = queryString.stringify(params);
    const tweetEndpoint = `${baseURL}/statuses/update.json?${queryParam}`
    return manager.makeRequest(TWITTER, tweetEndpoint, {
      method: 'post'
    })
  }

  const retweet = (id) => {
    const tweetEndpoint = `${baseURL}/statuses/retweet/${id}.json`
    return manager.makeRequest(TWITTER, encodeURI(tweetEndpoint), {
      method: 'post'
    })
  }

  const markFavorite = (id) => {
    const params = {}
    params.id = id
    params.include_entities = false
    const queryParam = queryString.stringify(params);
    const tweetEndpoint = `${baseURL}/favorites/create.json?${queryParam}`
    return manager.makeRequest(TWITTER, encodeURI(tweetEndpoint), {
      method: 'post'
    })
  }

  return {
    authorize,
    fetchTimeline,
    postTweet,
    retweet,
    markFavorite
  }
}

export default {
  create
}
