// The languages that moses supports for this example. (Obviously
// this can be expanded trivially.)
LANGUAGES = {
    English: 'en',
    en: 'en',
    German: 'de',
    de: 'de'
}

// Locales are more specific than languages:
LOCALES = {
    English: 'en-US',
    en: 'en-US',
    German: 'de',
    de: 'de'
}


serialize = function(obj) {
    /* Serialize a JSON dictionary into a URL-friendly string.

    Arguments:
        obj (dict): The object to serialize

    Returns:
        String: the serialized string.
    */
    var str = [];
    for (var p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
    return str.join("&");
};
