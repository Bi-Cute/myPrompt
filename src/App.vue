<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header class="mb-4">
        <div class="w-full flex justify-between">
            <h1 class="text-3xl font-bold cursor-pointer" @click="$router.push('/')">My Prompt</h1>
            <img alt="site logo" class="w-10 h-10" src="@/assets/logo.png" />
        </div>

        <nav v-if="false">
            <RouterLink to="/">Home</RouterLink>
            <!-- <RouterLink to="/about">About</RouterLink> -->
        </nav>
    </header>
    <router-view></router-view>
</template>

<style scoped>

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}
</style>
