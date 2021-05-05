import express, { request, response } from 'express';
import { v4 as uuid } from 'uuid'
import cors from 'cors';

const app = express()

app.use(express.json())
app.use(cors())

interface User {
    id: string;
    name: string;
    email: string;
}

const users: User[] = []

// Métodos HTTP -> GET | POST | PUT | DELETE

// http://localhost:3333/users

app.get('/users', (request, response) => {
    return response.json(users);
})

app.post('/users', (request, response) => {
    const { name, email} = request.body

    const user = { id: uuid(), name, email }

    users.push(user)

    return response.json(user)
})
app.put('/users', (request, response) => {
    const { id } = request.params
    const { name, email } = request.body

    const userIndex = users.findIndex((user) => { user.id === id})

    if(userIndex < 0) {
        return response.status(404).json({ error: 'User not found.'})
    }

    const user = { id, name, email }
    users[userIndex] = user

    return response.json(user)
})
app.delete('/users', (request, response) => {
    const { id } = request.params

    const userIndex = users.findIndex((user) => { user.id === id})

    if(userIndex < 0) {
        return response.status(404).json({ error: 'User not found.'})
    }

    users.slice(userIndex, 1)

    return response.status(204).send()
})

app.listen('3333', () => {
    console.log('Back-end Started!')
})