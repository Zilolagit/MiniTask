<template>
  <div>
    <!-- Search Input -->
    <div class="user__search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="Search by name"
        @input="handleSearchInput"
      />
    </div>

    <!-- User Table -->
    <a-table
      :columns="columns"
      :data-source="paginatedData"
      :pagination="paginationOptions"
      bordered
      class="user-table"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="['name', 'email', 'phone', 'address', 'actions'].includes(column.dataIndex)">
          <div>
            {{ text }}
          </div>
        </template>
        <template v-if="column.dataIndex === 'actions'">
          <RouterLink :to="`/users/${record.key}`">
            <EyeOutlined style="font-size: 17px;" />
          </RouterLink>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { EyeOutlined } from '@ant-design/icons-vue';
import { RouterLink } from 'vue-router';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    width: '20%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '40%',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    width: '10%',
  },
];

const data = ref([]);
const searchValue = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

onMounted(async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    data.value = response.data.map((user) => ({
      key: user.id,
      name: user.name || 'Not given',
      phone: user.phone,
      address: user?.address?.city,
      email: user.email || 'Not given',
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const handleSearchInput = () => {
  currentPage.value = 1;
};

const paginatedData = computed(() => {
  const filteredData = data.value.filter((user) =>
    user.name.toLowerCase().includes(searchValue.value.toLowerCase())
  );

  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredData.slice(startIndex, endIndex);
});

const paginationOptions = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: data.value.length,
  showSizeChanger: true,
  onChange: (page, size) => {
    currentPage.value = page;
    pageSize.value = size;
  },
}));
</script>

<style scoped>
.user__search {
  text-align: end;
  margin-top: 30px;
  margin-bottom: 23px;
}

.user-table {
  overflow: auto;
}
</style>
