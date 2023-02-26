<template>
    <div
        class="thumbnail-image overflow-hidden"
        :style="
            thumbnailView ? { 'background-image': 'url(' + data[selectedIndex].src + ')' } : null
        ">
        <FullScreen
            :imageUrl="imageUrl"
            :show="showFullScreen"
            @close="closeFullScreen"
            @next="plusIndex"
            @prev="minusIndex"
            @shuffleIndex="shuffleIndex"
            class="z-50" />

        <div class="thumbnail-image__change-mode">
            <Switch
                v-model="thumbnailView"
                class="mbnail-image__change-mode z-40"
                :class="[
                    thumbnailView ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                ]"
                @click.stop="thumbnailView ? (thumbnailView = false) : (thumbnailView = true)">
                <span
                    aria-hidden="true"
                    :class="[
                        thumbnailView ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    ]" />
            </Switch>
        </div>

        <div
            v-if="thumbnailView"
            class="w-full h-full relative"
            @click="openFullScreen(data[selectedIndex].src)">
            <div class="thumbnail-image__change-button--right" @click.stop="plusIndex" @mousedown.prevent>
                <ChevronRightIcon class="w-8 h-16" />
            </div>
            <div class="thumbnail-image__change-button--left" @click.stop="minusIndex" @mousedown.prevent>
                <ChevronLeftIcon class="w-8 h-16" />
            </div>

            <div class="thumbnail-image__info text-black relative">
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
                    @click.stop="shuffleIndex"
                    :class="{ rotate: isRotate }">
                    <transition name="rotate">
                        <ArrowPathIcon class="w-4 h-4" />
                    </transition>
                </div>
            </div>
        </div>
        <!--  -->
        <div v-if="!thumbnailView" class="w-full p-4">
            <h3 class="text-2xl font-bold mb-2">information</h3>
            <div class="flex justify-between mb-4 text-gray-400">
                <div
                    class="text-lg font-bold cursor-pointer"
                    :class="information == 'Positive' ? 'selectedInfo' : null"
                    @click.stop="toggleInformation('Positive')">
                    Prompt
                </div>
                <div
                    class="text-lg font-bold cursor-pointer"
                    :class="information == 'Negative' ? 'selectedInfo' : null"
                    @click.stop="toggleInformation('Negative')">
                    Negative Prompt
                </div>
            </div>
            <div class="information__prompt relative">
                <div v-if="information == 'Positive'">{{ data[selectedIndex].prompt }}</div>
                <div v-if="information == 'Negative'">{{ data[selectedIndex].negative }}</div>
            </div>
        </div>
    </div>
    <Transition name="fade">
        <Toast v-if="toastShow" :title="toastTitle" :description="toastDescription" />
    </Transition>
</template>

<script>
import { useImageDataStore } from '@/stores/imageDataStore.js';
import { ref, computed, onMounted } from 'vue';
import { Switch } from '@headlessui/vue';
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';
import Toast from '@/components/Toast.vue';
import FullScreen from '@/components/FullScreen.vue';

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
            console.log('testsgas')
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
        Toast,
        FullScreen,
    },
    data() {
        return {
            thumbnailView: true,
            isRotate: false,
            information: 'Positive',
            toastShow: false,
            toastTitle: 'SUCCESS',
            toastDescription: '클립보드에 복사하였습니다.',
            timeoutId: null,
            showFullScreen: false,
        };
    },
    computed: {
        imageUrl() {
            return this.data[this.selectedIndex].src
        }
    },
    methods: {
        toggleInformation(mode) {
            if (this.information == mode) {
                switch (mode) {
                    case 'Positive':
                        navigator.clipboard.writeText(this.data[this.selectedIndex].prompt);
                        this.triggerToast('SUCCESS', 'Positive Prompt가 클립보드에 저장되었습니다');
                        break;
                    case 'Negative':
                        navigator.clipboard.writeText(this.data[this.selectedIndex].negative);
                        this.triggerToast('SUCCESS', 'Negative Prompt가 클립보드에 저장되었습니다');
                        break;
                }
                return;
            }
            this.information = mode;
        },
        triggerToast(title, desc) {
            this.toastTitle = title;
            this.toastDescription = desc;
            this.toastShow = true;
            clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(() => {
                this.toastShow = false;
            }, 3000);
        },
        openFullScreen(url) {
            this.showFullScreen = true;
        },
        closeFullScreen() {
            this.showFullScreen = false;
        },
    },
};
</script>

<style scoped>
.thumbnail-image {
    width: 100%;
    height: 40rem;
    border: 4px solid black;
    border-radius: 1rem;
    background-size: cover;
    background-position: center center;
    position: relative;
    /* overflow: hidden; */
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
.information__prompt {
    width: 100%;
    height: 24rem;
    overflow: auto;
}

.selectedInfo {
    color: blueviolet;
}

@media screen and (min-width: 768px) {
    .thumbnail-image {
        height: 32rem;
    }
}
</style>
