<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="email"
      :error-messages="emailError"
      label="Почта"
      placeholder="Иван01"
      outlined
      @input="validateEmail"
      autocomplete="email"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :error-messages="passwordError"
      label="Пароль"
      placeholder="Пароль"
      type="password"
      outlined
      @input="validatePassword"
      autocomplete="current-password"
    ></v-text-field>

    <v-select
      v-model="role"
      :error-messages="roleError"
      :items="props.roles"
      label="Роль"
      placeholder="Роль"
      outlined
      @change="validateRole"
    ></v-select>

    <v-label>Имя</v-label>
    <v-text-field
      v-model="formData.ru.name"
      :counter="50"
      :error-messages="nameRuError"
      label="По-русски"
      placeholder="Иван Иванов"
      outlined
      :disabled="isFieldDisabled('name', 'ru')"
      @input="validatField('name', 'ru')"
    ></v-text-field>
    <v-text-field
      v-model="formData.en.name"
      :counter="50"
      :error-messages="nameEnError"
      label="По-англйиски"
      placeholder="Ivan Ivanov"
      outlined
      :disabled="isFieldDisabled('name', 'en')"
      @input="validatField('name', 'en')"
    ></v-text-field>
    <v-text-field
      v-model="formData.ka.name"
      :counter="50"
      :error-messages="nameKaError"
      label="По-грузински"
      placeholder="შეიყვანეთ სახელი"
      outlined
      :disabled="isFieldDisabled('name', 'ka')"
      @input="validatField('name', 'ka')"
    ></v-text-field>

    <v-label>Должность</v-label>
    <v-text-field
      v-model="formData.ru.position"
      :counter="50"
      :error-messages="positionRuError"
      label="По-русски"
      placeholder="Должность"
      outlined
      :disabled="isFieldDisabled('position', 'ru')"
      @input="validatField('position', 'ru')"
    ></v-text-field>
    <v-text-field
      v-model="formData.en.position"
      :counter="50"
      :error-messages="positionEnError"
      label="По-англйиски"
      placeholder="Admin"
      outlined
      :disabled="isFieldDisabled('position', 'en')"
      @input="validatField('position', 'en')"
    ></v-text-field>
    <v-text-field
      v-model="formData.ka.position"
      :counter="50"
      :error-messages="positionKaError"
      label="По-грузински"
      placeholder="შეიყვანეთ"
      outlined
      :disabled="isFieldDisabled('position', 'ka')"
      @input="validatField('position', 'ka')"
    ></v-text-field>

    <v-label>Номер телефона</v-label>
    <v-text-field
      v-model="phone"
      :counter="15"
      :error-messages="phoneError"
      label="Номер телефона"
      placeholder="+79999999999"
      outlined
      @input="validatePhone"
    ></v-text-field>

    <v-label>Телеграмм</v-label>
    <v-text-field
      v-model="telegram"
      :counter="50"
      :error-messages="telegramError"
      label="Телеграмм"
      placeholder="Telegram"
      outlined
      @input="validateTelegram"
    ></v-text-field>

    <v-label>Подпись</v-label>
    <v-text-field
      v-model="formData.ru.signature"
      :counter="200"
      :error-messages="signatureRuError"
      label="По-русски"
      placeholder="Подпись"
      outlined
      :disabled="isFieldDisabled('signature', 'ru')"
      @input="validatField('signature', 'ru')"
    />
    <v-text-field
      v-model="formData.en.signature"
      :counter="200"
      :error-messages="signatureEnError"
      label="По-англйиски"
      placeholder="Подпись"
      outlined
      :disabled="isFieldDisabled('signature', 'en')"
      @input="validatField('signature', 'en')"
    />
    <v-text-field
      v-model="formData.ka.signature"
      :counter="200"
      :error-messages="signatureKaError"
      label="По-грузински"
      placeholder="Подпись"
      outlined
      :disabled="isFieldDisabled('signature', 'ka')"
      @input="validatField('signature', 'ka')"
    />

    <v-btn class="me-4" type="submit">Сохранить</v-btn>
    <v-btn @click="closeModal">Отмена</v-btn>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  dialog: Boolean,
  addItem: Function,
  roles: Array,
});

const emit = defineEmits(["update:dialog"]);

const email = ref("");
const password = ref("");
const role = ref(null);
const phone = ref("");
const telegram = ref("");
const formData = ref({
  ru: { name: "", position: "", signature: "" },
  en: { name: "", position: "", signature: "" },
  ka: { name: "", position: "", signature: "" },
});
const emailError = ref("");
const passwordError = ref("");
const roleError = ref("");
const phoneError = ref("");
const telegramError = ref("");
const signatureRuError = ref("");
const signatureEnError = ref("");
const signatureKaError = ref("");
const nameRuError = ref("");
const nameEnError = ref("");
const nameKaError = ref("");
const positionRuError = ref("");
const positionEnError = ref("");
const positionKaError = ref("");
const currentLang = ref("ru");

const isFieldDisabled = (field, lang) => {
  const filledFields = [
    formData.value.ru[field],
    formData.value.en[field],
    formData.value.ka[field],
  ].filter(Boolean).length;

  if (filledFields >= 0) {
    return filledFields > 0 && !formData.value[lang][field];
  }
  return false;
};

const validateEmail = () => {
  emailError.value = /\S+@\S+\.\S+/.test(email.value)
    ? ""
    : "Введите правильный email";
};

const validatePassword = () => {
  passwordError.value = password.value.trim() ? "" : "Пароль обязателен";
};

const validateRole = () => {
  roleError.value = role.value ? "" : "Пожалуйста, выберите роль";
};

const validatePhone = () => {
  const phonePattern = /^\+?\d{10,15}$/;

  if (phone.value && !phonePattern.test(phone.value)) {
    phoneError.value = "Введите корректный номер телефона";
  } else {
    phoneError.value = "";
  }
};

const validateTelegram = () => {
  telegramError.value = telegram.value.trim() ? "" : "Телеграмм обязателен";
};

const validatField = (field, lang) => {
  const name = formData.value[lang][field];
  const errorKey = `${field}${
    lang.charAt(0).toUpperCase() + lang.slice(1)
  }Error`;
  if (lang === "ru" && !/^[а-яА-ЯёЁ\s]+$/.test(name)) {
    eval(`${errorKey}.value = "Только русский текст"`);
  } else if (lang === "en" && !/^[a-zA-Z\s]+$/.test(name)) {
    eval(`${errorKey}.value = "Only English text"`);
  } else if (lang === "ka" && !/^[\u10A0-\u10FF\s]+$/.test(name)) {
    eval(`${errorKey}.value = "Only Georgian text"`);
  } else {
    eval(`${errorKey}.value = ""`);
  }
};

const getSelectedField = (field) => {
  const fieldData = formData.value[currentLang.value][field];

  if (fieldData) {
    return fieldData;
  }

  for (const lang of ["ru", "en", "ka"]) {
    if (formData.value[lang][field]) {
      return formData.value[lang][field];
    }
  }

  return "";
};

const selectedName = computed(() => getSelectedField("name"));
const selectedPosition = computed(() => getSelectedField("position"));
const selectedSignature = computed(() => getSelectedField("signature"));

const closeModal = () => {
  emit("update:dialog", false);
};

const submit = () => {
  const newUser = {
    name: selectedName.value,
    position: selectedPosition.value,
    email: email.value,
    password: password.value,
    role: role.value,
    phone: phone.value,
    telegram: telegram.value,
    signature: selectedSignature.value,
  };

  props.addItem(newUser);
  emit("update:dialog", false);
};
</script>
