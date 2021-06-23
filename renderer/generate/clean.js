const path = require('path')
const fs = require('fs')
const outDir = path.resolve(__dirname, '../../public')
const glob = require('glob')

// clean util:
// this file removes all the files in .gitignore before the build starts
// so we don't accidentally have a HTML file for a route that doesn't exist anymore
// in the CI production build, this should be empty, so this is more useful for development

/**
 * Get all the files that are matched in the public/.gitignore
 */
function getAllPublicFilesInGitIgnore() {
    const gitignore = fs.readFileSync(path.resolve(outDir, '.gitignore')).toString().split('\n')

    let allFiles = []
    for (const line of gitignore) {
        allFiles = allFiles.concat(glob.sync(line, { cwd: outDir }))
    }
    return allFiles.filter(file => !file.includes('admin/'))
}

/**
 * When all the files are removed, find all the empty folders and remove them
 */
function cleanEmptyFoldersRecursively(folder) {
    if (!fs.statSync(folder).isDirectory()) return;

    fs.readdirSync(folder).forEach(function (file) {
        var fullPath = path.join(folder, file);
        cleanEmptyFoldersRecursively(fullPath);
    });

    // re-evaluate files; after deleting subfolder
    // we may have parent folder empty now
    if (fs.readdirSync(folder).length === 0) {
        fs.rmdirSync(folder);
    }
}

getAllPublicFilesInGitIgnore().forEach(file =>{
    const pathToDelete = path.resolve(outDir, file)

    if (!fs.existsSync(pathToDelete)) {
        return // already deleted
    }

    if (fs.statSync(pathToDelete).isDirectory()) {
        return // is a folder, this will be deleted in cleanEmptyFoldersRecursively
    }

    fs.unlinkSync(pathToDelete) // delete this file
});

cleanEmptyFoldersRecursively(outDir)

console.log('Cleaned public directory before build')