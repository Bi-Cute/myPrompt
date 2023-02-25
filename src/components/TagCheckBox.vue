<template>
    <div class="tag-check-box">
        <div class="w-full h-full overflow-auto relative">
            <div class="tag-check-box__header">
                <div class="mb-2">
                    <h3 class="font-bold">{{ mode }} Prompt</h3>
                    <div class="flex justify-end gap-2 mb-2">
                        <button
                            class="border py-1 px-4 rounded-lg bg-blue-600 text-white"
                            @click="mode = 'Positive'">
                            Positive
                        </button>
                        <button
                            class="border py-1 px-4 rounded-lg bg-stone-800 text-white"
                            @click="mode = 'Negative'">
                            Negative
                        </button>
                    </div>
                </div>
            </div>
            <div class="w-full grid grid-cols-4 overflow-auto relative border-none">
                <!-- Positive Prompt -->
                <div
                    v-if="mode == 'Positive'"
                    v-for="word in favoritePositiveWords"
                    :key="word"
                    class="tag-check-box__item"
                    @click="toggleCheck(word)">
                    <div class="w-full h-full overflow-hidden">
                        <div class="flex justify-end mb-1 pointer">
                            <input
                                :id="word"
                                :name="word"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                :checked="positivePrompt.includes(word)" />
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
                    v-for="word in favoriteNegativeWords"
                    :key="word"
                    class="tag-check-box__item"
                    @click="toggleCheck(word)">
                    <div class="w-full h-full overflow-hidden">
                        <div class="flex justify-end mb-1 pointer">
                            <input
                                :id="word"
                                :name="word"
                                type="checkbox"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                :checked="positivePrompt.includes(word)" />
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
import { useImageDataStore } from '@/stores/imageData.js';
import Checkbox from 'primevue/checkbox';

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
        const favoritePositiveWords = positiveSortedWords.slice(0, 28);
        const favoriteNegativeWords = negativeSortedWords.slice(0, 28);

        return { favoritePositiveWords, favoriteNegativeWords };
    },
    data() {
        return {
            mode: 'Positive',
            positivePrompt: [],
        };
    },
    methods: {
        toggleCheck(word) {
            if (this.positivePrompt.includes(word)) {
                this.positivePrompt.splice(this.positivePrompt.indexOf(word), 1);
            } else {
                this.positivePrompt.push(word);
            }
        },
    },
};
</script>

<style scoped>
.tag-check-box {
    width: 100%;
    height: 32rem;
    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;
}
.tag-check-box__header {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
    border-bottom: 1px solid gray;
}

.tag-check-box__item {
    font-size: 0.875rem;
    line-height: 1.25rem;
    height: 6rem;
    border-width: 1px;
    padding: 0.5rem;
    cursor: pointer;
}
</style>
