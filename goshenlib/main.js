(function (root) {

    // Append Goshen to the window or root, depending on if we're in a
    // server or browser environment.
    var _goshen = root._goshen;

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


    class MosesGoshenAdapter {
        /* A Moses-mt-server implementation of the GoshenAdapter class. */
        constructor(hostname, protocol, opts) {
            // Create a new MosesGoshenAdapter.
            this.hostname = hostname;
            this.protocol = protocol || 'http';
        }

        url(suffix) {
            suffix = suffix || '';
            return `${this.protocol}://${this.hostname}/translate?${suffix}`;
        }

        translate(text, target, source, callback) {
            /* Translate a string `text`, using `opts` as corequisite options.

            Arguments:
                text (str): The text to translate.
                target (str): The language to translate to
                source (str): The language to translate from
                callback (function): The function to call on the translated text

            Returns:
                str: The translated text
            */

            var requestURL = this.url(serialize({
                q: text,
                key: 'x',
                target: target || LANGUAGES.en,
                source: source || LANGUAGES.de
            }));

            if (!!root.Meteor && !!root.HTTP) {
                var response = HTTP.call('GET', requestURL, {});
                var translated = response.data;
                if (callback) callback(text, translated);

            } else if (!!root.XMLHttpRequest) {
                var request = new XMLHttpRequest();
                request.open('GET', requestURL, false);
                request.send(null);

                if (request.status === 200) {
                    var translated = root.JSON.parse(request.responseText);
                    if (callback) callback(text, translated);
                }
            }
            return translated.data.translations[0].translatedText
        }
    }

    // Append to the global namespace.
    _goshen.Goshen = class Goshen {
        constructor(hostname, protocol, type, opts) {
            /* Create a new Goshen object.

            Arguments:
                hostname (str): A protocol-less URI such as `255.255.0.0:3000`
                protocol (str: 'http'): A protocol (either 'http' or 'https')
                type (class): The type of adapter to use by default.
                opts (dict): Options for configuration.

            The options configuration dictionary can contain
            */
            type = type || MosesGoshenAdapter;
            this.ga = new type(hostname, protocol, opts);
        }

        url(suffix) {
            /* Generate a URI for a given suffix. Outsources entirely to
            the GoshenAdapter interface.

            Arguments:
                suffix (str): The URL to encode

            Returns:
                str: The complete URL.
            */
            return this.ga.url(suffix);
        }

        translate(text, target, source, callback) {
            /* Translate a string `text`, using `opts` as corequisite options.

            Arguments:
                text (str): The text to translate.
                target (str): The language to translate to
                source (str): The language to translate from
                callback (function): The fn to call on the translation, if any

            Returns:
                str: The translated text
            */
            return this.ga.translate(text, target, source, callback);
        }
    };
})(this);
