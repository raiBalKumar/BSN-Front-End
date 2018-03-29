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

    interface Profile{
        firstname: string,
        lastname: string,
        location: string,
        position: string,
        status: string,
        image?: string,
        teamname?: string,
        // teamLogo?: string
    }
}