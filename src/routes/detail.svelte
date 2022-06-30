<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = ({ url }) => {
    return { props: { second: Number(url.searchParams.get('s')) } };
  };
</script>

<script lang="ts">
  import { FPS } from '$lib/const';
  import { timeFormat } from '$lib/util';
  import { useDetail } from '$lib/hooks';

  export let s: number;

  let i = 0;
  let j = 0;

  const { images, loading, create } = useDetail();

  images.subscribe((_) => (i = j));

  $: {
    create(s);
  }

  const previous = () => {
    if (i == 0) {
      j = FPS - 1;
      s = s - 1;
    } else {
      j = j - 1;
    }
  };

  const next = () => {
    if (i == FPS - 1) {
      j = 0;
      s = s + 1;
    } else {
      i = i + 1;
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
        <div class="text-lg text-gray-600">{timeFormat(s)}</div>
        <div class="align-right px-0 lg:px-32">
          <button
            class="bg-white hover:bg-white lg:border border-gray-500 text-gray-600 py-2 lg:px-6 rounded-full"
            on:click={(e) => {
              let link = document.createElement('a');
              link.href = $images[i];
              link.download = timeFormat(s) + '.png';
              link.click();
            }}
          >
            保存
          </button>
        </div>
      </div>
    </nav>
    <div class="flex-grow flex h-full justify-center items-center">
      {#if $loading && $images.length == 0}
        <div class="absolute animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      {:else if !$loading && $images.length == 0}
        <div>
          動画の読み込みに失敗しました<br />
          <a class="text-blue underline" href="/">こちら</a>からやり直してください。
        </div>
      {:else}
        <button
          disabled={s == 0 && i == 0}
          on:click={(e) => !$loading && previous()}
          class="-mr-5 hidden lg:block bg-white z-10 rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline  disabled:opacity-0"
        >
          <span class="block" style="transform: scale(-1);">&#x279c;</span>
        </button>
        <div class="relative h-full">
          <img
            src={$images[i]}
            on:click={(e) => {
              if ($loading) return;
              e.pageX < window.innerWidth / 2 ? previous() : next();
            }}
            class="object-contain h-full z-1"
            alt=""
          />
          {#if $loading}
            <div
              class="absolute top-0 bottom-0 right-0 left-0 m-auto animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"
            />
          {/if}
        </div>
        <button
          disabled={s == $images.length - 1 && i == $images.length - 1}
          on:click={(e) => !$loading && next()}
          class="-ml-5 hidden lg:block right-0 bg-white z-10 rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline disabled:opacity-0"
        >
          <span class="block" style="transform: scale(1);">&#x279c;</span>
        </button>
      {/if}
    </div>
  </div>
</body>
