# Reusable/Dynamic Modal for Vue 3

## Features 
- Teleport based
- Slot based
- Customizable via props
- A11y
- Custom transitions (slot content)

## Install
WIP

## Basic setup
First ... (WIP)

Then we insert it in the template
```vue
<template>
  <DynamicModal></DynamicModal>
</template>
```

To better handle the logic of this modal anywhere in our App without declaring a global store or drilling props, we can make use of  [Vue Composables](https://vuejs.org/guide/reusability/composables.html#composables).


Within a our composables folder(or any folder where you place logic utils), create a `useModal.ts`
```ts
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
```
And thats it! Now we can manage our modal from anywhere or even have multiple modals by just importing this composable

#### Example 
```vue
<script setup lang="ts">
import { useModal } from "./your/path/";

const modal = useModal()

</script>

<template>
  <DynamicModal :controller="modal"></DynamicModal>
</template>
```
Thanks to our composable, each variable will hold a different modal instance meaning, if you want another button opening a different modal we can just create another variable

```vue
<script setup lang="ts">
import { useModal } from "./your/path/";

const modal = useModal()

const anotherModal = useModal()
//...
</script>

```

## Props
Now that we have our basic setup ready, let's see the props available to manage our component

| Name                  | Type       | Default    | Description                                         |
| --------              | ---------- | ---------- | --------------------------------------------------- |
| controller **(required)** | `Object`   | `undefined`| The modal expects the composable object returned from `useModal.ts` to handle logic |
| teleport              | `String`   | `body`     | This will allow us to select any teleport location, if not declared, it will automatically teleport the modal to our `document.body` |
| defaultPosition       | `Boolean`  | `false`    | By default the modal has no set position, if we want to quickly center our modal we can pass this prop | 
| closeOnBackground     | `Boolean`  | `false`    | Sometimes we want to be able to close modals by clickin outside of our container. Setting this option to true will allow us to do just that! |
| customTransition      | `Boolean`  | `false`    | By default the sloted content will have a `CSS scale()` animation. To disable this animation or create a custom one, enable this option |
| styling               | `Object`   | `{}`       | The modal comes with some default styles declared, to customize it, pass any css properties via the styling object `:styling="{ display: 'grid', placeItems: 'center', background: 'transparent' }"` |

## Usage examples
WIP


