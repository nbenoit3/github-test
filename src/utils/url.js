const isValidGitHubUrl = url => {
    try {
        if (!url?.includes('github.com')) return false

        return Boolean(new URL(url));
    } catch(err) {
        return false;
    }
}

module.exports = { isValidGitHubUrl };