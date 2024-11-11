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

    <p>Количество {{ filteredItems.length }}</p>

    <v-data-table class="elevation-1" item-key="email">
      <thead>
        <tr>
          <th class="text-left">Имя</th>
          <th class="text-left">Роль</th>
          <th class="text-left">Почта</th>
          <th class="text-left">Телефон</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in filteredItems"
          :key="index"
          @click="startEditing(item)"
        >
          <td v-if="!item.isEditing">{{ item.name }}</td>
          <td v-else>
            <v-text-field v-model="item.name" class="mt-4" variant="outlined" />
          </td>

          <td style="max-width: 280px" v-if="!item.isEditing">
            {{ item.role }}
          </td>
          <td v-else style="max-width: 280px">
            <v-select
              v-model="item.role"
              :items="roles"
              class="mt-4"
              item-title="title"
              item-value="title"
              variant="outlined"
            />
          </td>

          <td v-if="!item.isEditing">{{ item.email }}</td>
          <td v-else>
            <v-text-field
              class="mt-4"
              v-model="item.email"
              variant="outlined"
            />
          </td>

          <td v-if="!item.isEditing">{{ item.phone }}</td>
          <td v-else>
            <v-text-field
              class="mt-4"
              v-model="item.phone"
              variant="outlined"
            />
          </td>
        </tr>
      </tbody>
    </v-data-table>

    <v-btn
      v-if="editingItem"
      @click="saveItem(editingItem)"
      color="primary"
      class="mt-5"
      >Сохранить</v-btn
    >

    <v-btn
      v-if="editingItem"
      @click="cancelEdit(editingItem)"
      class="mt-5 ml-5"
      color="secondary"
      >Отменить</v-btn
    >

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
const editingItem = ref(null);

const addItem = (newUser) => {
  items.value.push(newUser);
  localStorage.setItem("users", JSON.stringify(items.value));
  dialog.value = false;
};

const openDialog = () => {
  dialog.value = true;
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

const startEditing = (item) => {
  if (editingItem.value && editingItem.value !== item) {
    editingItem.value.isEditing = false;
  }
  item.isEditing = true;
  editingItem.value = item;
};

const saveItem = (item) => {
  item.isEditing = false;
  editingItem.value = null;
  localStorage.setItem("users", JSON.stringify(items.value));
};

const cancelEdit = (item) => {
  item.isEditing = false;
  editingItem.value = null;
};

onMounted(() => {
  const storedItems = localStorage.getItem("users");
  if (storedItems) {
    items.value = JSON.parse(storedItems);
    items.value.forEach((item) => {
      item.isEditing = false;
    });
  }
});
</script>

<style scoped></style>
