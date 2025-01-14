<script lang="ts">
    import { onMount } from 'svelte';
    let inputData: string = '';
    let result: {
        originalData: string;
        detectedEncoding: string;
        decodedData: string;
    } | null = null;

    async function handleSubmit(event: Event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('inputData', inputData);

        const response = await fetch('/', {
            method: 'POST',
            body: formData,
        });

        result = await response.json();
    }
</script>

<h1>Encoding Fixer</h1>

<form on:submit={handleSubmit}>
    <label for="inputData">Enter Data:</label><br>
    <textarea id="inputData" bind:value={inputData} rows="5" cols="40"></textarea><br><br>
    <button type="submit">Process</button>
</form>

{#if result}
{console.log(result)}
    <h2>Result:</h2>
    <p><strong>Original Data:</strong> {result.decodedData}</p>
    <p><strong>Detected Encoding:</strong> {result.detectedEncoding}</p>
    <p><strong>Decoded Data:</strong> {result.decodedData}</p>
{/if}
