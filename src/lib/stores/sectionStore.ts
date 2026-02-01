import { writable } from 'svelte/store';

export type Section = 'home' | 'experience' | 'projects' | 'contact';

export const activeSection = writable<Section>('home');

export function navigateToSection(section: Section) {
  activeSection.set(section);
}
