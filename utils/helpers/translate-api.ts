import fetch from 'node-fetch';
import { API_TRANSLATE } from '../../routes/api/translate';
import { HTTP_METHOD } from '../constants';


export const callTranslate = async (q:any, source:string, target:string ) => {

    const headers:any = {
		'content-type': 'application/x-www-form-urlencoded',
		'accept-encoding': 'application/gzip',
		'x-rapidapi-key': process.env.TRANSLATE_X_RAPIDAPI_KEY || '',
		'x-rapidapi-host': process.env.TRANSLATE_X_RAPIDAPI_HOST || ''
	}
    const body:any = {q, source, target};

    const endpoint = await fetch(API_TRANSLATE, {method: HTTP_METHOD.POST, headers, body});
    const response = await endpoint.json(); 
    return response;
} 