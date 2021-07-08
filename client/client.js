/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

window.addEventListener('load', () => {
  document.querySelector('#login-container').style.display = 'block';
});

// eslint-disable-next-line no-unused-vars
function onSignIn(googleUser) {
  document.querySelector('#login-container').style.display = 'none';
  document.querySelector('#home-container').style.display = 'block';
  document.querySelector('#user-info-container').style.display = 'block';
  document.querySelector('#table-container').style.display = 'block';
  const profile = googleUser.getBasicProfile();
  document.querySelector('#name').textContent = profile.getName();
  document.querySelector('#email').textContent = profile.getEmail();
  document.querySelector('#image').setAttribute('src', profile.getImageUrl());
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

// drag drop functionality
document.querySelector('#dropzone').addEventListener('dragover', (e) => {
  e.preventDefault();
  document.querySelector('#dropzone').style.border = '4px solid #009578';
});

document.querySelector('#dropzone').addEventListener('dragleave', () => {
  document.querySelector('#dropzone').style.border = '4px dashed #009578';
});
