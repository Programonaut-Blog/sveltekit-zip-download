<script>
    let img;

    async function downloadGET() {
		let res = await fetch(`/download?img=${encodeURIComponent(img)}`, {
			method: 'GET',
		});

		let blob = await res.blob();
		var url = window.URL || window.webkitURL;
		let link = url.createObjectURL(blob);

        // generate anchor tag, click it for download and then remove it again
		let a = document.createElement("a");
		a.setAttribute("download", `image.zip`);
		a.setAttribute("href", link);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

    async function downloadPOST() {
		const data = {"img": img};

		let res = await fetch('/download', {
			method: 'POST',
			body: JSON.stringify(data)
		});

		let blob = await res.blob();
		var url = window.URL || window.webkitURL;
		let link = url.createObjectURL(blob);

        // generate anchor tag, click it for download and then remove it again
		let a = document.createElement("a");
		a.setAttribute("download", `image.zip`);
		a.setAttribute("href", link);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}

</script>

<div class="button-container">
    <div>Image URL: <input type="url" name="image-url" bind:value={img}></div>
    <button on:click={downloadGET}>Download Zip</button>
</div>

<style>
    .button-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        font-family: sans-serif;
    }

    .button-container > button {
        width: 128px;
        height: 48px;
        background-color: black;
        color: white;
        font-weight: bold;
        border: none;
    }

    .button-container > button:hover {
        background-color: white;
        color: black;
        outline: black solid 2px;
    }
</style>