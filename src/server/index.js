const express = require('express');
const app = express();

const http = require("http").Server(app)
const io = require("socket.io")(http)

const { randomString } = require("../shared/essentials")

const isDev = process.env.NODE_ENV !== "production"

app.use(express.static('dist'));

//api example
//app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

let sockets = {}

let games = {}

const getMatchmakingSockets = (numberOfPlayers = 2, callback) => {
    const foundSockets = []

    Object.values(sockets).forEach(socket => {
        if (socket.gameId == null) {
            foundSockets.push(socket)

            if (foundSockets.length == numberOfPlayers) {
                callback(foundSockets)
            }
        }
    })

    if (foundSockets.length == 0) {
        callback(null)
    }
}

io.on("connection", newSocket => {
    sockets[newSocket.id] = {
        socket: newSocket,
        gameId: null
    }

    newSocket.emit("getId", newSocket.id)


    getMatchmakingSockets(1, matchmadeSockets => {
        if (matchmadeSockets != null) {
            let newGameId = randomString()
            games[newGameId] = {
                sockets: matchmadeSockets,
                teams: [
                    {
                        color: "rgb(100,100,100)"
                    },
                    {
                        color: "purple"
                    },
                    {
                        color: "red"
                    }
                ],
                map: {
                    width: 10,
                    height: 10,
                    cells: []
                }
            }

            const cellsForTeams = []

            for (let y = 0; y < games[newGameId].map.height; y++) {
                for (let x = 0; x < games[newGameId].map.width; x++) {
                    if (Math.random() < 0.7) {
                        const cellIndex = x + y * games[newGameId].map.width
                        games[newGameId].map.cells[cellIndex] = {
                            maxSize: 8,
                            size: 0,
                            team: 0,
                        }
                        cellsForTeams.push(games[newGameId].map.cells[cellIndex])
                    }
                }
            }

            for(let i = 0; i < games[newGameId].teams.length; i++){
                if(i == 0) continue

                let randomIndex = Math.floor(Math.random() * cellsForTeams.length)
                let insertCell = cellsForTeams[randomIndex]
                cellsForTeams.splice(randomIndex, 1)

                insertCell.team = i
                insertCell.size = 1
            }

            matchmadeSockets.forEach(socket => {
                socket.gameId = newGameId
                socket.socket.emit("getAllGameData", {
                    teams: games[newGameId].teams,
                    map: games[newGameId].map
                })
            })
        }
    })

    newSocket.on("disconnect", reason => {
        newSocket.broadcast.emit("userDisconnect", newSocket.id)

        delete sockets[newSocket.id]
    })
})

http.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));