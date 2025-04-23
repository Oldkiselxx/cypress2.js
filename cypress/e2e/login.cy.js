import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восст. пароль
          });
 
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден пользователю
           });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // Ввел верный логин
         cy.get(main_page.password).type(data.password); // Ввел верный пароль
         cy.get(main_page.login_button).click(); // Нажал войти
         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авт. вижу текст
         cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю

     })
     it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввел верный логин
        cy.get(main_page.password).type('iLoveqastudio2'); // Ввел неверный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю

    })
    it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolniko.ru'); // Ввел неверный логин
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю

    })
    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввел логин без "@"
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю

    })
    it('Проверка логики восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // Нажал "Забыли пароль?"
        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); // Ввел логин
        cy.get(recovery_password_page.send_button).click(); // Нажал "Отправить код"
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю

    })
    it('Проверка приведения к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввел логин
        cy.get(main_page.password).type(data.password); // Ввел верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авт. вижу текст
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст виден пользователю

    })

 })
 
 

 // + Найти поле логин и ввести верный логин
 // + Найти поле пароль и ввести правильный пароль
 // + Найти кнопку войти и нажать на нее 
 // + Проверить, что авторизация прошла успешно