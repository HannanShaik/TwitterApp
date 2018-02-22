// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import OAuthManager from 'react-native-oauth'
// our "constructor"

const TWITTER = 'twitter';

const create = (baseURL = 'https://api.twitter.com/1.1') => {

  const config = {
    twitter: {
      consumer_key: 'oNKtP1e5SkuJ8Gi4CFLtyQP2x',
      consumer_secret: 'ZBl1K0e3jQksqaokb4zy6phNK5lNBcwgvyT948brD0IA3YAwbj'
    }
  }

  const manager = new OAuthManager('hannantwitterapp')
  manager.configure(config);

  const authorize = () => {
    manager.deauthorize(TWITTER)
    return manager.authorize(TWITTER)
  }

  const fetchTimeline = () => {
    const timelineEndpoint = `${BASE_URL}/statuses/user_timeline.json`
    return manager.makeRequest(TWITTER, timelineEndpoint)
  }

  const tweet = (message) => {
    const tweetEndpoint = `${BASE_URL}/statuses/update.json`
    return manager.makeRequest(TWITTER, tweetEndpoint, {
      method: 'post',
      params: { status: 'Testing Twitter Status Update' }
    })
  }

  return {
    authorize,
    fetchTimeline
  }
}

export default {
  create
}
