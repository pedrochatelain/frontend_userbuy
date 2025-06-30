function decodeToken(token: string): any {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
}

module.exports = decodeToken