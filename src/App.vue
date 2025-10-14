<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import { zhCN, dateZhCN } from 'naive-ui';
import MainView from '@/views/MainView.vue';
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-dialog-provider>
        <MainView></MainView>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
