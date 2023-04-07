import { createApp, provide, h } from "vue";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:4000/graphql",
    headers: { Accept: "multipart/mixed; deferSpec=20220824" },
  }),
  cache: new InMemoryCache(),
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
}).mount("#app");
