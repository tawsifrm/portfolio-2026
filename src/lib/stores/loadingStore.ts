import { writable } from 'svelte/store';

export const isLoading = writable<boolean>(true);

export function finishLoading() {
  isLoading.set(false);
}
