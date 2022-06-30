import { videoTo1FpsImages, videoTo10FpsImages, load, unlink } from './ffmpeg';
import { writable } from 'svelte/store';

const { subscribe: subImages, update: updImages } = writable<string[]>([]);

export const useHome = () => {
  const { subscribe: subLoading, update: updLoading } = writable(false);
  const loadVideo = async (file: File) => {
    updLoading(() => true);
    await load(file);
    const images = await videoTo1FpsImages();
    updImages(() => images);
    updLoading(() => false);
  };
  const clearVideo = () => {
    unlink();
    updImages(() => []);
  };
  return { images: { subscribe: subImages }, loading: { subscribe: subLoading }, loadVideo, clearVideo };
};

export const useDetail = () => {
  const { subscribe: subImages, update: updImages } = writable<string[]>([]);
  const { subscribe: subLoading, update: updLoading } = writable(false);
  const create = async (second: number) => {
    updLoading(() => true);
    const images = await videoTo10FpsImages(second);
    updImages(() => images);
    updLoading(() => false);
  };
  return { images: { subscribe: subImages }, loading: { subscribe: subLoading }, create };
};
