"use strict";

const logout = new LogoutButton();

logout.action = () => ApiConnector.logout(response => {
    if(response.success) {
        location.reload();
    }
});

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function stocks() {ApiConnector.getStocks(response => {
    if(response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data)
        }
    }
)};
stocks();
const timer = setInterval(() => stocks(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Пополнение баланса успешно");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
})

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Конвертация прошла успешно");
    } else {
        moneyManager.setMessage(response.succes, response.error);
    }
})

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, "Перевод прошел успешно");
    } else {
        moneyManager.setMessage(response.success, response.error);
    }
})

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.setMessage(response.success, "Пользователь добавлен в избранные")
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
})

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.setMessage(response.success, "Пользователь удален из избранного")
    } else {
        favoritesWidget.setMessage(response.success, response.error);
    }
})