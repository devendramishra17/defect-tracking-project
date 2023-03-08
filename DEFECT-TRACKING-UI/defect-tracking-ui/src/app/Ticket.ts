import { user } from "./User";

export class ticket{
    ticketname:String | undefined;
    description:String | undefined;
    statusid_fk:any | undefined;
    assigntoid:any | undefined;
    ticketcreatorid:user | undefined;
    project: any | undefined

}

