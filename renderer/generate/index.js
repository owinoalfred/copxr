const cluster = require('cluster')
const chunk = require('lodash').chunk

const writeFileToPublic = require('./lib/writeFileToPublic')
const render = require('../render')
const generateFeed = require('../feed')
const generateSitemap = require('../sitemap')
const generateRobots = require('../robots')
const getRoutes = require('./lib/getRoutes')
const getSiteData = require('../siteData')

// generate util:
// make a HTML file for all the pages we want to render
// see main() function for the list of routes we want to render below

async function generateAll(routes) {
    for (const url of routes) {
        const html = await render(url)
        await writeFileToPublic(`${url}/index.html`, html)
    }
}

async function main() {
    if (cluster.isMaster) {
        console.time('generateAll')
        const siteData = await getSiteData()
        await generateFeed(siteData)
        const routes = await getRoutes(siteData)
        await generateSitemap(routes)
        await generateRobots()

        const numCPUs = require('os').cpus().length
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
        
        const routesPerWorker = chunk(routes, Math.ceil(routes.length / numCPUs))
        console.log('Splitting routes into %d chunks across %d CPUs', routesPerWorker.length, numCPUs)

        for (const worker of Object.values(cluster.workers)) {
            const nextBatch = routesPerWorker.shift()
            worker.send({ routes: nextBatch })
        }

        let todo = numCPUs
        process.on('message', async (msg) => {
            if (msg === 'done') {
                todo--
                if (todo <= 0) {
                    console.timeEnd('generateAll')
                    setTimeout(() => { process.exit() }, 4000)
                }
            }
        })
    } else if (cluster.isWorker) {
        process.on('message', async ({ routes }) => {
            console.log('worker %s started on %d routes', cluster.worker.id, routes.length)
            console.time('generate-' + cluster.worker.id)
            await generateAll(routes)
            process.send('done')
            console.timeEnd('generate-' + cluster.worker.id)
            setTimeout(() => { process.exit() }, 1000)
        })
    }
}

main() // start!
