export default class ClubStats {
    bestDivision: String
    bestFinishGroup: number
    gamesPlayed: number
    gamesPlayedPlayoff: number
    promotions: number
    losses: number
    ties: number
    wins: number
    winstreak: number
    unbeatenstreak: number
    skillRating: number
    reputationtier: number
    leagueAppearances: number

    constructor(json: any){
        this.bestDivision = Division[Number(json.bestDivision)]
        this.bestFinishGroup = Number(json.bestFinishGroup)
        this.gamesPlayed = Number(json.gamesPlayed)
        this.gamesPlayedPlayoff = Number(json.gamesPlayedPlayoff)
        this.promotions = Number(json.promotions)
        this.losses = Number(json.losses)
        this.ties = Number(json.ties)
        this.wins = Number(json.wins)
        this.winstreak = Number(json.wstreak)
        this.unbeatenstreak = Number(json.unbeatenstreak)
        this.skillRating = Number(json.skillRating)
        this.reputationtier = Number(json.reputationtier)
        this.leagueAppearances = Number(json.leagueAppearances)
    }
    

}

enum Division{
    Elite=1,
    Primera=2,
    Segunda=3,
    Tercera=4,
    Cuarta=5,
    Quinta=6
}

