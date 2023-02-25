<template>
    <div
        class="thumbnail-image"
        :style="{ 'background-image': 'url(' + data[selectedIndex].src + ')' }">
        <div class="thumbnail-image__change-mode"></div>
        <div class="thumbnail-image__info"></div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';
import { ref, computed } from 'vue';

export default {
    setup() {
        const imageDataStore = useImageDataStore();

        const data = ref(imageDataStore.data);

        const selectedIndex = computed(() => {
            return imageDataStore.selectedIndex;
        });

        return {
            data,
            selectedIndex,
        };
    },
};
</script>

<style scoped>
.thumbnail-image {
    width: 100%;
    height: 32rem;
    border: 4px solid black;
    border-radius: 1rem;
    background-size: cover;
    background-position: center center;
    position: relative;
}
.thumbnail-image__change-mode {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 5rem;
    height: 2rem;
    border: 2px solid red;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
}
.thumbnail-image__info {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    width: 90%;
    height: 8rem;
    border: 2px solid black;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
}
</style>
