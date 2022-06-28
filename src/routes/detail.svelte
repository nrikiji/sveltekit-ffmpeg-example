<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = ({ url }) => {
    return { props: { second: Number(url.searchParams.get('s')) } };
  };
</script>

<script lang="ts">
  import { FPS } from '$lib/const';
  import { timeFormat } from '$lib/util';
  import { convert10FPS } from '$lib/ffmpeg';
  import { video, images } from '$lib/stores';
  import { goto } from '$app/navigation';

  export let no: number = 0;
  export let second: number;
  export let loading = true;

  let tmpNo = 0;
  let frames: string[] = [];

  $: {
    convert(second);
  }

  const convert = async (second: number) => {
    if ($video == null) return;
    loading = true;
    frames = [...(await convert10FPS(second, $video!))];
    no = tmpNo;
    loading = false;
  };

  const previous = () => {
    if (no == 0) {
      tmpNo = FPS - 1;
      second = second - 1;
    } else {
      no = no - 1;
    }
  };

  const next = () => {
    if (no == FPS - 1) {
      tmpNo = 0;
      second = second + 1;
    } else {
      no = no + 1;
    }
  };
</script>

<body>
  <div class="flex flex-col h-screen">
    <nav class="sticky opacity-100 bg-white top-0 flex items-center justify-between flex-wrap bg-grey-darkest p-3 w-full z-10 pin-t">
      <div class="flex justify-between w-full">
        <div class="align-left px-0 lg:px-32">
          <button class="bg-white hover:bg-white lg:border border-gray-500 text-gray-600 py-2 lg:px-6 rounded-full" on:click={(e) => history.back()}>
            戻る
          </button>
        </div>
        <div class="text-lg text-gray-600">{timeFormat(second)}</div>
        <div class="align-right px-0 lg:px-32">
          <button
            class="bg-white hover:bg-white lg:border border-gray-500 text-gray-600 py-2 lg:px-6 rounded-full"
            on:click={(e) => {
              let link = document.createElement('a');
              link.href = frames[no];
              link.download = timeFormat(second) + '.png';
              link.click();
            }}
          >
            保存
          </button>
        </div>
      </div>
    </nav>
    <div class="flex-grow flex h-full justify-center items-center">
      {#if $video == null}
        <div>
          動画の読み込みに失敗しました<br />
          <a class="text-blue underline" href="/">こちら</a>からやり直してください。
        </div>
      {:else if loading && frames.length == 0}
        <div class="absolute animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      {:else}
        <button
          disabled={second == 0 && no == 0}
          on:click={(e) => !loading && previous()}
          class="-mr-5 hidden lg:block bg-white z-10 rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline  disabled:opacity-0"
        >
          <span class="block" style="transform: scale(-1);">&#x279c;</span>
        </button>
        <div class="relative h-full">
          <img
            src={frames[no]}
            on:click={(e) => {
              if (loading) return;
              e.pageX < window.innerWidth / 2 ? previous() : next();
            }}
            class="object-contain h-full z-1"
            alt=""
          />
          {#if loading}
            <div
              class="absolute top-0 bottom-0 right-0 left-0 m-auto animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"
            />
          {/if}
        </div>
        <button
          disabled={second == $images.length - 1 && no == frames.length - 1}
          on:click={(e) => !loading && next()}
          class="-ml-5 hidden lg:block right-0 bg-white z-10 rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline disabled:opacity-0"
        >
          <span class="block" style="transform: scale(1);">&#x279c;</span>
        </button>
      {/if}
    </div>
  </div>
</body>
