<script setup lang="ts">
import { useAutoDarkMode } from "./utils/dark";
import "@fontsource-variable/fira-code";
import "@fontsource-variable/noto-sans-sc";

useAutoDarkMode();
</script>

<template>
  <RouterView />
</template>
