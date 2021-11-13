import { getData } from './api.js';
import { showAlert } from './show-alert.js';
import { showPreviews, setPictureClick } from './gallery.js';
import { onLoaderFileChange } from './upload-form.js';
import { setFiltersClick } from './filters.js';

const loaderFile = document.querySelector('#upload-file');

document.addEventListener('DOMContentLoaded', () => {
  getData( (posts) => {
    showPreviews(posts);
    setPictureClick(posts);
    setFiltersClick(posts);
  }, showAlert);
});

loaderFile.addEventListener('change', onLoaderFileChange);
