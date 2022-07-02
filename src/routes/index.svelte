<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { timeFormat } from '$lib/util';
  import { useHome } from '$lib/hooks';
  import FileDrop from 'filedrop-svelte';

  const { images, loading, loadVideo, clearVideo } = useHome();

  const fileChangeHandler = async (e: CustomEvent) => {
    if (e.detail && e.detail.files) {
      loadVideo(e.detail.files.accepted[0]);
    }
  };
</script>

<body>
  <div class="flex flex-col h-screen">
    <nav class="sticky opacity-100 bg-white top-0 flex items-center justify-between flex-wrap bg-grey-darkest p-3 w-full z-10 pin-t">
      <div class="flex justify-between w-full">
        <div class="align-left px-0 lg:px-32">
          <a class="text-xl text-gray-800 no-underline hover:no-underline" href="/">動画から写真</a>
        </div>
        {#if 0 < $images.length}
          <div class="px-0 lg:px-32">
            <button class="bg-white hover:bg-white lg:border border-gray-500 text-gray-600 py-2 lg:px-4 rounded-full" on:click={clearVideo}>
              リセット
            </button>
          </div>
        {/if}
      </div>
    </nav>
    {#if $loading}
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
    {:else if 0 < $images.length}
      <div class="flex-grow px-0 lg:px-64 justify-center">
        <div class="grid grid-cols-3 lg:grid-cols-6 gap-1 p-0">
          {#each $images as image, i}
            <div class="w-full inset-0 relative">
              <img src={image} class="w-full h-32 object-cover object-center cursor-pointer" alt="" on:click={(e) => goto('detail?s=' + i)} />
              <div class="absolute w-full py-0 bottom-0 inset-x-0 text-white text-xs text-right">
                {timeFormat(i)}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex-grow flex flex-col justify-center items-center">
        <div class="max-w-xl bg-gray-50">
          <FileDrop accept=".mp4,.MOV,.webm,.mkv" on:filedrop={fileChangeHandler}>
            <div
              class="flex justify-center w-full h-32 px-16 lg:px-32 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            >
              <span class="flex items-center space-x-2 text-center"> 動画を選択してください<br />（MP4またはMOVのみ） </span>
            </div>
          </FileDrop>
        </div>
      </div>
    {/if}
    <div class="bottom-0">
      <footer class="flex flex-col py-8 bg-white text-black mt-2">
        <div class="container mx-auto px-4">
          <div class="sm:flex sm:flex-wrap md:py-4">
            <div class="px-4 lg:w-1/3">
              <ul class="text-sm">
                <li class="my-1">※このアプリはiPhoneに対応していません</li>
                <li class="my-1">※このアプリは10フレーム/1秒として画像を生成します</li>
                <li class="my-1">
                  ※このアプリのソースは<a class="underline" target="_blank" href="https://github.com/nrikiji/video-capture-web">こちら</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</body>
