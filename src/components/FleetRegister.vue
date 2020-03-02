<template>
    <div class="dashboard">
        <FleetRegister></FleetRegister>
    </div>
</template>

<script>
import FleetRegister from '@/components/FleetRegister';
export default {
    name: "fleet-register",
    components: {
        FleetRegister
    }
};
</script>