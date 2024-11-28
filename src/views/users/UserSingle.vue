<template>
   <div v-if="user">
    <RouterLink to="/users">
      <a-button type="primary" shape="circle" class="user__icon" :icon="h(ArrowLeftOutlined)" />
    </RouterLink>
    <h2>User Details</h2>
    <p><strong>Name:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Website:</strong> {{ user.website }}</p>
    <p><strong>Address:</strong> {{ user.address?.city }},{{ user.address?.street }},  {{ user.address?.suite }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, h } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
const route = useRoute();

const id = route.params.id;

const user = ref(null);

onMounted( async () => {
  try {
    const reponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/`)
    user.value = reponse.data
  }
  catch (error){
    console.log(error);
  }
})

</script>

<style scoped>
.user__icon  {
  margin-bottom: 20px;
}

</style>