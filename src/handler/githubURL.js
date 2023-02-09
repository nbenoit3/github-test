const axios = require('axios');
const { isValidGitHubUrl } = require('../utils/url.js');

const getRepo = async (req, res) => {
    try {
        const { url } = req.body

        //Check that the url passed in is a valid github url
        if (!isValidGitHubUrl(url)) return res.status(400).json({ message: 'Invalid GitHub url' });

        //Retrieve the owner and repo from the github url
        const [owner, repo] = url?.split('/').splice(3);
    
        const result = await axios.get(`https://api.github.com/repos/${owner}/${repo}/pulls?per_page=100`);

        const arrOfResults = [];

        const openPRs = result.data.filter(pr => pr.state === 'open');

        //Loop through each open PR and get the number of commits
        for (const pr of openPRs) {
            const commits = await axios.get(`${pr.commits_url}?per_page=100`);

            arrOfResults.push({
                id: pr.id,
                number: pr.number,
                title: pr.title,
                author: pr.user.login,
                commit_count: commits.data.length
            })
        }

        return res.json(arrOfResults);

    } catch(err) {
        console.log("Error", err);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = getRepo;