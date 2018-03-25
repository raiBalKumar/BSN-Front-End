declare module Models {
    interface User {
        firstname: string,
        lastname: string,
        email: string,
        image? : string | null,
        position? : string | null,
        team_id? : number | null,
        status : string,
        user_id?: number,
        location?: string | null
    }
}