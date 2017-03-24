const ghpages = require('gh-pages');
const path    = require('path');
const repo    = 'https://github.com/pdflegal/pdflegal.github.io.git';
const branch  = 'master';

console.log(`deploying site to ${repo}#${branch}`);
ghpages.publish(path.join(__dirname, 'dist'), {
    repo,
    branch
}, (error) => {
    console.log('deployment done');
});
