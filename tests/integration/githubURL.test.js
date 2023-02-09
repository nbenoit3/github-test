const axios = require('axios');

describe('Get GitHub Repo Integration', () => {
    it('Should return back bad request if invalid url is passed in', async () => {

        try {
            const results = await axios.post('http://localhost:3000/githubURL', {
            url: 'www.fake-url.com'
        });

        } catch(err) {
            expect(err.response.status).toEqual(400);
            expect(err.response.data.message).toEqual('Invalid GitHub url');
        }
    });

    it('Should return a 200 response for a successfull url', async () => {
        const results = await axios.post('http://localhost:3000/githubURL', {
            url: 'https://github.com/raindrops-protocol/raindrops'
        });

        expect(results.status).toEqual(200);
    })
})