<script lang="ts">
    import { page } from "$app/stores";
</script>

<h1>{$page.status}: {$page.error?.message ?? "An Unknown error ocurred"}</h1>
