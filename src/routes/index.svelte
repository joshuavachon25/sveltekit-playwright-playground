<script>
    let sec = 0
    let img = ""
    async function getScreenshot(){
        const rep = await fetch(`/api/screenshot?url=https://www.humati.ca&pause=${sec * 1000}`)
        let chat = await rep.json()
        console.log(chat)
        img = chat.image
    }
</script>

<img src={img} alt="ABC" height="400">
<button on:click={getScreenshot}>Test</button>