const exec = require('mz/child_process').exec
const request = require('supertest-as-promised')
const expect = require('chai').expect

const app = require('../server/app')

describe('builds application', function () {
  it('builds to "build" directory', function () {
    // Disable mocha time-out
    this.timeout(0)
    // Run process
    return exec('npm run build')
  })
})

describe('express serving', function () {
  it('responds to / with the index.html', function () {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(res => expect(res.text).to.contain('<div id="root"></div>'))
  })

  it('responds to any route with the index.html', function () {
    return request(app)
      .get('/foo/bar')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(res => expect(res.text).to.contain('<div id="root"></div>'))
  })
})
