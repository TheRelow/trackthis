<template>
  <div class="popup">
    <h3>📖 TrackThis</h3>
    <button @click="markAsRead">Пометить как прочитанную</button>
    <button @click="openList">Открыть список</button>
    <button @click="clearAll">Очистить всё</button>
    <p class="msg">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')

function sendMsg(type: string) {
  browser.runtime.sendMessage({ type })
}

function markAsRead() {
  sendMsg('markAsRead')
  message.value = '✅ Сохранено'
  setTimeout(() => (message.value = ''), 2000)
}

function clearAll() {
  sendMsg('clearAll')
  message.value = '🗑 Очищено'
  setTimeout(() => (message.value = ''), 2000)
}

function openList() {
  browser.runtime.openOptionsPage()
}

</script>

<style scoped lang="scss">
.popup {
  font-family: sans-serif;
  padding: 12px;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  button {
    cursor: pointer;
    padding: 6px;
    border: none;
    background: #1976d2;
    color: white;
    border-radius: 6px;

    &:hover {
      background: #125a9c;
    }
  }

  .msg {
    text-align: center;
    font-size: 0.9em;
    color: #555;
  }
}
</style>
