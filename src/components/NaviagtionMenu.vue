<template>
    <div>
        <div>
            <a-menu
                v-model:selectedKeys="state.selectedKeys"
                style="width: 256px"
                mode="inline"
                :open-keys="state.openKeys"
                :items="menuItems"
                @select="onSelect"
                @openChange="onOpenChange"
            />
        </div>
    </div>
</template>

<script setup>
import { reactive, h } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, FormOutlined, CommentOutlined } from '@ant-design/icons-vue';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        label, 
        children,
        type,
    };
}

const router = useRouter();

const menuItems = reactive([
    getItem('Users', '', h(UserOutlined)),
    getItem('Posts', 'posts', h(FormOutlined)),
    getItem('Comments', 'comments', h(CommentOutlined)),
]);

const state = reactive({
    rootSubmenuKeys: ['users', 'posts', 'comments'],
    selectedKeys: [],
    openKeys: [],
});

const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => !state.openKeys.includes(key));
    state.openKeys = state.rootSubmenuKeys.includes(latestOpenKey) ? [latestOpenKey] : [];
};

const onSelect = ({ key }) => {
    state.selectedKeys = [key];
    router.push(`/${key}`);

};
</script>
