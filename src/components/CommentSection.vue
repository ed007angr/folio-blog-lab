<template>
  <section>
    <h2 class="folio-serif h3 mb-2">Обсуждение</h2>
    <p class="text-secondary mb-3 col-lg-8">
      Короткий отклик к материалам ленты. Новый текст уходит родителю и появляется в списке.
    </p>
    <form class="mb-3" @submit.prevent="submit">
      <div class="d-flex align-items-start gap-3">
        <img class="folio-avatar" :src="avatar" alt="" width="48" height="48" />
        <div class="flex-grow-1">
          <BFormTextarea
            v-model="draft"
            rows="3"
            placeholder="Напишите комментарий…"
            aria-label="Текст комментария"
            :class="{ 'border-success': focused }"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.enter.exact.prevent="submit"
          />
          <div class="d-flex justify-content-between align-items-center gap-3 mt-2">
            <span v-if="!draft.trim()" class="small text-secondary">Введите текст, чтобы отправить</span>
            <span v-else class="small folio-ready">Можно отправить</span>
            <BButton type="submit" variant="primary" :disabled="!draft.trim()">
              Post
            </BButton>
          </div>
        </div>
      </div>
    </form>
    <ul v-if="comments.length" class="list-unstyled d-flex flex-column gap-2 mb-0">
      <li v-for="comment in comments" :key="comment.id" class="bg-white border rounded-3 p-3">
        <span class="d-block small fw-semibold mb-1">{{ comment.author }}</span>
        <p class="mb-0">{{ comment.text }}</p>
      </li>
    </ul>
    <p v-else class="text-secondary mb-0">Пока нет комментариев</p>
  </section>
</template>

<script>
import { BButton, BFormTextarea } from "bootstrap-vue-next";
import avatar from "../assets/svg/avatar-placeholder.svg";

export default {
  name: "CommentSection",
  components: {
    BButton,
    BFormTextarea,
  },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  emits: ["add-comment"],
  data() {
    return {
      draft: "",
      focused: false,
      avatar,
    };
  },
  methods: {
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    submit() {
      const text = this.draft.trim();
      if (!text) {
        return;
      }
      this.$emit("add-comment", text);
      this.draft = "";
    },
  },
};
</script>

<style scoped>
.folio-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background: #e7e5e4;
  flex: none;
}

.folio-ready {
  color: var(--folio-green);
  font-weight: 600;
}
</style>
