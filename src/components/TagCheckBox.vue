<template>
    <div class="tag-check-box">
        {{ favoriteWords }}
    </div>
</template>

<script>
import { useImageDataStore } from '@/stores/imageData.js';

export default {
    setup() {
        const { data } = useImageDataStore();

        // 각 prompt를 쉼표로 나눈 후, 쉼표 앞뒤에 공백을 제거한 뒤, 빈 문자열이 아닌 경우에만 배열에 추가합니다.
        const words = data.reduce((prev, curr) => {
            const splitted = curr.prompt.split(',');
            const trimmed = splitted.map(item => item.trim());
            const filtered = trimmed.filter(item => item !== '');

            return prev.concat(filtered);
        }, []);

        // 각 단어가 나타난 횟수를 셉니다.
        const counts = words.reduce((prev, curr) => {
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

        // 횟수가 가장 많은 순서로 단어를 정렬합니다.
        const sortedWords = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

        // 정렬된 단어를 이용하여 새로운 배열을 만듭니다.
        const favoriteWords = sortedWords.slice(0, 20);

        return { favoriteWords };
    },
};
</script>

<style scoped>
.tag-check-box {
    width: 100%;
    height: 32rem;
    border: 1px solid black;
    border-radius: 1rem;
}
</style>
