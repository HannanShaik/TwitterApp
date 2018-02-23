import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: "#d6d7da",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: Dimensions.get("window").width,
    backgroundColor: 'white'
  },
  tweetDetails: {
    flex: 1
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  name: {
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 20
  },
  screenName: {
    paddingLeft: 15,
    color: "#aaa",
    fontSize: 16,
    justifyContent: 'flex-end'
  },
  tweetText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555",
  },
  tweetImage: {
    marginTop: 10,
    width: 300,
    height: 200
  },
  tweetFooter: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeCount: {
    paddingLeft: 5
  },
  separator: {
    marginLeft: 10,
    marginRight: 10
  },
  lineSeperator: {
    margin: 5,
    height: 1,
    backgroundColor: "#d6d7da",
    width: (Dimensions.get("window").width - 50)
  }
})
