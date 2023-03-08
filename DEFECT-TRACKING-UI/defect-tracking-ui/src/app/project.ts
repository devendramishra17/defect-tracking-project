import { user } from "./User"

export class project{
        projectid:number | undefined
        projectName:String | undefined
        description:String | undefined
        createdTime: any
        modifiedTime:any
        creator:any | undefined 
        ticket:Array<any> = [];
}