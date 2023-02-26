import { defineStore } from 'pinia';
import imageData from './data.js'

export const useImageDataStore = defineStore('imageDataStore', {
    state: () => ({
        version: '0.10.00',
        positivePromptArr: [],
        negativePromptArr: [],
        data: imageData,
        selectedIndex: 0,
    }),
    actions: {
        selectedIndexReset() {
            this.selectedIndex = Math.floor(Math.random() * this.data.length);
        },
        plusSelectedIndex() {
            if (this.selectedIndex >= this.data.length - 1) {
                this.selectedIndex = 0;
                return;
            }
            this.selectedIndex++;
        },
        minusSelectedIndex() {
            if (this.selectedIndex <= 0) {
                this.selectedIndex = this.data.length - 1;
                return;
            }
            this.selectedIndex--;
        },
        suffleSelectedIndex() {
            let newIndex = Math.floor(Math.random() * this.data.length);
            while (newIndex === this.selectedIndex) {
                newIndex = Math.floor(Math.random() * this.data.length);
            }
            this.selectedIndex = newIndex;
        },
        inputPositivePrompt(word) {
            if (this.positivePromptArr.includes(word)) {
                this.positivePromptArr.splice(this.positivePromptArr.indexOf(word), 1);
            } else {
                this.positivePromptArr.push(word);
            }
        },
        inputNegativePrompt(word) {
            if (this.negativePromptArr.includes(word)) {
                this.negativePromptArr.splice(this.negativePromptArr.indexOf(word), 1);
            } else {
                this.negativePromptArr.push(word);
            }
        },
        clearPrompt() {
            this.positivePromptArr = [];
            this.negativePromptArr = [];
        },
    },
});
