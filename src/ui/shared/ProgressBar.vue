<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps<{
  value: number
}>()
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__indicator"></div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  position: relative;
  height: 24px;
  min-width: 200px;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
}

.progress-bar__indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  background-color: #c62828;
  transition: 0.1s;
  transform: translateX(-100%);
}
</style>