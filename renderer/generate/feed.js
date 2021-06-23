require('@babel/register')
const generateFeed = require('../feed')
const getSiteData = require('../siteData')
const getRoutes = require('./lib/getRoutes')
const generateSitemap = require('../sitemap')
const generateRobots = require('../robots')

async function main () {
    const siteData = await getSiteData()
    await generateFeed(siteData)

    const routes = await getRoutes(siteData)
    await generateSitemap(routes)

    await generateRobots()
}

main() // start!