<template>
    <div class="tag-check-box">
        <div class="w-full h-full flex flex-col relative">
            <div class="tag-check-box__header">
                <div class="flex justify-between p-4">
                    <h3 class="font-bold text-red">
                        Most used
                        <span
                            class="font-bold text-xl"
                            :class="{
                                'text-indigo-600': mode === 'Positive',
                                'text-red-500': mode === 'Negative',
                            }">
                            {{ mode }}
                        </span>
                        Prompt
                    </h3>
                    <div class="flex justify-end gap-2">
                        <button
                            class="border py-1 px-4 rounded-lg text-red-600 border-red-500"
                            @click="clearPrompt">
                            Clear
                        </button>
                        <button
                            class="border py-1 px-4 rounded-lg"
                            :class="mode == 'Positive' ? 'bg-indigo-600 text-white' : null"
                            @click="mode = 'Positive'">
                            Positive
                        </button>
                        <button
                            class="border py-1 px-4 rounded-lg"
                            :class="mode == 'Negative' ? 'bg-indigo-600 text-white' : null"
                            @click="mode = 'Negative'">
                            Negative
                        </button>
                    </div>
                </div>
            </div>
            <div class="tag-check-box__prompt-words-container">
                <!-- Positive Prompt -->
                <div
                    v-if="mode == 'Positive'"
                    v-for="(word, index) in favoritePositiveWords"
                    :key="word"
                    class="tag-check-box__item"
                    @click="togglePositiveCheckBox(word)">
                    <div class="w-full h-full overflow-hidden">
                        <div class="flex justify-between mb-1 pointer">
                            <div class="text-xs text-gray-400">
                                No. {{ (index + 1).toString().padStart(3, '0') }}
                            </div>
                            <input
                                :id="word"
                                :name="word"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                :checked="imageDataStore.positivePromptArr.includes(word)" />
                        </div>
                        <div class="mr-4 text-sm">
                            <label :for="word" class="font-sm text-gray-700" @click.stop>
                                {{ word }}
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Negative Prompt -->
                <div
                    v-if="mode == 'Negative'"
                    v-for="(word, index) in favoriteNegativeWords"
                    :key="word"
                    class="tag-check-box__item"
                    @click="toggleNegativeCheckBox(word)">
                    <div class="w-full h-full overflow-hidden">
                        <div class="flex justify-between mb-1 pointer">
                            <div class="text-xs text-gray-400">
                                No. {{ (index + 1).toString().padStart(3, '0') }}
                            </div>
                            <input
                                :id="word"
                                :name="word"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                :checked="imageDataStore.negativePromptArr.includes(word)" />
                        </div>
                        <div class="mr-4 text-sm">
                            <label :for="word" class="font-sm text-gray-700" @click.stop>
                                {{ word }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageDataStore.js';

export default {
    setup() {
        const { data } = useImageDataStore();

        // 각 prompt를 쉼표로 나눈 후, 쉼표 앞뒤에 공백을 제거한 뒤, 빈 문자열이 아닌 경우에만 배열에 추가합니다.
        const positiveWords = data.reduce((prev, curr) => {
            const splitted = curr.prompt.split(',');
            const trimmed = splitted.map(item => item.trim());
            const filtered = trimmed.filter(item => item !== '');

            return prev.concat(filtered);
        }, []);

        const negativeWords = data.reduce((prev, curr) => {
            const splitted = curr.negative.split(',');
            const trimmed = splitted.map(item => item.trim());
            const filtered = trimmed.filter(item => item !== '');

            return prev.concat(filtered);
        }, []);

        // 각 단어가 나타난 횟수를 셉니다.
        const positiveWordCounts = positiveWords.reduce((prev, curr) => {
            // 괄호로 감싸인 단어의 경우 괄호를 제거합니다.
            const word = curr.replace(/[()]/g, '').trim();

            if (word !== '' && !word.includes(':')) {
                if (word in prev) {
                    prev[word]++;
                } else {
                    prev[word] = 1;
                }
            }
            return prev;
        }, {});

        const negativeWordCounts = negativeWords.reduce((prev, curr) => {
            const word = curr.replace(/[()]/g, '').trim();

            if (word !== '' && !word.includes(':')) {
                if (word in prev) {
                    prev[word]++;
                } else {
                    prev[word] = 1;
                }
            }
            return prev;
        }, {});

        // 횟수가 가장 많은 순서로 단어를 정렬합니다.
        const positiveSortedWords = Object.keys(positiveWordCounts).sort(
            (a, b) => positiveWordCounts[b] - positiveWordCounts[a],
        );
        const negativeSortedWords = Object.keys(negativeWordCounts).sort(
            (a, b) => negativeWordCounts[b] - negativeWordCounts[a],
        );

        // 정렬된 단어를 이용하여 새로운 배열을 만듭니다.
        const favoritePositiveWords = positiveSortedWords.slice(0, 100);
        const favoriteNegativeWords = negativeSortedWords.slice(0, 100);

        // 프롬프트 배열 만들기
        const imageDataStore = useImageDataStore();
        const togglePositiveCheckBox = word => {
            imageDataStore.inputPositivePrompt(word);
        };
        const toggleNegativeCheckBox = word => {
            imageDataStore.inputNegativePrompt(word);
        };
        const clearPrompt = () => {
            imageDataStore.clearPrompt();
        };

        return {
            data,
            favoritePositiveWords,
            favoriteNegativeWords,
            imageDataStore,
            togglePositiveCheckBox,
            toggleNegativeCheckBox,
            clearPrompt,
        };
    },
    data() {
        return {
            mode: 'Positive',
        };
    },
};
</script>

<style scoped>
.tag-check-box {
    width: 100%;
    height: 40rem;
    border: 4px solid black;
    border-radius: 1rem;
}

.tag-check-box__item {
    font-size: 0.875rem;
    line-height: 1.25rem;
    height: 6rem;
    border-width: 1px;
    padding: 0.5rem;
    cursor: pointer;
}
.tag-check-box__prompt-words-container {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: auto;
    position: relative;
    border: none;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-bottom: 1rem;
}
@media screen and (min-width: 640px) {
    .tag-check-box__prompt-words-container {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
}
@media screen and (min-width: 768px) {
    .tag-check-box {
        width: 100%;
        height: 32rem;
    }
}
</style>
