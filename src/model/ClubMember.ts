export default class ClubMember {
    name: string
    proName: string
    proPos: number
    proHeight: number
    proOverall: number
    manOfTheMatch: number
    manOfTheMatchPercent: number
    favoritePosition: Position
    gamesPlayed: number
    winRate: number
    goals: number
    goalsPerMatch: number
    assists: number
    assistsPerMatch: number
    goalsPlusAssists: number
    goalsPlusAssistsPerMatch: number
    cleanSheetsDef: number
    cleanSheetsGK: number
    shotSuccessRate: number
    passesMade: number
    passesMadePerMatch: number
    passSuccessRate: number
    passesSuccess: number
    ratingAve: number
    tacklesMade: number
    tackleSuccessRate: number
    tacklesSuccess: number
    redCards: number

    constructor(json: any){
        this.name = json.name
        this.gamesPlayed = Number(json.gamesPlayed)
        this.winRate = Number(json.winRate)
        this.goals = Number(json.goals)
        this.goalsPerMatch = this.goals/this.gamesPlayed
        this.assists = Number(json.assists)
        this.assistsPerMatch = this.assists/this.gamesPlayed
        this.goalsPlusAssists = this.goals + this.assists
        this.goalsPlusAssistsPerMatch = this.goalsPlusAssists/this.gamesPlayed
        this.cleanSheetsDef = Number(json.cleanSheetsDef)
        this.cleanSheetsGK = Number(json.cleanSheetsGK)
        this.shotSuccessRate = Number(json.shotSuccessRate)
        this.passesMade = Number(json.passesMade)
        this.passesMadePerMatch = this.passesMade/this.gamesPlayed
        this.passSuccessRate = Number(json.passSuccessRate)
        this.passesSuccess = (this.passSuccessRate*this.passesMade)/100
        this.ratingAve = Number(json.ratingAve)
        this.tacklesMade = Number(json.tacklesMade)
        this.tackleSuccessRate = Number(json.tackleSuccessRate)
        this.tacklesSuccess = (this.tackleSuccessRate*this.tacklesMade)/100
        this.proName = json.proName
        this.proPos = Number(json.proPos)
        this.proHeight = Number(json.proHeight)
        this.proOverall = Number(json.proOverall)
        this.manOfTheMatch = Number(json.manOfTheMatch)
        this.manOfTheMatchPercent = (this.manOfTheMatch/this.gamesPlayed) * 100
        this.redCards = Number(json.redCards)
        this.favoritePosition = reversePosition.get(json.favoritePosition)
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

