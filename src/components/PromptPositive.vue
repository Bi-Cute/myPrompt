<template>
    <div class="prompt-positive">
        <div class="overflow-hidden bg-white sm:rounded-lg">
            <div class="flex justify-between p-4">
                <div>
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Prompt</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        긍정적인 의미를 가진 단어들 입니다.
                    </p>
                </div>
                <button @click="copyToClipboard">COPY</button>
            </div>
            <div class="h-24 border-t border-gray-200 p-4 overflow-scroll">
                {{ filteredPrompt }}
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';
import { computed } from 'vue';

export default {
    setup() {
        const imageDataStore = useImageDataStore();

        const filteredPrompt = computed(() => {
            return imageDataStore.positivePromptArr
                .map(word => word.replace(/"/g, '').trim())
                .join(', ');
        });

        const copyToClipboard = () => {
            navigator.clipboard.writeText(filteredPrompt.value);
        };

        return {
            imageDataStore,
            filteredPrompt,
            copyToClipboard,
        };
    },
};
</script>

<style scoped>
.prompt-positive {
    width: 100%;
    height: 12rem;
    border: 1px solid black;
    border-radius: 1rem;
    overflow: hidden;
}
</style>
