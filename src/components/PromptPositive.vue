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
                {{ filteredPrompt ? filteredPrompt : '단어를 선택해 주세요'}}
            </div>
        </div>
    </div>
    <Transition name="fade">
        <Toast v-if="toastShow" :title="toastTitle" :description="toastDescription" />
    </Transition>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';
import { computed, ref } from 'vue';
import Toast from '@/components/Toast.vue';

export default {
    components: { Toast },
    setup() {
        const imageDataStore = useImageDataStore();

        const filteredPrompt = computed(() => {
            return imageDataStore.positivePromptArr
                .map(word => word.replace(/"/g, '').trim())
                .join(', ');
        });

        // 토스트 시작
        const toastShow = ref(false);
        const toastTitle = ref('SUCCESS');
        const toastDescription = ref('클립보드에 복사하였습니다.');
        let timeoutId = null;

        const copyToClipboard = () => {
            navigator.clipboard.writeText(filteredPrompt.value);
            triggerToast();
        };

        const triggerToast = () => {
            if (!filteredPrompt.value) {
                toastTitle.value = 'FAILED';
                toastDescription.value = '복사할 내용이 없습니다';
            } else {
                toastTitle.value = 'SUCCESS';
                toastDescription.value = '클립보드에 복사하였습니다.';
            }
            toastShow.value = true;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                toastShow.value = false;
            }, 3000);
        };
        // 토스트 종료

        return {
            imageDataStore,
            filteredPrompt,
            copyToClipboard,
            toastShow,
            toastTitle,
            toastDescription,
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
