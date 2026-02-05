export type Response = {
    data : object;
    error : error;
    message : string;
    status : number;
}

type error = {
    data : {
        message : string;
    }
}