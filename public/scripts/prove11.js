document.addEventListener('DOMContentLoaded', () => {
    // initialize socket.io-client
    const socket = io();
    // if 'update-list' (which comes from index.js line 87 in root folder), repopulate the list
    socket.on('update-list', () => {
        populateList();
    });

    const submitBtn = document.getElementById('submitName');
    submitBtn.addEventListener('click', () => {
        const newName = document.getElementById('newName').value;
        fetch('/prove/prove11/insert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName })
            })
            .then(() => {
                document.getElementById('newName').value = '';
                populateList();
                // when a new name is created, emit 'new-name' (see index.js line 87 in root folder)
                socket.emit('new-name');
            })
            .catch(err => {
                document.getElementById('newName').value = ''
                console.error(err)
            })
    });

    const populateList = () => {
        const nameList = document.getElementById('nameList');

        fetch('/prove/prove11/fetchAll')
            .then(res => res.json())
            .then(data => {
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