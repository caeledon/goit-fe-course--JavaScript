const favLinksList = document.querySelector('.js-fav-pages-list');
import linkTpl from "../templates/templates.hbs";
import * as LS from './ls';



function fetchAPI (url){
    const keyAPI = '5c8a795154b726205b11554ae09686d1186cd15744a02';
    return fetch(`https://api.linkpreview.net/?key=${keyAPI}&q=${url}`).then(response=>{
        if (response.ok) return response.json();
        throw new Error(`Error while fetching: ${response.statusText}`);
})
.then(data=> {
    addToList(data);
    LS.updateLocalStorage(data,true);
}
).catch(err=>console.log(err));
}
function addToList(data) {
    const urlData = {
        title : data.title,
        descr : data.description,
        img : data.image,
        url: data.url
    }
    favLinksList.insertAdjacentHTML("afterbegin", linkTpl(urlData));
    const deleteLinkBtn = document.querySelector('.js-delete-page-btn');
    deleteLinkBtn.addEventListener('click', removeFromList);
}
function removeFromList(e){
    e.preventDefault();
    const urlToDel = e.target.parentNode.querySelector('.js-pages').textContent;
    const undeletedUrl=LS.getLinks().filter(el=>el.url !== urlToDel);
  
    LS.updateLocalStorage(undeletedUrl)


    e.target.removeEventListener('click', removeFromList);
    this.parentNode.remove(".js-fav-page-item");
}

export {fetchAPI, addToList}