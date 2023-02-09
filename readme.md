# Setting up GitHub-Test

1. npm install
2. npm start

## How to use github-test
1. It would be best to already have github cli installed so that you can authenticate through github. This will allow you to not hit a rate limit when making requests
2. 'npm start' to start server
3. to go http://localhost:3000/docs to view swagger docs, from there you can make requests through the swagger UI. 
4. Pass a valid GitHub url in the body of your request:

```
{
    url: 'https://github.com/raindrops-protocol/raindrops'
}
```


# To run unit tests
1. npm test

# To run integration tests
1. npm start
2. npm run test:integration