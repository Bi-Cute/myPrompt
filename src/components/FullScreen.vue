<template>
    <div class="full-screen" v-if="show" @click.stop="close">
        <div class="thumbnail-image__change-button--right" @click.stop="next" @mousedown.prevent>
            <ChevronRightIcon class="w-8 sm:w-12 md:w-16 h-16 text-white" />
        </div>
        <div class="thumbnail-image__change-button--left" @click.stop="prev" @mousedown.prevent>
            <ChevronLeftIcon class="w-8 sm:w-12 md:w-16 h-16 text-white" />
        </div>
        <div class="image-container">
            <img :src="imageUrl" ref="image" />
            <div class="absolute w-64 bottom-4 right-4 font-bold text-white">
                <div class="thumbnail-image__info text-black relative">
                    <div class="font-bold">
                        <span class="text-zinc-600">SIZE:</span>
                        {{ data[selectedIndex].width }} x {{ data[selectedIndex].height }}
                    </div>
                    <div v-if="data[selectedIndex].model" class="font-bold">
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
                    <div v-if="data[selectedIndex].seed" class="font-bold">
                        <span class="text-zinc-600">SEED:</span>
                        {{ data[selectedIndex].seed }}
                    </div>
                    <div v-if="data[selectedIndex].date" class="font-bold">
                        <span class="text-zinc-600">CREATED:</span>
                        {{ data[selectedIndex].date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageDataStore.js';
import { ref, computed } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

export default {
    components: {
        ChevronRightIcon,
        ChevronLeftIcon,
        ArrowPathIcon,
    },
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
    props: {
        imageUrl: String,
        show: Boolean,
    },
    data() {
        return {
            isRotate: false,
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
        next() {
            this.$emit('next');
        },
        prev() {
            this.$emit('prev');
        },
        shuffle() {
            console.log('test');
            this.$emit('shuffleIndex');
        },
    },
};
</script>

<style scoped>
.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container {
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.image-container img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

button {
    margin-top: 1rem;
}
.thumbnail-image__info {
    height: auto;
    border: 2px solid black;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 1rem;
    padding: 1rem;
    font-size: 0.75rem;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
</style>
