# Programacion Avanzada TaTeTi

## Endpoints

### User

| Metodo | Ruta            | Accion            |
| ------ | --------------- | ----------------- |
| POST   | /users/register | Registrar Usuario |
| POST   | /users/login    | Login             |

### Board

| Metodo | Ruta                          | Accion                                                                    |
| ------ | ----------------------------- | ------------------------------------------------------------------------- |
| GET    | /boards/:id                   | Obtener un tablero                                                        |
| GET    | /boards/find_open_boards      | Obtener los tableros a los que se pueden unir los jugadores               |
| GET    | /boards/find_user_boards      | Obtener todos los tableros en los que participo el usuario                |
| GET    | /boards/find_user_open_boards | Obtener todos los tableros en los que esta el usuario, y no han terminado |
| POST   | /boards                       | Crear un tablero                                                          |
| POST   | /boards/:id/join              | Unirse a un tablero                                                       |
| POST   | /boards/:id/move              | Hacer un movimiento en un tablero                                         |

---

## Descripción de los Endpoints

### User Endpoints

#### POST /users/register

Registrar Usuario

Respuesta Correcta:

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

Respuesta Error:

```json
{
  "status": 400,
  "message": "Error creating User",
  "content": {}
}
```

#### POST /users/login

Login

Respuesta Correcta:

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

Respuesta Error:

```json
{
  "status": 400,
  "message": "Incorrect Username or Password",
  "content": {}
}
```

### Board Endpoints

#### GET /boards/:id

Obtener un tablero

Respuesta Correcta:

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

Respuesta Error:

```json
{
  "status": 400,
  "message": "Incorrect Username or Password",
  "content": {}
}
```

#### GET /boards/find_open_boards

Obtener los tableros a los que se pueden unir los jugadores

Respuesta Correcta:

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

#### GET /boards/find_user_boards

Obtener todos los tableros en los que participo el usuario

Respuesta Correcta:

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

#### GET /boards/find_user_open_boards

Obtener todos los tableros en los que esta el usuario, y no han terminado

Respuesta Correcta:

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

#### POST /boards

Crear un tablero

Respuesta Correcta:

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

Respuesta Error:

```json
{
  "status": 400,
  "message": "Error creating Board",
  "content": {}
}
```

#### POST /boards/:id/join

Unirse a un tablero

Respuesta Correcta:

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

Posibles Errores y sus respuestas:

Cuando hay un error al guardar el tablero:

```json
{
  "status": 400,
  "message": "Error Joining Board",
  "content": {}
}
```

Cuando el tablero esta lleno:

```json
{
  "status": 400,
  "message": "Board is full",
  "content": {}
}
```

#### POST /boards/:id/move

Hacer un movimiento en un tablero

Unirse a un tablero

Respuesta Correcta:

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

Posibles Errores y sus respuestas:

Cuando no se unen los dos jugadores al tablero:

```json
{
  "status": 400,
  "message": "Waiting For Players to Join",
  "content": {}
}
```

Cuando el juego ya termino:

```json
{
  "status": 400,
  "message": "Game Finished",
  "content": {}
}
```

Cuando un usuario que no esta en el tablero, intenta hacer un movimiento en ese tablero:

```json
{
  "status": 400,
  "message": "Player is not on the board",
  "content": {}
}
```

Cuando no es el turno del jugador:

```json
{
  "status": 400,
  "message": "Not your turn",
  "content": {}
}
```

Cuando la posicion del tablero esta ocupada:

```json
{
  "status": 400,
  "message": "Position isn't empty",
  "content": {}
}
```

error cuando se guarda el tablero:

```json
{
  "status": 400,
  "message": "Error saving board",
  "content": {}
}
```
