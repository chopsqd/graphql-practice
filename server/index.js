const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')

const schema = require('./schema')
const PORT = process.env.PORT || 5000
const app = express()
// Имитация БД
const users = [{id: 1, username: "Vasya", age: 25}]

// Функция для создания пользователя
const createUser = (input) => {
    const id = Date.now()
    return {
        id, ...input
    }
}

// Пишем Resolver - в нем функции, которые будут возвращать данные с сервера
const root = {
    getAllUsers: () => {
        return users
    },
    getUser: ({id}) => {
        return users.find(user => user.id === +id)
    },
    createUser: ({input}) => {
        const user = createUser(input)
        users.push(user)
        return user
    }
}

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(PORT, (err) => {
    if(err) console.log('Server starting error: ', err)
    console.log(`Server has been started on port: ${PORT}`)
})