const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
} else {
  const client = redis.createClient({
    url: REDIS_URL
  })
    
  getAsync = promisify(client.get).bind(client)
  setAsync = promisify(client.set).bind(client)    
}

const counterKeyName = 'addCounter';

const getCounter = async () => {
  const fromCache = Number(await getAsync(counterKeyName));
  const count = isNaN(fromCache) ? 0 : fromCache;
  return count;
};

const setCounter = async (value) => {
  await setAsync(counterKeyName,value);
};

module.exports = {
  getAsync,
  setAsync,
  getCounter,
  setCounter
}