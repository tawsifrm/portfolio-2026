import { writable } from 'svelte/store';

export type Section = 'landing' | 'home' | 'experience' | 'projects' | 'contact';

export const activeSection = writable<Section>('landing');

export function navigateToSection(section: Section) {
  activeSection.set(section);
}

export function setSection(section: Section) {
  activeSection.set(section);
}
