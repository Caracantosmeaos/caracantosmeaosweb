import { ref, type Ref } from "vue";
import FetchService from "@services/FetchService";
import ClubMatch from "@models/match/ClubMatch";
export default class ClubMatchService extends FetchService{

    matchType: string

    constructor(type: string){
        super()
        this.data = ref<Array<ClubMatch>>(undefined)
        this.matchType = type
    }

    getData():Ref<Array<ClubMatch>>{
        return this.data;
    }


    async fetch(): Promise<void>{
        try{
            const url = "https://api.caracantosmeaos.club/club/matchHistory/"+this.matchType
            const response = await fetch(url)
            const json = await response.json()
            this.status.value = response.status           
            
            if(this.status.value==200 && json.status==200){
                let parsed:Array<ClubMatch> = []
                for (var match in json.response){
                    var parsedMatch = new ClubMatch(json.response[match])
                    parsed.push(parsedMatch)
                }
                this.data.value = parsed;
            }else this.error.value = response.statusText
        }catch(error){
            console.log(error)
            this.error.value = error
        }finally{
            console.log("Finished "+this.matchType)
            this.isloading.value = false;
        }
    }
}