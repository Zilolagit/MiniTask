<template>
    <main class="main">
        <a-flex horizontal>
            <nav class="navigation">
                <NavigationMenu/>
            </nav>
            <section class="view">
                <RouterView/>
            </section>
        </a-flex>
    </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavigationMenu from "@/components/NaviagtionMenu.vue"
</script>

<style>
.navigation {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 20;
    border-right: 1px solid #eee;
}
.view {
    position: fixed;
    top: 0;
    left: 256px;
    width: calc(100% - 256px);
    height: 100%;   
    padding: 15px 25px;
    overflow: auto;
}

@media (max-width: 768px) {
    .navigation .ant-menu  {
        width: 70px !important;
    }
    .view {
        width: calc(100% - 70px);
        left: 70px;
    }
}
</style>