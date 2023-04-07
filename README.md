# test-graphql-stream

## start

`yarn`

### Start API

`cd api && node --watch index.js`

### APP

Apollo-client

`cd app-apollo-client && yarn run dev`

or Urql

`cd app-urql && yarn run dev`

## Test

Open app on browser or

open http://localhost:4000/

use this query

```graphql
query ExampleQuery {
  books @stream {
    title
  }
}
```

:warning: Don't forget to add "Accept: 'multipart/mixed; deferSpec=20220824'" header on the sandbox
