const FOLLOWER_ENDPOINT = 'http://localhost:9000/api/followers/'
const FRIENDS_ENDPOINT = 'http://localhost:9000/api/friends/'
const PROFILE_ENDPOINT = 'http://localhost:9000/api/profile/'
const _fetch = (endPoint, param) => {
  return fetch(`${endPoint}${param}`)
        .then((response) => response.json())
}
export function GetUserInfo(userName){
  return _fetch(PROFILE_ENDPOINT, userName)
}

export function GetUserFollowers(userName){
  return _fetch(FOLLOWER_ENDPOINT, userName)
}

export function GetUserFriends(userName){
  return _fetch(FRIENDS_ENDPOINT, userName)
}
