declare module Models {
    interface User {
        firstname: string,
        lastname: string,
        email: string,
        image? : string,
        position? : string,
        team_id? : number,
        status : string,
        user_id?: number,
        location?: string,
        teamname?: string
    }
}