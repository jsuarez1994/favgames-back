"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY_API_GAMES = exports.API_GAMES_PATH = exports.API_AUTH_GAMES = void 0;
exports.API_AUTH_GAMES = 'https://id.twitch.tv/oauth2/token?client_id={{client-id}}&client_secret={{client-secret}}&grant_type={{grant-type}}';
exports.API_GAMES_PATH = 'https://api.igdb.com/v4/games';
exports.QUERY_API_GAMES = 'fields name, summary, screenshots.url, platforms.name, release_dates.human, rating;sort rating desc;where rating != null;limit 2;offset {{page}};';
//# sourceMappingURL=games.js.map