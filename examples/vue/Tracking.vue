<script setup lang="ts">
import { ref } from "vue";

const waybill = ref("");
const result = ref<unknown>();
const error = ref("");

async function track() {
  error.value = "";
  result.value = undefined;
  try {
    const response = await fetch(`/api/tracking/${encodeURIComponent(waybill.value)}`);
    if (!response.ok) throw new Error("Tracking request failed.");
    result.value = await response.json();
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : "Tracking request failed.";
  }
}
</script>

<template>
  <section>
    <form @submit.prevent="track">
      <label>
        Waybill
        <input v-model="waybill" required />
      </label>
      <button type="submit">Track</button>
    </form>
    <p v-if="error" role="alert">{{ error }}</p>
    <pre v-if="result !== undefined">{{ JSON.stringify(result, null, 2) }}</pre>
  </section>
</template>
