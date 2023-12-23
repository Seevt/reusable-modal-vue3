import { ref } from "vue";

export type ModalController = ReturnType<typeof useModalController>;

export function useModalController() {
  const show = ref(false);
  return {
    show,
    open: () => (show.value = true),
    close: () => (show.value = false),
  };
}
