'use strict';
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const getUsersBtn = document.querySelector('.DB__all-users__btn');
const allUsersTable = document.querySelector('.DB__all-users__table');

const inputFindUser = document.querySelector('.find-user__input');
const btnFindUser = document.querySelector('.find-user__btn');
const formFindUser = document.querySelector('.find-user')
const findUserResult = document.querySelector('.find-user__result');

const inputAddUserName = document.querySelector('.add-user__input-name');
const inputAddUserAge = document.querySelector('.add-user__input-age');
const btnAddUser = document.querySelector('.add-user__btn');
const formAddUser = document.querySelector('.add-user');
const addUserResult = document.querySelector('.add-user__result');

const formDeleteUser = document.querySelector('.remove-user');
const inputDeleteUser = document.querySelector('.remove-user__input');
const btnDeleteUser = document.querySelector('.remove-user__btn');
const removeUserResult = document.querySelector('.remove-user__result');

const formUpdateUser = document.querySelector('.update-user');
const inputeUpdateID = document.querySelector('.update-user__input-getID');
const inputUpdateName = document.querySelector('.update-user__input-newName');
const inputUpdateAge = document.querySelector('.update-user__input-newAge');
const btnUpdateUser = document.querySelector('.update-user__btn');
const updateUserResult = document.querySelector('.update-user__result');

//----------------cекция getAllUsers-------------------

getUsersBtn.addEventListener('click', getAllUsers);

function getAllUsers(e){
    e.preventDefault();
    allUsersTable.innerHTML = '';
    fetch('https://test-users-api.herokuapp.com/users/')
    .then(response =>{
        if(response.ok) return response.json();
        throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data =>{
        allUsersTable.innerHTML += data.data.reduce((acc,i)=> acc + 
            `<tr>
            <td>${i.id}</td>
            <td>${i.name}</td>
            <td>${i.age}</td>
            </tr>`,
            '')
    })
    .catch(err => console.log(err))
}
//----------------поиск по UserById---------------------

formFindUser.addEventListener('submit', getUserById);

function getUserById(e){
    e.preventDefault();
    const value = inputFindUser.value;
    findUserResult.classList.remove('incorrect');
    findUserResult.classList.remove('correct');
    if(value === ''){
        findUserResult.innerHTML = `Please enter ID!`
        findUserResult.classList.add('incorrect');
        return
    }
    fetch(`https://test-users-api.herokuapp.com/users/${value}`)
    .then(response =>{
        if(response.ok) return response.json();
        throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data =>{
        findUserResult.innerHTML = 
        `ID: ${data.data.id}  |  Name: ${data.data.name}  |  Age: ${data.data.age}`;
        findUserResult.classList.add('correct');
    })
    .catch(err=> {
        findUserResult.innerHTML = `No Users with this ID`
        findUserResult.classList.add('incorrect');
        console.log(err)
    })
    formFindUser.reset();
};

//----------------cекция AddUser-------------------------

formAddUser.addEventListener('submit', addUser);

function addUser(e){
    e.preventDefault();
    const nameValue = inputAddUserName.value;
    const ageValue = Number(inputAddUserAge.value);
    addUserResult.classList.remove('incorrect');
    addUserResult.classList.remove('correct');

    if(nameValue === '' || Number.isNaN(ageValue)){
        addUserResult.innerHTML = `Incorrect input. Check name and age!`;
        addUserResult.classList.add('incorrect');
        return
    }
    fetch('https://test-users-api.herokuapp.com/users/',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ name: nameValue, age: ageValue})
    })
    .then(response =>{
        if(response.ok) return response.json();
        throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data =>{
       addUserResult.innerHTML =
       `NEW USER! ID: ${data.data._id}  |  Name: ${data.data.name}  |  Age: ${data.data.age}`;
       addUserResult.classList.add('correct');
    })
    .catch(err=> console.log(err))
    formAddUser.reset();
}

//---------------секция Delete----------------------

formDeleteUser.addEventListener('submit', removeUser);

function removeUser(e){
    e.preventDefault();
    removeUserResult.classList.remove('incorrect');
    removeUserResult.classList.remove('correct');
    const id = inputDeleteUser.value;
    if(id === ''){
        removeUserResult.innerHTML = `No ID`
        removeUserResult.classList.add('incorrect');
        return
    }
    fetch(`https://test-users-api.herokuapp.com/users/${id}`,{
        method: 'DELETE',
    })
    .then(response =>{
        if(response.ok) return response.json();

        throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data =>{
        removeUserResult.innerHTML =
        `DELETED USER! ID: ${data.data.id}  |  Name: ${data.data.name}  |  Age: ${data.data.age}`;
        removeUserResult.classList.add('correct');
    })
    .catch(err=> {
        removeUserResult.innerHTML = `No Users with this ID`
        removeUserResult.classList.add('incorrect');
        console.log(err)
    })
    formDeleteUser.reset();
}

//-------------секция Обновления данных---------------

formUpdateUser.addEventListener('submit',updateUser);

function updateUser(e){
    e.preventDefault();
    const ID = inputeUpdateID.value;
    const newName = inputUpdateName.value;
    const newAge = inputUpdateAge.value;
    const newUser = { name: newName, age: newAge};

    if(newName === '' || ID === '' || Number.isNaN(newAge) ){
       updateUserResult.innerHTML = `Incorrect input. Check ID, name and age!`;
       updateUserResult.classList.add('incorrect');
       return
    }
    fetch(`https://test-users-api.herokuapp.com/users/${ID}`,{
        method: 'PUT',
        body: JSON.stringify(newUser),
        headers: {
             Accept: "application/json", 
             "Content-Type": "application/json" 
        }
    })
    .then(response=>{
        if(response.ok) return response.json();
        throw new Error(`Error while fetching: ${response.statusText}`);
        })
    .then(data=>{
        updateUserResult.innerHTML =
        `CHANGE! ID: ${data.data.id}  |  Name: ${data.data.name}  |  Age: ${data.data.age}`;
        updateUserResult.classList.add('correct');
        })
    .catch(err=> console.log(err))
    formUpdateUser.reset();
    }