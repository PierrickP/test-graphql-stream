<script setup>
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result } = useQuery(gql`
  {
    books @stream {
      title
      author
    }
  }
`);

const queryResponse = computed(() => ({
  data: result.value,
}));
</script>

<template>
  <main>{{ queryResponse }}</main>
</template>

<style scoped></style>
