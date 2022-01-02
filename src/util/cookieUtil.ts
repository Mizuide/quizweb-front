export type cookieOption = {
    expires?: string,  //Cookieの有効期限(日付)
    maxAge?: string,  //Cookieの有効期限(秒数)
    domain?: string, //Cookieを送信するドメイン
    path?: string,     //Cookieを送信するPATH
    secure?: boolean,        //https の通信を使用しているときだけクッキーを送信
    httpOnly?: boolean,      //document.cookieを使ってCookieを扱えなくする
    samesite?: string  //他サイト経由でリクエスト時にCookieを送信するかどうか
}


export function getCookie(key: string) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split('=');
        if (cookie[0] === key)
            return cookie[1];
    }
    return null;
}

export function putCookie(key: string, value: string, option?: cookieOption) {
    if (getCookie(key) !== null) {
        document.cookie = `${key}=;max-age-0;`
    }

    let cookieQuery = `${key}=${value};`

    if (option?.expires)
        cookieQuery += `expires=${option.expires};`
    if (option?.maxAge)
        cookieQuery += `max-age=${option.maxAge};`
    if (option?.domain)
        cookieQuery += `domain=${option.domain};`
    if (option?.path)
        cookieQuery += `path=${option.expires};`
    if (option?.secure)
        cookieQuery += `secure;`
    if (option?.httpOnly)
        cookieQuery += `httpOnly;`
    if (option?.expires)
        cookieQuery += `samesite=${option.samesite};`

    document.cookie = cookieQuery;
}

export function removeCookie(key: string) {
    document.cookie = `${key}=;max-age-0;`
}