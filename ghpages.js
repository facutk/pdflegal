const ghpages = require('gh-pages');
const path    = require('path');
const repo    = 'https://github.com/pdflegal/pdflegal.github.io.git';
const branch  = 'master';

ghpages.publish(path.join(__dirname, 'dist'), {
    repo,
    branch
}, () => {
    console.log(`deployed site to ${repo}#${branch}`);
});
