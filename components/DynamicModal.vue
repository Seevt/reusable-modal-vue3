<script setup lang="ts">
import type { PropType } from 'vue';
import type { ModalController } from '../composables/useModal'


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
    }
})

// needs single quotes
const position = {
    display: props.defaultPosition ? 'grid' : '',
    placeItems: props.defaultPosition ? 'center' : '',
}

</script>

<template>
    <Teleport to="body">
        <Transition name="__outer-fade">
            <div role="dialog" aria-modal="true" @click.self="props.closeOnBackground ? props.controller.close() : null"
                v-show="props.controller.show.value" class="__modal-outer-background">
                <template v-if="!customTransition">
                    <Transition name="__inner-transition">
                        <slot v-if="props.controller.show.value" />

                    </Transition>
                </template>
                <slot v-else />
            </div>
        </Transition>
    </Teleport>
</template>

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

.__modal-outer-background {
    position: fixed;
    left: 0;
    top: 0;

    z-index: 500;

    width: 100vw;
    height: 100vh;

    background: rgba(0, 0, 0, 0.2);

    display: v-bind('position.display');
    place-items: v-bind('position.placeItems');
}
</style>