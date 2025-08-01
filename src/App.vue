<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useAutoDarkMode } from "./utils/dark";
import "@fontsource-variable/fira-code";
import "dayjs/locale/zh-cn";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./assets/MiSans/mi-sans.css";
import "./assets/reset.css";

useAutoDarkMode();
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <ElContainer class="app-container">
      <ElAside width="3rem">Aside</ElAside>
      <ElMain class="app-main">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElConfigProvider>
</template>

<style scoped>
.app-container {
  height: 100dvh;
}

.app-main {
  padding: 0;
}
</style>
