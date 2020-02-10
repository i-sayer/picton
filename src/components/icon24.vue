<template>
    <svg viewBox="0 0 24 24"><use :href="'#'+icon-id" /></svg>
</template>

<script>
export default {
    name: "icon24",
    props: {'iconId': String}
}
</script>