export const camelCase = (str: Lowercase<string>) => {
    const [start, ...rest] = str.split('');

    return start.toUpperCase() + rest.join('');
} 