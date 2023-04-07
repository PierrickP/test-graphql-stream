<script setup>
import { computed } from "vue";
import { gql, useQuery } from "@urql/vue";
import { Client, provideClient, cacheExchange, fetchExchange } from "@urql/vue";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [fetchExchange],
  fetchOptions: () => ({
    headers: { Accept: "multipart/mixed; deferSpec=20220824" },
  }),
});

provideClient(client);

const result = useQuery({
  query: gql`
    {
      books @stream {
        title
        author
      }
    }
  `,
});

const queryResponse = computed(() => ({
  fetching: result.fetching,
  data: result.data,
  error: result.error,
}));
</script>

<template>
  <main>{{ queryResponse?.data }}</main>
</template>

<style scoped></style>
