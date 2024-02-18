import { type Ref, ref } from "vue";
export default abstract class FetchService {
    protected data: Ref<any>
    protected status:Ref<Number>
    protected error:Ref<String>
    public isloading:Ref<Boolean>

    constructor(){
        this.isloading = ref<Boolean>(true)
        this.status = ref<Number>(101)
        this.error = ref<String>("")
    }

    abstract getData(): Ref<any>

    getStatus():Ref<Number>{
        return this.status
    }

    getError():Ref<String>{
        return this.error
    }

    abstract fetch(): Promise<void>
}