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