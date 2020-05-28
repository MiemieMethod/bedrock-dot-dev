import { join } from 'path'

import flatCache from 'flat-cache'

import { BedrockVersions } from './versions'

const cacheDirectory = join(
  process.env.NODE_ENV !== 'production' ? process.cwd() : '/tmp', '.cache'
)

const checkCache = () => {
  const cache = flatCache.create('versions', cacheDirectory)
  const timestamp = cache.getKey('timestamp')
  if (!timestamp) {
    return false
  } else {
    const cachedTime = new Date(timestamp)
    const currentTime = new Date()
    const difference = Math.round((currentTime.getTime() - cachedTime.getTime()) / 60000)

    const files: BedrockVersions = cache.getKey('files')
    if (difference < 10 && files) return files
    return false
  }
}

const setCache = (files: BedrockVersions) => {
  const cache = flatCache.create('versions', cacheDirectory)
  cache.setKey('timestamp', new Date().getTime())
  cache.setKey('files', files)
  cache.save()
}

export { setCache, checkCache }
