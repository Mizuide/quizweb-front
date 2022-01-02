import { getCookie, putCookie } from '../../util/cookieUtil'

test('putCookieTest', async () => {
    putCookie("testKey", "testValue");

    // keyが一つの場合、末尾に';'は付かない
    const expectStr = 'testKey=testValue';
    expect(document.cookie === expectStr).toBeTruthy();
});

test('replaceCookieTest', async () => {
    putCookie("testKey", "testValue");

    // keyが一つの場合、末尾に';'は付かない
    const expectStr1 = 'testKey=testValue';
    expect(document.cookie === expectStr1).toBeTruthy();

    putCookie("testKey", "replaced");

    // keyが一つの場合、末尾に';'は付かない
    const expectStr2 = 'testKey=replaced';
    expect(document.cookie === expectStr2).toBeTruthy();

});

