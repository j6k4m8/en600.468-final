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
        return `${this.protocol}/${this.hostname}/translate/${suffix}`;
    }

    translate(text, to, from, callback) {
        /* Translate a string `text`, using `opts` as corequisite options.

        Arguments:
            text (str): The text to translate.
            to (str): The language to translate to
            from (str): The language to translate from
            callback (function): A function to run — takes err, val as args

        Returns:
            None
        */
        var response = HTTP.call('GET', this.url(), {
            q: 'der Obama kommt nach Oslo.',
            key: 'x',
            target: 'en',
            source: 'de'
        });
        return response;
    }
}
