import { ref, type Ref } from "vue";
import FetchService from "./FetchService";
import ClubMember from "../model/ClubMember";
export default class ClubMembersService extends FetchService{

    constructor(){
        super()
        this.data = ref<Array<ClubMember>>(undefined)
    }

    getData():Ref<Array<ClubMember>>{
        return this.data;
    }


    async fetch(): Promise<void>{
        try{
            const url = "https://api.caracantosmeaos.club/members"
            const response = await fetch(url)
            const json = await response.json()
            this.status.value = response.status           
            
            if(this.status.value==200 && json.status==200){
                let parsed:Array<ClubMember> = []
                for (var member in json.response){
                    var parsedMember = new ClubMember(json.response[member])
                    parsed.push(parsedMember)
                }
                this.data.value = parsed;
            }else this.error.value = response.statusText
        }catch(error){
            console.log(error)
            this.error.value = error
        }finally{
            this.isloading.value = false;
        }
    }
}