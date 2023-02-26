<template>
    <main class="grid grid-cols-3 gap-4 mb-4">
        <ThumbnailImage />
        <TagCheckBox class="col-span-2" />
    </main>
    <div class="grid grid-cols-3 gap-4">
        <PromptPositive />
        <PromptNegative />
        <TotalStatistics />
    </div>
</template>

<script>
import ThumbnailImage from '../components/ThumbnailImage.vue';
import TagCheckBox from '../components/TagCheckBox.vue';
import PromptPositive from '../components/PromptPositive.vue';
import PromptNegative from '../components/PromptNegative.vue';
import TotalStatistics from '../components/TotalStatistics.vue';

export default {
    components: {
        ThumbnailImage,
        TagCheckBox,
        PromptPositive,
        TotalStatistics,
        PromptNegative,
    },
};
</script>
