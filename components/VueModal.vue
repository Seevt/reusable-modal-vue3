
<template>
  <template v-if="!disableTeleport">
    <Teleport :to="props.teleport">
      <Transition name="__outer-fade">
        <div
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          v-show="props.controller.show.value">
          <div
            @click.self="
              props.closeOnBackground ? props.controller.close() : null
            "
            :style="__modal_outer_background">
            <template v-if="!customTransition">
              <Transition name="__inner-transition">
                <slot v-if="props.controller.show.value" />
              </Transition>
            </template>
            <slot v-else />
          </div>
        </div>
      </Transition>
    </Teleport>
  </template>
  <template v-else>
    <Transition name="__outer-fade">
      <div
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        v-show="props.controller.show.value">
        <div
          @click.self="
            props.closeOnBackground ? props.controller.close() : null
          "
          :style="__modal_outer_background">
          <template v-if="!customTransition">
            <Transition name="__inner-transition">
              <slot v-if="props.controller.show.value" />
            </Transition>
          </template>
          <slot v-else />
        </div>
      </div>
    </Transition>
  </template>
</template>

<script setup lang="ts">
    import { computed, onUnmounted } from 'vue'
  import type { PropType, CSSProperties } from "vue";
  import type { ModalController } from "@/composables/useModal";

  const props = defineProps({
    controller: {
      type: Object as PropType<ModalController>,
      required: true,
    },
    closeOnBackground: {
      type: Boolean,
      default: false,
    },
    customTransition: {
      type: Boolean,
      default: false,
    },
    defaultPosition: {
      type: Boolean,
      default: false,
    },
    styling: {
      type: Object as PropType<CSSProperties>,
    },
    teleport: {
      type: String,
      default: "body",
    },
    disableUnmount: {
      type: Boolean,
      default: false,
    },
    disableTeleport: {
      type: Boolean,
      default: false,
    },
  });

  const __modal_outer_background = computed<CSSProperties>(() => {
    return {
      display: props.defaultPosition ? "grid" : "",
      position: "fixed",
      left: 0,
      top: 0,

      zIndex: 500,

      width: "100vw",
      height: "100svh",

      background: "rgba(0, 0, 0, 0.2)",

      placeItems: props.defaultPosition ? "center" : "initial",

      ...props.styling,
    };
  });

  onUnmounted(() => {
    if (props.disableUnmount) return;
    props.controller.close();
  });
</script>

<style scoped>
  .__outer-fade-enter-from,
  .__outer-fade-leave-to {
    opacity: 0;
  }

  .__outer-fade-enter-active,
  .__outer-fade-leave-active {
    transition: 0.25s ease opacity;
  }

  .__inner-transition-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }

  .__inner-transition-leave-to {
    transform: scale(0.8);
  }

  .__inner-transition-enter-active,
  .__inner-transition-leave-active {
    transition: 0.25s ease all;
  }
</style>

