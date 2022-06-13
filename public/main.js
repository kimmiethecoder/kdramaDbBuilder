document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)

async function updateEntry() {
    try {
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementsByName('name')[0].value,
                title: document.getElementsByName('title')[0].value,
                image: document.getElementsByName('image')[0].value,
                numberOfEpisodes: document.getElementsByName('numberOfEpisodes')[0].value,
                originalRelease: document.getElementsByName('originalRelease')[0].value,
                leadActors: document.getElementsByName('leadActors')[0].value,
                networks: document.getElementsByName('networks')[0].value,
                synopsis: document.getElementsByName('synopsis')[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function deleteEntry() {
    const input = document.getElementById('deleteInput')
    try {
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}