

/**
 * Retorna del item, que es una cadena que contiene un valor
 * a splitear, lo separa y lo almacena por properties y lo retorna
 * en un objeto
 * @param item : PE = '123:'ES UN ID''
 * @param splitter : PE = ':'
 * @param properties : PE = ['id','value']
 * @returns data : PE = data{id:123, value:'ES UN ID'}
 */
export function splitStringByParams(item:string, splitter: string, properties: string[]): any {
    const splited = item.split(splitter);

    let data:any = {};
    for(let i = 0; i < properties.length; i++) {
        data[properties[i]] = splited[i]; 
    }
    return data;
}

/**
 * A partir de una lista de propiedades a splitear lo retornamos objetos spliteados con sus 
 * respectiva propiedades
 * @param list 
 * @param splitter 
 * @param properties 
 * @returns 
 */
export function listDataSplitted(list:string[], splitter: string, properties: string[]): any[] {
    let result:any[] = [];

    if(list && list.length > 0) {
        list.forEach(item => result.push(splitStringByParams(item, splitter, properties)) );
    }
    return result;
}