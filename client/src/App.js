import React, {useEffect, useState} from 'react';
import './App.css'
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

const App = () => {
    // useQuery(GET_ALL_USERS, {pollInterval: 500}) pollInterval -> повтор запроса каждые 500 мс
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const {data: oneUser} = useQuery(GET_ONE_USER, {
        variables: {
            id: 1
        }
    })
    const [newUser] = useMutation(CREATE_USER)

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)

    console.log(oneUser)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (event) => {
        event.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }

    const getAll = e => {
        e.preventDefault()
        refetch()
    }

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error : {error.message}</h1>;

    return (
        <div>
            <form>
                <input
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    type="text"
                />
                <input
                    value={age}
                    onChange={event => setAge(Number(event.target.value))}
                    type="number"
                />
                <div>
                    <button onClick={event => addUser(event)}>Создать</button>
                    <button onClick={event => getAll(event)}>Получить</button>
                </div>
            </form>
            <div>
                {users.map(user =>
                    <div className={"user"} key={user.id}>{user.username}: {user.age}</div>
                )}
            </div>
        </div>
    );
};

export default App;