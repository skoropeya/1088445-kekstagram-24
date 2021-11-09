import { getData } from './api.js';
import { showAlert } from './utils/show-alert.js';
import { showPreviews } from './gallery.js';
import './full-photo.js';
import { onLoaderFileChange } from './upload-form.js';

const loaderFile = document.querySelector('#upload-file');

document.addEventListener('DOMContentLoaded', () => {
  getData( (posts) => {
    showPreviews(posts);
    // console.log(posts);
  }, showAlert);
});

loaderFile.addEventListener('change', onLoaderFileChange);
