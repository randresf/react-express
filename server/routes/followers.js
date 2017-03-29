const express = require('express')
const followers = express.Router()
const followersCtrl = require('../controllers/followersController')

followers.get('/followers/:userName', (req, res, next) => {
  followersCtrl.getFollowers(req, res, next)
})

followers.get('/friends/:userName', (req, res, next) => {
  followersCtrl.getFriends(req, res, next)
})

followers.get('/profile/:userName', (req, res, next) => {
  followersCtrl.getUserInfo(req, res, next)
})

module.exports = followers
