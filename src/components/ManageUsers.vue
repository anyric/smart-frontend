<template>
    <div class="dashboard">
        <ManageUsers></ManageUsers>
    </div>
</template>

<script>
import ManageUsers from '@/components/ManageUsers';
export default {
    name: "dash-board",
    components: {
        ManageUsers
    }
};
</script>