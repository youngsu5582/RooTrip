export function isDevelopment(mode?:string) {
    const nodeMode = mode ?? process.env.NODE_MODE;
    if (nodeMode === undefined) return true;
    if (nodeMode === 'test' || nodeMode === 'dev') return true;
    return false;
}
