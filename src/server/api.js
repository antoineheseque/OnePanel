const express = require('express')
const userAPI = require('./userAPI')
const widgetsAPI = require('./widgetsAPI')

module.exports = app => {
    app.use(express.json());
    app.use(express.urlencoded());

    app.use('/api/user', userAPI)
    app.use('/api/widgets', widgetsAPI)

}