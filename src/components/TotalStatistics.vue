<template>
    <div class="total-statistics">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="p-4">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    Applicant Information
                </h3>
                <!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and application.
                </p> -->
            </div>
            <div class="border-t border-gray-200 p-4">
                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">Total Data</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ data.length }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">Full Capacity</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ totalSize }} MB</dd>
                    </div>
                    <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">Last Update</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ getLastUpdate }}</dd>
                    </div>
                    <div class="sm:col-span-1">
                        <dt class="text-sm font-medium text-gray-500">Version</dt>
                        <dd class="mt-1 text-sm text-gray-900"> {{ data.version }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';
import { ref, computed } from 'vue';

export default {
    setup() {
        const imageDataStore = useImageDataStore();

        const data = ref(imageDataStore.data);
        const totalSize = ref(null);

        const getTotalImageSize = async () => {
            let total = 0;
            for (const image of data.value) {
                const response = await fetch(image.src);
                const blob = await response.blob();
                total += blob.size;
            }
            totalSize.value = (total / (1024 * 1024)).toFixed(2); // 바이트 단위를 메가바이트 단위로 환산하여 저장
        };

        return {
            data,
            totalSize,
            getTotalImageSize,
        };
    },

    mounted() {
        this.getTotalImageSize();
    },
    computed: {
        getLastUpdate() {
            // 현재 페이지가 마지막으로 수정된 날짜 및 시간을 가져올수 있습니다
            const lastModified = new Date(document.lastModified);
            const year = lastModified.getFullYear();
            const month = lastModified.getMonth() + 1;
            const day = lastModified.getDate();
            return `${year}.${month < 10 ? '0' + month : month}.${day < 10 ? '0' + day : day}`;
        },
    },
};
</script>

<style scoped>
.total-statistics {
    width: 100%;
    height: 12rem;
    border: 1px solid black;
    border-radius: 1rem;
    overflow: hidden;
}
</style>
