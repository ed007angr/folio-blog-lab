import { ref } from "vue";

/**
 * Локальное состояние в стиле хука useState.
 * Внешние библиотеки состояния не используются.
 *
 * @template T
 * @param {T | (() => T)} initialValue
 * @returns {[import("vue").Ref<T>, (next: T | ((prev: T) => T)) => void]}
 */
export function useState(initialValue) {
  const state = ref(
    typeof initialValue === "function" ? initialValue() : initialValue
  );

  const setState = (next) => {
    state.value = typeof next === "function" ? next(state.value) : next;
  };

  return [state, setState];
}
