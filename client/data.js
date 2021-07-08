/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

async function fetchData() {
  // eslint-disable-next-line
  const response = await fetch('/content');
  let message;
  if (response.ok) {
    message = await response.json();
  } else {
    message = { msg: 'failed to load messages :-(' };
  }
  for (let p = 0; p < message.length; p++) {
    const file = message[p];
    const table = document.querySelector('#content-table');
    let rowCount = 0;
    const rows = table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].getElementsByTagName('td').length > 0) {
        rowCount++;
      }
    }
    const row = table.insertRow(rowCount + 1);
    row.insertCell(0).textContent = file.file_name;
    row.insertCell(1).textContent = file.file_similarity;
    if (file.similar_file === '') {
      document.querySelector('#current-message').textContent = 'This file is fine';
    } else {
      document.querySelector('#current-message').textContent = 'This file is similar to ' + file.similar_file;
    }
  }
}

document.querySelector('#dropzone').addEventListener('drop', function (e) {
  e.preventDefault();
  document.querySelector('#dropzone').style.border = '4px dashed #009578';
  upload(e.dataTransfer.files);
});

document.getElementById('submit-button').addEventListener('click', reload);

function reload() {
  location.reload();
}

async function upload(files) {
  const fileTypes = ['text/x-python-script', 'text/plain', 'text/javascript', 'text/html', 'text/css'];
  // text/x-python-script, text/plain, text/javascript, text/html, text/css
  for (let i = 0; i < files.length; i++) {
    if (!fileTypes.includes(files[i].type)) {
      console.log('hi');
      document.querySelector('#current-message').textContent = 'you have not uploaded a valid file';
      break;
    }

    const opts = {
      method: 'POST',
      body: new FormData(),
    };
    opts.body.append('fileID', files[i], files[i].name);
    try {
      const response = await fetch('/upload', opts);
      console.log(response);
      if (response.ok) {
        const obj = await response.json();
        console.log(obj);
      }
    } catch (e) {
      console.log('');
    }
  }
  document.querySelector('#current-message').textContent = 'There are files waiting to be submitted';
}

window.addEventListener('load', fetchData);
