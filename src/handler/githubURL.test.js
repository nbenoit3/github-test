const axios = require('axios');
const getRepo = require('./githubURL.js');

jest.mock('axios');

const json = jest.fn(val => val);
const status = jest.fn(() => ({ json }));
const res = { status, json };



describe('Get github repo', () => {

    it('Should return bad request if passed invalid url', async () => {
        const req = {
            body: {
                url: 'www.wrongUrl.com'
            }
        };

        const result = await getRepo(req, res);

        expect(result.message).toEqual('Invalid GitHub url');

    })

    it('Should return back valid response for a repo url', async () => {
        const req = {
            body: {
                url: 'https://github.com/fakeOwner/fakeRepo'
            }
        };

        axios.get.mockImplementationOnce(() => Promise.resolve({data: [{
            id: 'id',
            state: 'open',
            number: '1',
            title: 'title',
            user: {
                login: 'author'
            }
        }]})).mockImplementationOnce(() => Promise.resolve({data: [{
            id: '1'
        }]}));

        const result = await getRepo(req, res);

        expect(result[0]).toStrictEqual({
                id: 'id',
                number: '1',
                title: 'title',
                author: 'author',
                commit_count: 1
        })
    })

})