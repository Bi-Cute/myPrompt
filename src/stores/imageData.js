import { defineStore } from 'pinia';

export const useImageDataStore = defineStore('imageData', {
    state: () => ({
        version: '0.10.00',
        positivePromptArr: [],
        negativePromptArr: [],
        data: [
            {
                no: 1, // Number,
                date: '2023-02-12', // Date,
                prompt: `(((masterpiece))), (((highres))), (((ultra-detailed))), (((illustration))), (((intricate))), (((extremely detailed))), (((soft lighting))), (((soft light))), (((soft focus))), ((1girl)), (((short hair))), (((black hair))), (((braid one's hair))), (((wearing a simple choker))), (((white coat))), (((black shirt))), ((small round breasts)), ((light brown eyes)), (((right pupil))), (((left pupil))), ((blushing)), ((smiling)), ((beautiful face)), ((looking at viewer)), white background, viewfinder`,
                negative: `lowres, bad anatomy, bad hands, mutated hand, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, out of focus, glowing eyes, (((multiple views))), (((bad proportions))), (((multiple legs))), (((multiple arms))), 3D, bad_prompt, (worst quality:2.0), (low quality:2.0), inaccurate limb, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, tall, (painting by bad-artist-anime:0.9), (painting by bad-artist:0.9), bad-prompt:0.5, watermark, text, error, blurry, jpeg artifacts, cropped, normal quality, jpeg artifacts, signature, watermark, username, artist name, (worst quality, low quality:1.4), bad anatomy, low quality lowres, low quality lowres low polygon 3D game, low quality lowres `, // Array,
                model: 'anything_4_webui', // String,
                width: '768', // Number,
                height: '512', // Number,
                steps: '32', // Number,
                method: 'DPM++ 2M Karras', // String,
                scale: '8', // Number,
                seed: 1859708917, // Number,
                src: './images/01.png',
            },
            {
                no: 2, // Number,
                date: '2023-02-13', // Date,
                prompt: `(masterpiece, best quality, ultra-detailed), (((detailed background, bloom, depth of field))), (best illumination, an extremely delicate and beautiful), detailed scenery, dramatic light, colorful, ((realistic)), hyper detail, finely detailed eyes and detailed face, (1girl, solo,sharp_face, orange hair, spiky long hair, hair, red_eyes, red hero armor, Flower_earrings, ((many swords around)), ((magic circle)), intricate details, focus_face`, // Array,
                negative: `HyperStylizeV6,bad face, bad anatomy, bad proportions, bad perspective, multiple views, concept art, reference sheet, mutated hands and fingers, interlocked fingers, twisted fingers, excessively bent fingers, more than five fingers, lowres, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, low quality lowres multiple breasts, low quality lowres mutated hands and fingers, more than two arms, more than two hands, more than two legs, more than two feet, low quality lowres long body, low quality lowres mutation poorly drawn, low quality lowres black-white, low quality lowres bad anatomy, low quality lowres liquid body`, // Array,
                model: 'anything_4', // String,
                width: '768', // Number,
                height: '512', // Number,
                steps: '40', // Number,
                method: 'DPM++ 2M Karras', // String,
                scale: '8', // Number,
                seed: 3962032591, // Number,
                src: './images/02.png',
            },
            {
                no: 3, // Number,
                date: '2023-02-14', // Date,
                prompt: '(masterpiece, best quality, ultra-detailed), (((detailed background, bloom, depth of field))), (best illumination, an extremely delicate and beautiful), detailed scenery, dramatic light, colorful, ((realistic)), hyper detail, finely detailed eyes and detailed face, (1girl, solo,sharp_face, orange hair, spiky long hair, hair, red_eyes, red hero armor, Flower_earrings, ((many swords around)), ((magic circle)), intricate details, focus_face', // Array,
                negative:
                    'HyperStylizeV6,bad face, bad anatomy, bad proportions, bad perspective, multiple views, concept art, reference sheet, mutated hands and fingers, interlocked fingers, twisted fingers, excessively bent fingers, more than five fingers, lowres, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, low quality lowres multiple breasts, low quality lowres mutated hands and fingers, more than two arms, more than two hands, more than two legs, more than two feet, low quality lowres long body, low quality lowres mutation poorly drawn, low quality lowres black-white, low quality lowres bad anatomy, low quality lowres liquid body', // Array,
                model: 'anything_4', // String,
                width: '768', // Number,
                height: '512', // Number,
                steps: '40', // Number,
                method: 'DPM++ 2M Karras', // String,
                scale: '8', // Number,
                seed: 3962032603, // Number,
                src: './images/03.png',
            },
        ],
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
