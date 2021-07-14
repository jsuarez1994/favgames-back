export const API_AUTH_GAMES:string = 'https://id.twitch.tv/oauth2/token?client_id={{client-id}}&client_secret={{client-secret}}&grant_type={{grant-type}}'

export const API_GAMES_PATH:string = 'https://api.igdb.com/v4/games';
export const QUERY_API_GAMES:string = 'fields name, summary, screenshots.url, platforms.name, release_dates.human, rating;sort rating desc;where rating != null;limit 2;offset {{page}};'