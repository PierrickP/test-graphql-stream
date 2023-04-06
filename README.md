# test-graphql-stream

## start

`yarn`

`node --watch index.js`

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
