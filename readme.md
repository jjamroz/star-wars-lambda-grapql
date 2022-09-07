# STAR WARS LAMBDA GRAPQL

----
GraphQL server running inside lambda.

### Prerequisites
You need to have installed and configured the following software:
- [nodejs](https://nodejs.org/en/)
- [npm](https://npmjs.com/)
- [serverless-cli](https://serverless.com/)
- [aws-cli](https://aws.amazon.com/cli/)

### Bootstrap

```bash
  npm i
  cp .env.dist .env
```

### How to run locally

```bash
npm run dev
```
### Tests
- `npm run test`: Runs API tests that check GRAPHQL API
- `npm run test:E2E`: Runs E2E tests with local dynamoDB. Requires app running locally

### Deploy
- `serverless deploy`: For smooth deploy on AWS
