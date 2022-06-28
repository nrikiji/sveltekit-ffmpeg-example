import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { timeFormat } from './util';
import { FPS } from './const';

const VIDEO_KEY = "video"

let ffmpeg = createFFmpeg({ log: true });
ffmpeg.load();

export const load = async (file: File) => {
  ffmpeg.FS('writeFile', VIDEO_KEY, await fetchFile(file));
}

export const unlink = () => {
  ffmpeg.FS('unlink', VIDEO_KEY);
}

export const convert1FPS = async (file: File) => {
  let images: string[] = [];
  try {
    await ffmpeg.run('-i', VIDEO_KEY, '-vf', 'fps=1', 'out%d.png');

    for (let i = 1; ; i++) {
      const data = ffmpeg.FS('readFile', 'out' + i + '.png');
      const blob = new Blob([data.buffer], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      images = [...images, url];
      ffmpeg.FS('unlink', 'out' + i + '.png');
    }
  } catch (e) {
    console.log(e);
  }
  return images;
};

export const convert10FPS = async (second: number, file: File) => {
  let images: string[] = [];
  let start = timeFormat(second);
  let end = timeFormat(second + 1);
  try {
    await ffmpeg.run('-i', VIDEO_KEY, '-ss', start, '-to', end, '-vf', 'fps=10', 'frame%d.png');

    for (let i = 1; i <= FPS; i++) {
      const data = ffmpeg.FS('readFile', 'frame' + i + '.png');
      const blob = new Blob([data.buffer], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      images = [...images, url];
      ffmpeg.FS('unlink', 'frame' + i + '.png');
    }
  } catch (e) {
    console.log(e);
  }
  return images;
};
