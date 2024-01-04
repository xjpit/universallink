export const SUCCESS_CODE = 200;
export const ERROR_CODE = 500;

export interface NetworkResponseInterface {
    status: 'fail' | 'success';
    code: number;
    message: string;
    result?: any;
}

interface NetworkRequestOptionsInterface {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: any;
    body?: any;
}

const success = (message: string, data?: any): NetworkResponseInterface => {
    return {
        status: 'success',
        code: SUCCESS_CODE,
        message: message,
        result: data
    }
}

const fail = (message: string): NetworkResponseInterface => {
    return {
        status: 'fail',
        code: ERROR_CODE,
        message: message
    }
}

export const NR = { success, fail }

export const get = async(url: string): Promise<NetworkResponseInterface> => {
    const res = await fetch(url, {cache: 'no-cache'})
        .then(respon => respon.json())
        .then((data: NetworkResponseInterface) => {
            if (data.code === ERROR_CODE) {
                throw new Error(data.message)
            }
            else return data
        })
    return res
}

export const post = async(url: string, data?: any): Promise<NetworkResponseInterface> => {
    const options: NetworkRequestOptionsInterface = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    if (data !== undefined) {
        options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options)
        .then(respon => respon.json())
        .then((data: NetworkResponseInterface) => {
            if (data.code === ERROR_CODE) {
                throw new Error(data.message)
            }
            else return data
        })
    return res
}

export const put = async(url: string, data: any): Promise<NetworkResponseInterface> => {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(respon => respon.json())
        .then((data: NetworkResponseInterface) => {
            if (data.code === ERROR_CODE) {
                throw new Error(data.message)
            }
            else return data
        })
    return res
}

export const del = async(url: string): Promise<NetworkResponseInterface> => {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(respon => respon.json())
        .then((data: NetworkResponseInterface) => {
            if (data.code === ERROR_CODE) {
                throw new Error(data.message)
            }
            else return data
        })
    return res
}