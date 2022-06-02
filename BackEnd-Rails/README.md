# Programacion Avanzada TaTeTi

## Endpoints

### User

| Metodo | Ruta            | Accion                                   |
| ------ | --------------- | ---------------------------------------- |
| POST   | /users/register | [Registrar Usuario](#post-usersregister) |
| POST   | /users/login    | [Login](#post-userslogin)                |

### Board

| Metodo | Ruta                          | Accion                                                                                                     |
| ------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| GET    | /boards/:id                   | [Obtener un tablero](#get-boardsid)                                                                        |
| GET    | /boards/find_open_boards      | [Obtener los tableros a los que se pueden unir los jugadores](#get-boardsfindopenboards)                   |
| GET    | /boards/find_user_boards      | [Obtener todos los tableros en los que participo el usuario](#get-boardsfinduserboards)                    |
| GET    | /boards/find_user_open_boards | [Obtener todos los tableros en los que esta el usuario, y no han terminado](#get-boardsfinduseropenboards) |
| POST   | /boards                       | [Crear un tablero](#post-boards)                                                                           |
| POST   | /boards/:id/join              | [Unirse a un tablero](#post-boardsidjoin)                                                                  |
| POST   | /boards/:id/move              | [Hacer un movimiento en un tablero](#post-boardsidmove)                                                    |

---

## Descripción de los Endpoints

### User Endpoints

---

#### POST /users/register

Registrar Usuario

REQUEST

```json
{
  "name": "Tomas E",
  "user_name": "tomas1646",
  "password": "password"
}
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "User Created",
  "content": {
    "name": "Tomas E",
    "user_name": "tomas1646",
    "token": "b5283e68-d468-410c-8a1c-b52f8cbda245"
  }
}
```

Error:

```json
{
  "status": 400,
  "message": "Error creating User",
  "content": {}
}
```

---

#### POST /users/login

Login

REQUEST

```json
{
  "user_name": "tomas1646",
  "password": "password"
}
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Login successful",
  "content": {
    "name": "Tomas E",
    "user_name": "tomas1646",
    "token": "b5283e68-d468-410c-8a1c-b52f8cbda245"
  }
}
```

Error:

```json
{
  "status": 400,
  "message": "Incorrect Username or Password",
  "content": {}
}
```

### Board Endpoints

---

#### GET /boards/:id

Obtener un tablero

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Action completed successfully",
  "content": {
    "player_1_name": "Tomas E",
    "player_2_name": "Jane Doe",
    "status": "Waiting_For_Players",
    "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
    "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
  }
}
```

Error:

```json
{
  "status": 404,
  "message": "Board doesn't exists",
  "content": {}
}
```

---

#### GET /boards/find_open_boards

Obtener los tableros a los que se pueden unir los jugadores

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Action completed successfully",
  "content": [
    {
      "player_1_name": "Tomas E",
      "player_2_name": "Jane Doe",
      "status": "Waiting_For_Players",
      "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
      "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
    },
    {
      "player_1_name": "Tomas E",
      "player_2_name": "Jane Doe",
      "status": "Waiting_For_Players",
      "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
      "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
    }
  ]
}
```

---

#### GET /boards/find_user_boards

Obtener todos los tableros en los que participo el usuario

REQUEST

```text
Request.Authorization = User Token
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Action completed successfully",
  "content": [
    {
      "player_1_name": "Tomas E",
      "player_2_name": "Jane Doe",
      "status": "Waiting_For_Players",
      "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
      "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
    },
    {
      "player_1_name": "Tomas E",
      "player_2_name": "Jane Doe",
      "status": "Waiting_For_Players",
      "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
      "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
    }
  ]
}
```

Error:

```json
{
  "status": 404,
  "message": "User with token doesn't exists",
  "content": {}
}
```

---

#### GET /boards/find_user_open_boards

Obtener todos los tableros en los que esta el usuario, y no han terminado

REQUEST

```text
Request.Authorization = User Token
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Action completed successfully",
  "content": [
    {
      "player_1_name": "Tomas E",
      "player_2_name": "Jane Doe",
      "status": "Waiting_For_Players",
      "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
      "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
    },
    {
      "player_1_name": "Tomas E",
      "player_2_name": "Jane Doe",
      "status": "Player_1_Win",
      "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
      "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
    }
  ]
}
```

Error:

```json
{
  "status": 404,
  "message": "User with token doesn't exists",
  "content": {}
}
```

---

#### POST /boards

Crear un tablero

REQUEST

```text
Request.Authorization = User Token
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Board Created",
  "content": {
    "player_1_name": "Tomas E",
    "player_2_name": "Jane Doe",
    "status": "Waiting_For_Players",
    "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
    "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
  }
}
```

Error 1:

No existe el usuario

```json
{
  "status": 404,
  "message": "User with token doesn't exists",
  "content": {}
}
```

Error 2:

Error al guardar el tablero

```json
{
  "status": 400,
  "message": "Error creating Board",
  "content": {}
}
```

---

#### POST /boards/:id/join

Unirse a un tablero

REQUEST

```text
Request.Authorization = User Token
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Joined to the board",
  "content": {
    "player_1_name": "Tomas E",
    "player_2_name": "Jane Doe",
    "status": "Waiting_For_Players",
    "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
    "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
  }
}
```

Error 1:

Cuando el tablero no existe

```json
{
  "status": 404,
  "message": "Board doesn't exists",
  "content": {}
}
```

Error 2:

Cuando hay un error al guardar el tablero:

```json
{
  "status": 400,
  "message": "Error Joining Board",
  "content": {}
}
```

Error 3:

Cuando el tablero esta lleno:

```json
{
  "status": 400,
  "message": "Board is full",
  "content": {}
}
```

Error 3:

No existe el usuario

```json
{
  "status": 404,
  "message": "User with token doesn't exists",
  "content": {}
}
```

---

#### POST /boards/:id/move

Hacer un movimiento en un tablero

Unirse a un tablero

REQUEST

```text
Request.Authorization = User Token
```

RESPONSE

Success:

```json
{
  "status": 200,
  "message": "Move Done",
  "content": {
    "player_1_name": "Tomas E",
    "player_2_name": "Jane Doe",
    "status": "Waiting_For_Players",
    "token": "b5283e68-d468-410c-8a1c-b52f8cbda245",
    "board": ["X", 0, "O", "X", 0, "O", "X", 0, 0]
  }
}
```

Error 1:

Cuadno el tablero no existe

```json
{
  "status": 404,
  "message": "Board doesn't exists",
  "content": {}
}
```

Error 2:

Cuando no se unen los dos jugadores al tablero

```json
{
  "status": 400,
  "message": "Waiting For Players to Join",
  "content": {}
}
```

Error 3:

Cuando el juego ya termino

```json
{
  "status": 400,
  "message": "Game Finished",
  "content": {}
}
```

Error 4:

Cuando un usuario que no esta en el tablero, intenta hacer un movimiento en ese tablero

```json
{
  "status": 400,
  "message": "Player is not on the board",
  "content": {}
}
```

Error 5:

Cuando no es el turno del jugador:

```json
{
  "status": 400,
  "message": "Not your turn",
  "content": {}
}
```

Error 6:

Cuando la posicion del tablero esta ocupada:

```json
{
  "status": 400,
  "message": "Position isn't empty",
  "content": {}
}
```

Error 7:

Error cuando se guarda el tablero:

```json
{
  "status": 400,
  "message": "Error saving board",
  "content": {}
}
```

Error 8:

No existe el usuario

```json
{
  "status": 404,
  "message": "User with token doesn't exists",
  "content": {}
}
```
