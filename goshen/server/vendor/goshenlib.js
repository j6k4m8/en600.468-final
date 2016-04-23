Goshen = class Goshen {
    constructor(hostname, protocol, opts) {
        /* Create a new Goshen object.

        Arguments:
            hostname (str): A url such as `255.255.0.0:3000`
            protocol (str: 'http'): An http protocol (either 'http' or 'https')
            opts (dict): Options for configuration.
                from (str): The default `from` language
                to (str): The default `to` language

        The options configuration dictionary can contain
        */
        this.hostname = hostname || Meteor.settings.moses_server.default_url;
        this.protocol = protocol || 'http';
    }

    url(suffix) {
        suffix = suffix || '';
        return `${this.protocol}://${this.hostname}/translate?${suffix}`;
    }

    translate(text, target, source) {
        /* Translate a string `text`, using `opts` as corequisite options.

        Arguments:
            text (str): The text to translate.
            target (str): The language to translate to
            source (str): The language to translate from

        Returns:
            str: The translated text
        */
        var response = HTTP.call('GET', this.url(serialize({
            q: text,
            key: 'x',
            target: target || LANGUAGES.en,
            source: source || LANGUAGES.de
        })), {});
        return response.data.data.translations[0].translatedText;
    }
}
