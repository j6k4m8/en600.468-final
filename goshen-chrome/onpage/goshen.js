(function (root) {

    var _goshen = root._goshen;

    LANGUAGES = {
        English: 'en',
        en: 'en',
        German: 'de',
        de: 'de'
    }

    LOCALES = {
        English: 'en-US',
        en: 'en-US',
        German: 'de',
        de: 'de'
    }


    serialize = function(obj) {
        var str = [];
        for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };



    _goshen.Goshen = class Goshen {
        constructor(hostname, protocol, opts) {
            /* Create a new Goshen object.

            Arguments:
            hostname (str): A protocol-less URI such as `255.255.0.0:3000`
            protocol (str: 'http'): An http protocol (either 'http' or 'https')
            opts (dict): Options for configuration.
            from (str): The default `from` language
            to (str): The default `to` language

            The options configuration dictionary can contain
            */
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
                var translated = response.data.data.translations[0].translatedText;
                if (callback) callback(text, translated);
                return translated;

            } else if (!!root.XMLHttpRequest) {
                var request = new XMLHttpRequest();
                request.open('GET', requestURL, false);  // `false` makes the request synchronous
                request.send(null);

                if (request.status === 200) {
                    var translated = root.JSON.parse(request.responseText).data.translations[0].translatedText;
                    if (callback) callback(text, translated);
                    return translated;
                }
            }
        }
    };
})(this);
