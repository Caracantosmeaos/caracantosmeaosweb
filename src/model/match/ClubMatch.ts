import PlayerMatchStats from "./PlayerMatchStats"

export default class ClubMatch {
    matchId: number
    timestamp: number
    timeAgo: {
        time: number,
        unit: string
    }
    result: Result
    ownClub:{
        id: number
        name: string
        matchStats: {
            goals: number,
            shots: number,
            passesMade: number,
            passesSuccess: number,
            passSuccessRate: number
            redCards: number,
            tacklesMade: number,
            tackleSuccess: number,
            tackleSuccessRate: number
        }
        players: PlayerMatchStats[]
    }
    opponentClub:{
        id: number
        name: string
        matchStats: {
            goals: number,
            shots: number,
            passesMade: number,
            passesSuccess: number,
            passSuccessRate: number
            redCards: number,
            tacklesMade: number,
            tackleSuccess: number,
            tackleSuccessRate: number
        }
        players: PlayerMatchStats[]
    }

    constructor(json: any){
        //console.log(json.timeAgo.number)
        this.matchId = Number(json.matchId)
        this.timestamp = json.timestamp
        this.timeAgo =  {
            time: json.timeAgo.number,
            unit: json.timeAgo.unit
        }
        const jsonOwnClub = json.clubs[Object.keys(json.clubs)[0]]
        const jsonAggregateOwn = json.aggregate[Object.keys(json.clubs)[0]]
        const jsonRivalClub = json.clubs[Object.keys(json.clubs)[1]]
        const jsonAggregateRival = json.aggregate[Object.keys(json.clubs)[1]]
        if(Number(jsonOwnClub.losses)==1){
            this.result = Result.Perdido
        }else if(Number(jsonOwnClub.ties)==1){
            this.result = Result.Empate
        }else this.result = Result.Ganado
        
        const jsonOwnPlayers =  json.players[Object.keys(json.players)[0]]
        let ownClubPlayers:Array<PlayerMatchStats> = []
        for(var jsonPl in jsonOwnPlayers) {
            var parsedPl = new PlayerMatchStats(jsonOwnPlayers[jsonPl])
            ownClubPlayers.push(parsedPl)
        }
        this.ownClub = {
            id: jsonOwnClub.details.clubId,
            name: jsonOwnClub.details.name,
            matchStats: {
                goals: jsonAggregateOwn.goals,
                shots: jsonAggregateOwn.shots,
                passesMade: jsonAggregateOwn.passattempts,
                passesSuccess: jsonAggregateOwn.passesmade,
                passSuccessRate: (jsonAggregateOwn.passesmade/jsonAggregateOwn.passattempts) * 100,
                redCards: jsonAggregateOwn.redcards,
                tacklesMade: jsonAggregateOwn.tackleattempts,
                tackleSuccess: jsonAggregateOwn.tacklesmade,
                tackleSuccessRate: (jsonAggregateOwn.tacklesmade/jsonAggregateOwn.tackleattempts) * 100
            },
            players: ownClubPlayers
        }

        const jsonRivalPlayers =  json.players[Object.keys(json.players)[1]]
        let rivalClubPlayers:Array<PlayerMatchStats> = []
        for(var jsonPl in jsonRivalPlayers) {
            var parsedPl = new PlayerMatchStats(jsonRivalPlayers[jsonPl])
            rivalClubPlayers.push(parsedPl)
        }
        this.opponentClub = {
            id: jsonRivalClub.details.clubId,
            name: jsonRivalClub.details.name,
            matchStats: {
                goals: jsonAggregateRival.goals,
                shots: jsonAggregateRival.shots,
                passesMade: jsonAggregateRival.passattempts,
                passesSuccess: jsonAggregateRival.passesmade,
                passSuccessRate: (jsonAggregateRival.passesmade/jsonAggregateRival.passattempts) * 100,
                redCards: jsonAggregateRival.redcards,
                tacklesMade: jsonAggregateRival.tackleattempts,
                tackleSuccess: jsonAggregateRival.tacklesmade,
                tackleSuccessRate: (jsonAggregateRival.tacklesmade/jsonAggregateRival.tackleattempts) * 100
            },
            players: ownClubPlayers
        }
    }
}

enum Result{
    Empate,
    Ganado,
    Perdido
}