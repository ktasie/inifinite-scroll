const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let photoObj = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// check if all images were loaded
function imageLoaded() {
  //console.log('image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    //console.log(`${loader}`);
    imagesLoaded = 0;
  }
}

// Create elements for links & photos, add to DOM
const displayPictures = async (picObj) => {
  let html;
  totalImages = picObj.length;
  picObj.forEach((el) => {
    html = `<a href='${el.links.html}' target='_blank'><img src='${el.urls.regular}' alt='${el.alt_description}' title='${el.alt_description}'></a>`;

    imageContainer.insertAdjacentHTML('beforeend', html);
  });

  //check if image has been loaded.
  const NodeList = document.querySelectorAll('img');
  NodeList.forEach((el) => {
    el.addEventListener('load', imageLoaded);
  });
  //console.log(picObj);
};

const fetchPictures = async () => {
  const apiEndPoint = 'https://api.unsplash.com/photos/random?client_id=API-KEY&count=10';
  try {
    photoObj = await (await fetch(apiEndPoint)).json();

    displayPictures(photoObj);
  } catch (error) {
    //Catch error here
  }
};

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  //   console.log('windowInnerHeight', window.innerHeight);
  //   console.log('scrollY', window.scrollY);
  //   console.log('offsetHeight', document.body.offsetHeight);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    fetchPictures();
  }
});

// Onload
fetchPictures();
