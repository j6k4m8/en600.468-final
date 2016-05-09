
class Goshen {
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
}
