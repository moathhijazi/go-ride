export type Response = {
    data : object;
    error : error;
}

type error = {
    data : object;
    message : string;
    status : number;
}