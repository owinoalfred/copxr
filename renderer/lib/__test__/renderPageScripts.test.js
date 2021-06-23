const renderPageScripts = require('../renderPageScripts')

test('renderPageScripts', async () => {
    const scripts = renderPageScripts(['toggle-content.js', 'map-loader.js'])

    expect(scripts).toMatch(/type="module" src="\/js-modern\/chunks\/map-loader/)
    expect(scripts).toMatch(/nomodule src="\/js\/chunks\/map-loader/)
    
    // load split chunks
    expect(scripts).toMatch(/src="\/js\/chunks\/vendors~map-loader.*/)
})