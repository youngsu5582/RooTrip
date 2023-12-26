export function isDevelopment() {
    if (process.env.NODE_MODE === undefined) return true;
    if (process.env.NODE_MODE === 'local' || process.env.NODE_MODE === 'dev') return true;
    return false;
}
