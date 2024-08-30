const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview');

function downloadNewPicture () {
  console.log('!')
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    preview.children[0].src = URL.createObjectURL(file);
  }
};

export {downloadNewPicture};
