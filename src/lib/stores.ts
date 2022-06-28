import { writable } from 'svelte/store';

export const video = writable<File | null>(null);

export const images = writable<string[]>([]);
