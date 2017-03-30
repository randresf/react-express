const Twit = require('twit')
const https = require('https')
const request = require('request')
const userCredentials = require('../config/credentials.js') //TODO, change this to process.ENV
const authorizationHeader = {}

// get the token and save it to authorizationHeader to use it in all the requests
request({
  url: 'https://api.twitter.com/oauth2/token',
  method: 'POST',
  auth: {
    user: userCredentials.access_key,
    pass: userCredentials.secret_key
  },
  form: {
    'grant_type': 'client_credentials'
  }
}, (err, res) => {
  const json = JSON.parse(res.body)
  authorizationHeader.Authorization = 'Bearer ' + json.access_token
})

// global variable just to provide the twitter endpoints
const TwitterConfig = {
  hostname: 'api.twitter.com',
  followerEndPoint: '/1.1/followers/list.json',
  profileInfoEndPoint: '/1.1/users/show.json',
  followingEndPoint: '/1.1/friends/list.json'
}


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
