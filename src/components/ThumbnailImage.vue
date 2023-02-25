<template>
    <div class="thumbnail-image">

    </div>
</template>

<script>

</script>

<style scoped>
.thumbnail-image {
    width: 100%;
    height: 32rem;
    border: 1px solid black;
    border-radius: 1rem;
    background-size: cover;
    background-position: center center;
    position: relative;
}
.thumbnail-image__change-mode {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 5rem;
    height: 2rem;
    border: 2px solid red;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
}
.thumbnail-image__info {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    width: 90%;
    height: 8rem;
    border: 2px solid black;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
}
</style>
