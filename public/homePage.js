"use strict";

const logout = new LogoutButton();

logout.action = () => ApiConnector.logout(response => {
    if(response.succes) {
        location.reload();
    }
});

ApiConnector.current(response => {
    if(response.succes) {
        ProfileWidget.showProfile(response.data);
    }
})

