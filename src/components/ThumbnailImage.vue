<template>
    <div
        class="thumbnail-image"
        :style="thumbnailView ? { 'background-image': 'url(' + data[selectedIndex].src + ')' } : null">
        <div class="thumbnail-image__change-mode">
            <Switch
                v-model="thumbnailView"
                class="mbnail-image__change-mode"
                :class="[
                    thumbnailView ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                ]"
                @click="thumbnailView ? thumbnailView = false : thumbnailView = true">
                <span
                    aria-hidden="true"
                    :class="[
                        thumbnailView ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    ]" />
            </Switch>
        </div>
        <div v-if="thumbnailView" class="thumbnail-image__info"></div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';
import { ref, computed } from 'vue';
import { Switch } from '@headlessui/vue'

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
            Switch
        };
    },
    data() {
        return {
            thumbnailView: true,
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
    width: 3.125rem;
    height: 1.875rem;
    border: 4px solid black;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    align-items: center;
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
