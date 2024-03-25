<script lang="ts">
    import type { User } from "@prisma/client";
    import { onMount } from "svelte";
    let users: User[] = [];

    let is_loading = false;

    const createUser = async () => {
        is_loading = true;
        const response = await fetch("/api/user", { method: "POST" });

        if (!response.ok) {
            alert("Failed to create user");
        }
        await fetchUsers();
        is_loading = false;
    };

    const fetchUsers = async () => {
        is_loading = true;
        const response = await fetch("/api/user");

        if (response.ok) {
            users = await response.json();
        }
        is_loading = false;
    };

    const clearUsers = async () => {
        is_loading = true;
        const response = await fetch("/api/user", { method: "DELETE" });

        if (!response.ok) {
            alert("Failed to clear users");
        }
        await fetchUsers();
        is_loading = false;
    };

    onMount(fetchUsers);
</script>

<h1>Minimal Prisma PlanetScale Example on Vercel Edge Functions</h1>
<p>
    This is a basic example of using Prisma with PlanetScale on Vercel Edge
    Functions, using the new database adapters preview feature.
</p>

<hr />

<button on:click={createUser}>Create a User</button>
<button on:click={clearUsers}>Clear Users</button>

<h3>User Results</h3>

{#if is_loading}
    <p>Loading...</p>
{:else}
    <br />
{/if}
<ul>
    {#each users as user}
        <li><b>{user.name}</b> - {user.email}</li>
    {/each}
</ul>
