import { Activity } from "src/model/activity.entity";
import { ActivityPriority } from "src/enum/activity.priority";
import { ActivityStatus } from "src/enum/activity.status";
import { ActivityType } from "src/enum/activity.type";

export class ActivityDtoResponse {
    
    title : string
    type : ActivityType
    status : ActivityStatus
    priority : ActivityPriority
    
}