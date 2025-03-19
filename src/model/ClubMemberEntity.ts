import type { IClubMember } from "@/interfaces/clubMember.interface"

export default class ClubMemberEntity implements IClubMember {

    playerName: string
    proName: string
    proPos: number
    proHeight: number
    proOverall: number
    manOfTheMatch: number
    favoritePosition: "midfielder" | "forward" | "defender" | "goalkeeper"
    favoritePositionEnum: Position
    gamesPlayed: number
    winRate: number
    goals: number
    assists: number
    cleanSheetsDef: number
    cleanSheetsGK: number
    shots: number
    passesMade: number
    passesSuccess: number
    ratingAve: number
    tacklesMade: number
    tacklesSuccess: number
    redCards: number

    manOfTheMatchPercent: number
    goalsPerMatch: number
    assistsPerMatch: number
    goalsPlusAssists: number
    goalsPlusAssistsPerMatch: number
    shotSuccessRate: number
    passesMadePerMatch: number
    passSuccessRate: number
    tackleSuccessRate: number

    constructor(member: IClubMember){
        Object.assign(this, member)

        if(!(member instanceof ClubMemberEntity)){
            this.goalsPerMatch = this.goals/this.gamesPlayed
            this.assistsPerMatch = this.assists/this.gamesPlayed
            this.goalsPlusAssists = this.goals + this.assists
            this.goalsPlusAssistsPerMatch = this.goalsPlusAssists/this.gamesPlayed
            this.passesMadePerMatch = this.passesMade/this.gamesPlayed
            this.passSuccessRate = (this.passesSuccess/this.passesMade) * 100
            this.tackleSuccessRate = (this.tacklesSuccess/this.tacklesMade) * 100
            this.shotSuccessRate = (this.goals/this.shots) * 100
            this.manOfTheMatchPercent = (this.manOfTheMatch/this.gamesPlayed) * 100
            this.favoritePositionEnum = Position[this.favoritePosition]
        }
    };

}


export enum Position {
    midfielder = "Centrocampista",
    forward="Delantero",
    defender="Defensa",
    goalkeeper="Portero",
}

