<script setup lang="ts"></script>

<template>
  <div class="home">
    <div class="container">
      <h1>欢迎使用 Arona</h1>
      <p>这是一个 Vue 3 + TypeScript 项目</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  text-align: center;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: 700;
}

p {
  color: #666;
  margin-bottom: 30px;
  font-size: 1.2rem;
}

.links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.link {
  display: inline-block;
  padding: 12px 24px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.link:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}
</style>
