<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useAutoDarkMode } from "./utils/dark";
import "@fontsource-variable/fira-code";
import "@fontsource-variable/noto-sans-sc";
import "dayjs/locale/zh-cn";

useAutoDarkMode();
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView />
  </ElConfigProvider>
</template>
