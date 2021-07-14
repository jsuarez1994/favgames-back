import { API_TRANSLATE } from '../../routes/api/translate';
import { HTTP_METHOD } from '../constants';
import fetch from 'node-fetch';

export const callApi = async (url:string, method:string, headers?:any, body?:any) => {
  let request = { };
  if(headers && body) {
    request = {method, headers, body};
  } else {
    if(headers) { request = {method, headers}; }
    else if(body) { request = {method, body}; }
    else { request = {method}}
  }

  const endpoint = await fetch(url, request);
  const response = await endpoint.json(); 
  return response;
}


// TODO: 502 Bad Gateway
export const callApiTranslate = async (q:string) => {

  const headers:any = {
		'content-type': 'application/x-www-form-urlencoded',
		'accept-encoding': 'application/gzip',
		'x-rapidapi-key': process.env.TRANSLATE_X_RAPIDAPI_KEY || '',
		'x-rapidapi-host': process.env.TRANSLATE_X_RAPIDAPI_HOST || ''
	}
  const body:any = {q, target: 'es', source: 'en'};

  const endpoint = await fetch(API_TRANSLATE, {method: HTTP_METHOD.POST, headers, body});
  const response = await endpoint.json(); 
  return response;
} 