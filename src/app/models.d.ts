declare module Models {
    interface User {
        firstname: string,
        lastname: string,
        email: string,
        image?: string,
        position?: string,
        team_id?: number,
        status: string,
        user_id?: number,
        location?: string,
        teamname?: string
    }

    interface Profile {
        firstname: string,
        lastname: string,
        location: string,
        position: string,
        status: string,
        image?: string,
        team_id?: number,
        teamname?: string,
        // teamLogo?: string
    }

    interface TeamInformation {
        teamname: string;
        numberOfPlayers: number;
        logo?: string;
        manager_firstname: string;
        manager_lastname: string;
    }

    interface TeamSquad {
        position: string;
        firstname: string;
        lastname: string;
        image?: string;
    }

    interface TeamFixtures {
        tournament_name: string;
        opponent_teamname: string;
        opponent_logo?: string;
        opponent_position: string;
        date: Date;
        park_name: string;
        district: string;
        street: string;
    }

    interface TournamentFixture {
        tournament_id: number;
        tournament_name: string;
        fixture_id: number;
        home_team_id: number;
        home_teamname: string;
        home_logo: string;
        away_team_id: number;
        away_teamname: string;
        away_logo: string;
        date: Date;
        park_name: string;
        district: string;
        street: string;
        home_score: number;
        away_score: number;
    }

    interface Ranking{
        team_id: number;
        teamname: string;
        logo: string;
        points: number;
        goals_scored: number;
        goals_conceded: number;
        goal_difference: number;
        games: number;
        win: number;
        draw: number;
        lose: number;
    }
    interface Message {
        msg: string;
        user: string;
        time: Date;
    }

    interface TeamInfoForTournamentFixture {
        venues: string;
        teams: string;
    }

    interface CreateTournamentFixture {
        home_team: number;
        away_team: number;
        venue: string;
        date: Date;
    }

    interface TournamentForManager {
        id: number;
        category: string;
        number_of_teams: string;
        game_size: number;
        organizer_id: number;
        winner_prize: string;
        runnerup_prize: string;
        entry_fee: number;
        tournament_name: string;
        tournament_logo: string;
        date: Date;
        location: string;
        t_team_id: number;
        request_team_id: number;
    }

    interface TournamentFixtureForEdit {
        venues: string[];
        teams: string[];
        fixtures: string[];
    }
    
    interface News{
        status: string; 
        totalResults: number;
        articles: {}[];
    }

    interface userInfoForFacebookLogin {
        firstname: string;
        lastname: string;
        location: string;
        status: string;
    }
}