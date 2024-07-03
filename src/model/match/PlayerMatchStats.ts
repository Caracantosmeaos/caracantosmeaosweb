export default class PlayerMatchStats {
    playername: string
    rating: number
    redCards: number
    position: Position
    assists: number
    goals: number
    shots: number
    shotAccuracyPercent: number
    goalsConceded: number
    manOfTheMatch: boolean
    passesMade: number
    passesSuccess: number
    passSuccessRate: number
    tacklesMade: number
    tackleSuccessRate: number
    tacklesSuccess: number

    constructor(json: any){
        this.playername = json.playername,
        this.rating = Number(json.rating)
        this.redCards = Number(json.redcards)
        this.position = reversePosition.get(json.pos)
        this.assists = Number(json.assists)
        this.goals = Number(json.goals)
        this.shots = Number(json.shots)
        this.shotAccuracyPercent = (this.goals/this.shots) * 100
        this.goalsConceded = Number(json.goalsconceded)
        this.manOfTheMatch = Boolean(Number(json.mom))
        this.passesMade = Number(json.passattempts),
        this.passesSuccess = Number(json.passesmade),
        this.passSuccessRate = (this.passesSuccess/this.passesMade) * 100
        this.tacklesMade = Number(json.tackleattempts)
        this.tacklesSuccess = Number(json.tacklesmade)
        this.tackleSuccessRate = (this.tacklesSuccess/this.tacklesMade) * 100
    }
}

enum Position {
    Centrocampista = "midfielder",
    Delantero="forward",
    Defensa="defender",
    Guardameta="goalkeeper",
}

let reversePosition = new Map<string, Position>();
Object.keys(Position).forEach((pos: Position) => {
const modeValue: string = Position[pos as any];
reversePosition.set(modeValue, pos);
});