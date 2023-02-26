<template>
    <div
        class="thumbnail-image"
        :style="
            thumbnailView ? { 'background-image': 'url(' + data[selectedIndex].src + ')' } : null
        ">
        <div class="thumbnail-image__change-mode">
            <Switch
                v-model="thumbnailView"
                class="mbnail-image__change-mode"
                :class="[
                    thumbnailView ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                ]"
                @click="thumbnailView ? (thumbnailView = false) : (thumbnailView = true)">
                <span
                    aria-hidden="true"
                    :class="[
                        thumbnailView ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    ]" />
            </Switch>
        </div>

        <div class="thumbnail-image__change-button--right" @click="plusIndex">
            <ChevronRightIcon class="w-8 h-16" />
        </div>
        <div class="thumbnail-image__change-button--left" @click="minusIndex">
            <ChevronLeftIcon class="w-8 h-16" />
        </div>

        <div v-if="thumbnailView" class="thumbnail-image__info text-black relative">
            <div class="absolute font-bold top-4 right-4">No. {{ data[selectedIndex].no }}</div>
            <div class="font-bold">
                <span class="text-zinc-600">SIZE:</span>
                {{ data[selectedIndex].width }} x {{ data[selectedIndex].height }}
            </div>
            <div class="font-bold">
                <span class="text-zinc-600">MODEL:</span>
                {{ data[selectedIndex].model }}
            </div>
            <div class="font-bold">
                <span class="text-zinc-600">METHOD:</span>
                {{ data[selectedIndex].method }}
            </div>
            <div class="font-bold">
                <span class="text-zinc-600">STPES:</span>
                {{ data[selectedIndex].steps }} /
                <span class="text-zinc-600">SCALE:</span>
                {{ data[selectedIndex].scale }}
            </div>
            <div class="font-bold">
                <span class="text-zinc-600">SEED:</span>
                {{ data[selectedIndex].seed }}
            </div>
            <div class="font-bold">
                <span class="text-zinc-600">CREATED:</span>
                {{ data[selectedIndex].date }}
            </div>
            <div
                class="thumbnail-image__change-button--suffle"
                @click="shuffleIndex"
                :class="{ rotate: isRotate }">
                <transition name="rotate">
                    <ArrowPathIcon class="w-4 h-4" />
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';
import { ref, computed, onMounted } from 'vue';
import { Switch } from '@headlessui/vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

export default {
    setup() {
        const imageDataStore = useImageDataStore();

        const data = ref(imageDataStore.data);

        onMounted(() => {
            imageDataStore.selectedIndexReset();
        });

        const selectedIndex = computed(() => {
            return imageDataStore.selectedIndex;
        });
        const minusIndex = () => {
            imageDataStore.minusSelectedIndex();
        };
        const plusIndex = () => {
            imageDataStore.plusSelectedIndex();
        };
        const shuffleIndex = () => {
            imageDataStore.suffleSelectedIndex();
        };
        return {
            data,
            selectedIndex,
            plusIndex,
            minusIndex,
            shuffleIndex,
        };
    },
    components: {
        Switch,
        ChevronRightIcon,
        ChevronLeftIcon,
        ArrowPathIcon,
    },
    data() {
        return {
            thumbnailView: true,
            isRotate: false,
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
.thumbnail-image__change-button--right {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
}
.thumbnail-image__change-button--left {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
}
.thumbnail-image__info {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    width: 90%;
    height: 8rem;
    border: 2px solid black;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 1rem;
    padding: 1rem;
    font-size: 0.75rem;
    line-height: 1.3;
}
.thumbnail-image__change-button--suffle {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
    opacity: 0.3;
    border-radius: 0.5rem;
}

.rotate-enter-active {
    transition: all 1s ease-in-out;
}
.rotate-enter {
    transform: rotate(0);
}
.rotate-enter-to {
    transform: rotate(360deg);
}
</style>
