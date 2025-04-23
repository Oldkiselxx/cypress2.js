describe('Проверка покупки нового аватара', function () {                 
    it('e2e тест на покупку нового аватара для тренера', function () {   
         cy.visit('https://pokemonbattle.ru/');                          // Перехожу на сайт https://pokemonbattle.ru/
         cy.get('input[id="k_email"]').type('USER_LOGIN');                   // Ввожу логин
         cy.get('input[id="k_password"]').type('USER_PASSWORD');               // Ввожу пароль
         cy.get('button[type="submit"]').click();                // Нажимаю кнопку Подтвердить
         cy.wait(2000);
         cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
         cy.wait(2000);
         cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // Нажимаю кнопку Смена аватара
         cy.get('.available > button').first().click();   // Кликаем Купить у первого доступного аватара
         cy.get('.card_number').type('4620869113632996');                     // Ввожу номер карты
         cy.get('.card_csv').type('125');                             // Ввожу CVV карты
         cy.get('.card_date').type('1226');                           // Ввожу срок действия карты
         cy.get('.card_name').type('NAME');                           // Ввожу имя владельца действия карты
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // Нажимаю кнопку Оплатить
         cy.get('.threeds_number').type('56456');                            // Ввожу код подтверждения СМС
         cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // Нажимаю кнопку Оплатить
         cy.contains('Покупка прошла успешно').should('be.visible');     // Проверяю наличие и видимость сообщения об успешной покупке
     });
 });
