'use strict';

import './../sass/index.scss';
import '../services/shortlist';
import '../services/regcheck';
import '../services/warning';

const addLinkForm = document.querySelector('.js_fav-pages-form');
const addLinkInput = document.querySelector('.js-fav-pages-inp');

const urlExist = `Sorry! This page is already in the list! Please enter another link`;
const urlFail = `Sorry! You have not entered a link to the page. Please try again!`
const notUrl = `Sorry! You have entered an incorrect link to the page! Please check the link and try again!`

import {updateLocalStorage,getLinks} from '../services/ls';
import {fetchAPI, addToList} from '../services/shortlist';
import {testUrl} from '../services/regcheck';

import {modal,openModal,closeModal} from '../services/warning';


addLinkForm.addEventListener('submit', addLink);


lastSession();

function lastSession (){
    getLinks().forEach(el =>{
    addToList(el);
});
}

function addLink (e){
    e.preventDefault();
    const value = addLinkInput.value;
    if(value === ''){
        openModal();
        showMsg(urlFail);
        addLinkForm.reset();
        return
    }
    if(!testUrl(value)){
        openModal();
        showMsg(notUrl);
        addLinkForm.reset();
        return
    }
    const hasLink =  getLinks().some(e => { 
         return Object.values(e).includes(value) || (Object.values(e).includes(value + `/`)) 
    })
    if (hasLink){
        openModal();
        showMsg(urlExist);
        return
    }
    fetchAPI(value);
    
    addLinkForm.reset();
}
function showMsg(message){
    const msg = modal.querySelector('.js-warning-msg');
    msg.textContent = message;
}