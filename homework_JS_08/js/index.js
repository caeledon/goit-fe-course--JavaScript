'use strict';

/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
*/

const galleryItems = [{
      preview: './img/amsterdam_400.jpg',
      fullview: './img/amsterdam_1200.jpg',
      alt: "alt text 1"
    },
    {
      preview: './img/berlin_400.jpg',
      fullview: './img/berlin_1200.jpg',
      alt: "alt text 2"
    },
    {
      preview: './img/brussell_400.jpg',
      fullview: './img/brussell_1200.jpg',
      alt: "alt text 3"
    },
    {
      preview: './img/london_400.jpg',
      fullview: './img/london_1200.jpg',
      alt: "alt text 4"
    },
    {
      preview: './img/madrid_400.jpg',
      fullview: './img/madrid_1200.jpg',
      alt: "alt text 5"
    },
    {
      preview: './img/paris_400.jpg',
      fullview: './img/paris_1200.jpg',
      alt: "alt text 6"
    },
    {
      preview: './img/prague_400.jpg',
      fullview: './img/prague_1200.jpg',
      alt: "alt text 7"
    },
    {
      preview: './img/rome_400.jpg',
      fullview: './img/rome_1200.jpg',
      alt: "alt text 8"
    },
    { 
      preview: './img/tallin_400.jpg',
      fullview: './img/tallin_1200.jpg',
      alt: "alt text 9"
    },
  ];

  const fullviewImg = document.createElement("img");
  fullviewImg.src = galleryItems[0].fullview;
  fullviewImg.alt = galleryItems[0].alt;
  
  function createFullviewPicture() {
    const fullviewContainer = document.createElement("div");
    fullviewContainer.classList.add("fullview");
  
    return fullviewContainer.appendChild(fullviewImg);
  }
  
  const picturesList = document.createElement("ul");
  picturesList.classList.add("preview");
  
  function createPicture({
    preview,
    fullview,
    alt
  }) {
    const previewImg = document.createElement("img");
    previewImg.src = preview;
    previewImg.dataset.fullview = fullview;
    previewImg.alt = alt;
  
    const listItem = document.createElement("li");
    listItem.classList.add("not-selected");
    listItem.appendChild(previewImg);
    picturesList.appendChild(listItem);
  
    return picturesList;
  }
  
  function createGallery(picture) {
    return picture.map(element => createPicture(element));
  }
  
  const galleryContainer = document.querySelector(".js-image-gallery");
  const gallery = createGallery(galleryItems);
  galleryContainer.append(createFullviewPicture());
  galleryContainer.append(...gallery);
  
  //-------------Событие------------------------------------
  
  const firstItem = picturesList.firstElementChild;
  const firstPicture = firstItem.querySelector("img");
  firstPicture.classList.add("selected");
  
  picturesList.addEventListener("click", handlePictureClick);
  
  function handlePictureClick(event) {
    event.preventDefault();
    const target = event.target;
    if (target.nodeName !== "IMG") return;
  
    fullviewImg.src = target.getAttribute("data-fullview");
    fullviewImg.alt = target.alt;
  
    setSelectedPicture(target);
  }
  
  function setSelectedPicture(nextPicture) {
    const currentPicture = document.querySelector(".selected");
    if (currentPicture) {
      currentPicture.classList.remove("selected");
    }
    nextPicture.classList.add("selected");
  }