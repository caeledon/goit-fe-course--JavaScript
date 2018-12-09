'use strict';
/*
  Напишите скрипт имитирующий авторизацию администратора в панели управления.
  
  При загрузке страницы у посетителя запрашивается логин через prompt:
  
    - Если посетитель нажал Cancel — показывать alert с текстом 'Отменено пользователем!'
    - Если было введено что либо другое, что не совпадает со значением константы adminLogin, 
       показывать alert с текстом 'Доступ запрещен, неверный логин!'
    - Если был введен логин совпадающий со значением константы adminLogin, 
      спрашивать пароль через prompt.
    
  При вводе пароля:
  
      - Если нажали Cancel, показывать alert с текстом 'Отменено пользователем!'
      - Если введен пароль который не совпадает со значением константы adminPassword,
        показывать alert с текстом 'Доступ запрещен, неверный пароль!'        
      - Если введён пароль который совпадает со значением константы adminPassword, 
        показывать alert с текстом 'Добро пожаловать!'
        
  🔔 PS: для удобства и чистоты кода сохраните в переменные сообщения отображаемые в alert
*/

const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';
const Cansel = 'Отменено пользователем!';
const loginEror = 'Доступ запрещен, неверный логин!';
const passwordEror = 'Доступ запрещен, неверный пароль!';
const passwordCorrect = 'Добро пожаловать!';

const userLogin = prompt('Введите логин:');
if (userLogin === adminLogin) {
    const userPassword = prompt('Введите пароль администратора!');
    if (userPassword === adminPassword) {
        alert(passwordCorrect);
    } else if (userPassword === null) {
        alert(Cansel);
    } else {
        alert(passwordEror);
    }
} else if (userLogin === null) {
    alert(Cansel);
} else {
    alert(loginEror)
}