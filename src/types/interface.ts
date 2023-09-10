export enum Gender{
    'female'=1,
    'male'=2,
    'unknown'=3
}

export interface UserInfo{
    uid:number
    username:string
    avatar:string
    gender:Gender
}

