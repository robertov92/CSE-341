document.addEventListener('DOMContentLoaded', () => {

    const submitBtn = document.getElementById('submitName');
    submitBtn.addEventListener('click', () => {
        const newName = document.getElementById('newName').value;
        // Fetches the insert route on the server but with the
        // method POST. Pretty cool hu!
        fetch('/prove/prove10/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName })
            })
            .then(() => {
                document.getElementById('newName').value = '';
                populateList();
            })
            .catch(err => {
                // Clear the input
                document.getElementById('newName').value = ''
                console.error(err)
            })
    });

    const populateList = () => {
        const nameList = document.getElementById('nameList');
        // Fetches the fetchAll route on the server the same way
        // you know know
        fetch('/prove/prove10/fetchAll')
            .then(res => res.json())
            .then(data => {
                // Clear the list first
                while (nameList.firstChild) nameList.firstChild.remove();

                for (const avenger of data.avengers) {
                    const li = document.createElement('li');
                    li.appendChild(document.createTextNode(avenger.name));
                    nameList.appendChild(li);
                }
            })
            .catch(err => {
                console.log(err);
            })
    };

    populateList();
});