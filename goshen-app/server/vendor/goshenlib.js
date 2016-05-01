(function(root) {
    Goshen = class Goshen {
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

            console.log(requestURL)
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
    };
})(this);
