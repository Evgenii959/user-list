<template>
  <v-container class="mt-10">
    <v-row style="gap: 16px">
      <v-text-field
        v-model="searchQuery"
        label="Поиск"
        type="search"
        variant="outlined"
      />
      <v-select
        v-model="select"
        :items="roles"
        item-title="title"
        item-value="title"
        label="Роль"
        variant="outlined"
      />
      <v-btn @click="openDialog" color="primary">Добавить</v-btn>
      <v-btn @click="refresh">Обновить</v-btn>
    </v-row>

    <v-data-table
      class="elevation-1"
      item-key="email"
    >
      <thead>
        <tr>
          <th class="text-left">Имя</th>
          <th class="text-left">Роль</th>
          <th class="text-left">Почта</th>
          <th class="text-left">Телефон</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.role }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
        </tr>
      </tbody>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="700px">
      <v-card width="100%" title="Пользователь" class="pa-10">
        <ModalCreateUser
          :addItem="addItem"
          :dialog="dialog"
          @update:dialog="dialog = $event"
          :roles="roles"
        />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ModalCreateUser from "./ModalCreateUser.vue";

const items = ref([]);
const searchQuery = ref("");
const select = ref(null);
const dialog = ref(false);
const roles = ["Администратор", "Риелтор", "Редактор", "Менеджер"];

const addItem = (newUser) => {
  items.value.push(newUser);
  localStorage.setItem("users", JSON.stringify(items.value));
  dialog.value = false;
};

const refresh = () => {
  const storedItems = localStorage.getItem("users");
  if (storedItems) {
    items.value = JSON.parse(storedItems);
  }
  searchQuery.value = "";
  select.value = null;
};

const filteredItems = computed(() => {
  let filtered = items.value;

  if (select.value) {
    filtered = filtered.filter((item) => item.role === select.value);
  }

  if (searchQuery.value) {
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.phone.includes(searchQuery.value)
    );
  }

  return filtered;
});

const openDialog = () => {
  dialog.value = true;
};

onMounted(() => {
  const storedItems = localStorage.getItem("users");
  if (storedItems) {
    items.value = JSON.parse(storedItems);
  }
});
</script>

<style scoped></style>
