export function nameToId(name) {
    return name.toLowerCase().split(' ').join('-')
}

export function filterStringToAllowableCharacters(string) {
    return string.replace(/[^a-zA-Z0-9\-.,!?;:'"()\s]/g, '');
}
