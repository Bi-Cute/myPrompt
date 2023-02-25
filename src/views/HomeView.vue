<template>
    <main class="grid grid-cols-3 gap-4 mb-4">
        <ThumbnailImage />
        <TagCheckBox class="col-span-2" />
    </main>
    <div class="grid grid-cols-3 gap-4">
        <TotalStatistics />
        <TotalStatistics />
        <TotalStatistics />
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';

import ThumbnailImage from '../components/ThumbnailImage.vue';
import TagCheckBox from '../components/TagCheckBox.vue';
import TotalStatistics from '../components/TotalStatistics.vue';

export default {
    setup() {
    },
    components: {
        ThumbnailImage,
        TagCheckBox,
        TotalStatistics,
    },
};
</script>
