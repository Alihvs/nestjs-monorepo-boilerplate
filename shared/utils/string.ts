function isJsonString(str: string): boolean {
    try {
        const json = JSON.parse(str);
        return typeof json === 'object';
    } catch (e) {
        return false;
    }
}

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function randomVerificationNumber(length = 5) {
    return Math.floor(
        Math.pow(10, length - 1) +
            Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
    );
}

export { isJsonString, newGuid, randomVerificationNumber };
