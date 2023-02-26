<template>
    <main class="main-section">
        <ThumbnailImage />
        <TagCheckBox class="col-span-2" />
    </main>
    <div class="statistics-section grid grid-cols-3 gap-4">
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

<style>
.main-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}
.statistics-section {
    display: flex;
    flex-direction: column;
}

@media screen and (min-width: 768px) {
    .main-section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .statistics-section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>
