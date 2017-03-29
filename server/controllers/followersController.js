const Twit = require('twit')
const OAuth2 = require('OAuth').OAuth2
const https = require('https')
const userCredentials = require('../config/credentials.js') //TODO, change this to process.ENV

// global variable just to provide the twitter endpoints
const TwitterConfig = {
  hostname: 'api.twitter.com',
  followerEndPoint: '/1.1/followers/list.json',
  profileInfoEndPoint: '/1.1/users/show.json',
  followingEndPoint: '/1.1/friends/list.json'
}

// create aouth2 instance
const oauth2 = new OAuth2(
  userCredentials.access_key,
  userCredentials.secret_key,
  `https://${TwitterConfig.hostname}/`,
  null,
  'oauth2/token',
  null
 )

const authorizationHeader = {}

// get the token and save it to authorizationHeader to use it in all the requests
oauth2.getOAuthAccessToken('', {'grant_type': 'client_credentials'}, (e, access_token) => {
  //string that we can use to authenticate request
  authorizationHeader.Authorization = 'Bearer ' + access_token
})

// get the followers for a given userName
exports.getFollowers = (req, res, next) => {
  let userName = req.params.userName
  const options = {
      hostname: TwitterConfig.hostname,
      path: `${TwitterConfig.followerEndPoint}?screen_name=${userName}&count=50`,
      headers: {
        Authorization: authorizationHeader.Authorization
      }
  }

  https.get(options, function(result){
    // because the data is like a stream buffer, parse it
    let aux = ''
    result.setEncoding('utf8')
    result.on('data', function(data) {
      aux += data
    })

    result.on('end', function(result) {
      if(JSON.parse(aux).users) {
        // parse and return only need it data
        const followers = JSON.parse(aux).users.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            user: elem.screen_name
          }
        })
        return res.status(200).send(followers)
      }
        // default response
        return res.status(200).send([])
    })
  })
}

// get the followers for a given userName
exports.getFriends = (req, res, next) => {
  let userName = req.params.userName
  const options = {
      hostname: TwitterConfig.hostname,
      path: `${TwitterConfig.followingEndPoint}?screen_name=${userName}&count=50`,
      headers: {
        Authorization: authorizationHeader.Authorization
      }
  }

  https.get(options, function(result){
    // because the data is like a stream buffer, parse it
    let aux = ''
    result.setEncoding('utf8')
    result.on('data', function(data) {
      aux += data
    })

    result.on('end', function(result) {
      if(JSON.parse(aux).users) {
        // parse and return only need it data
        const friends = JSON.parse(aux).users.map((elem) => {
          return {
            id: elem.id,
            name: elem.name,
            user: elem.screen_name
          }
        })
        return res.status(200).send(friends)
      }
        // default response
        return res.status(200).send([])
    })
  })
}

exports.getUserInfo = (req, res, next) => {
  let userName = req.params.userName

  const options = {
      hostname: TwitterConfig.hostname,
      path: `${TwitterConfig.profileInfoEndPoint}?screen_name=${userName}`,
      headers: {
        Authorization: authorizationHeader.Authorization
      }
  }

  https.get(options, function(result){
    // because the data is like a stream buffer, parse it
    let aux = ''
    result.setEncoding('utf8')
    result.on('data', (data) => {
      aux += data
    })
    result.on('end', (data) => {
      return res.status(200).send(aux)
    })
  })

}
