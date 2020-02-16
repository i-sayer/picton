<template>
    <svg viewBox="0 0 24 24" width="24"><use :href="'#'+iconId" /></svg>
</template>

<script>
export default {
    name: "icon24",
    props: {'iconId': String}
}
</script>