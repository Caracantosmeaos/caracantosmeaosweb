import type { IMatchPlayer } from "@/interfaces/matchPlayer.interface";

export default class MatchPlayerEntity implements IMatchPlayer {
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
    tacklesSuccess: number
    tackleSuccessRate: number


    public constructor(player: IMatchPlayer){
        Object.assign(this, player)
        //this.positionType = Position[this.position]
        if(!(player instanceof MatchPlayerEntity)){
            this.shotAccuracyPercent = (this.goals/this.shots) * 100
            this.passSuccessRate = (this.passesSuccess/this.passesMade) * 100
            this.tackleSuccessRate = (this.tacklesSuccess/this.tacklesMade) * 100
        }
    }
}
enum Position {
    Centrocampista = "midfielder",
    Delantero = "forward",
    Defensa = "defender",
    Portero = "goalkeeper",
}
/*type Position = "midfielder" | "forward" | "defender" | "goalkeeper"
let Position = {
    Centrocampista: "midfielder",
    Delantero: "forward",
    Defensa: "defender",
    Portero: "goalkeeper",
}*/
