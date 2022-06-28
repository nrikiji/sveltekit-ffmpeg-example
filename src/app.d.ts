/// <reference types="@sveltejs/kit" />

//import { FFmpeg } from '@ffmpeg/ffmpeg/src/index.d.ts';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare type FileDropEvent = import("filedrop-svelte/lib/event").FileDropEvent;
declare type FileDropSelectEvent = import("filedrop-svelte/lib/event").FileDropSelectEvent;
declare type FileDropDragEvent = import("filedrop-svelte/lib/event").FileDropDragEvent;
declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onfiledrop?: (event: CustomEvent<FileDropSelectEvent> & { target: EventTarget & T }) => void;
        onfiledrop?: (event: CustomEvent<FileDropSelectEvent> & { target: EventTarget & T }) => void;
        onfiledragenter?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        onfiledragleave?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        onfiledragover?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        onfiledialogcancel?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
        onfiledialogclose?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
        onfiledialogopen?: (event: CustomEvent<FileDropEvent> & { target: EventTarget & T }) => void;
        onwindowfiledragenter?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        onwindowfiledragleave?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
        onwindowfiledragover?: (event: CustomEvent<FileDropDragEvent> & { target: EventTarget & T }) => void;
    }
}

// declare global {
//   interface Window {
//     FFmpeg: FFmpeg;
//   }
// }
