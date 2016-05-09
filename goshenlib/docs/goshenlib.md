# Goshen.js Documentation

## Overview
The Goshen library provides a web-developer-facing library for handling machine translation. It allows interaction with arbitrary machine translation services, agnostic of the technology or algorithm stack.

## Usage
A very brief tutorial is provided here:

- Create a new Goshen object. Use the MosesGoshenAdapter, so that translations are handled by a Moses MT server.
    ```JavaScript
    g = new Goshen('localhost:3000', 'http', MosesGoshenAdapter);
    ```
- Use the Goshen object to pass a translation job to the Moses adapter. The adapter will pass back a completed translation once the job completes.
    ```JavaScript
    g.translate('This is a simple sentence.', Languages.ENGLISH, Languages.SPANISH);
    ```
- You can also optionally pass a callback function to the .translate method:
    ```JavaScript
    g.translate('This is a simple sentence.',
                Languages.ENGLISH,
                Languages.SPANISH,
                function(err, val) {
        if (!!err) {
            console.warn("Encountered an error: " + err);
        } else {
            console.info("Translated to: " + val);
        }
    });
    ```
    If a callback is supplied, the function is run on a new thread, and is non-blocking. If one is not supplied, then the return value of the function contains the translated text. `undefined` is returned if the translation fails.


## `Goshen`
The generic class for a Goshen.js object, the object that handles translation with an arbitrary translation backend. In order to specify a backend, pass a `type` parameter to the constructor. (Default is Moses, of course!)

- `Goshen`
    - Arguments:
        - `hostname`: A string hostname, such as `locahost:8000`. This is the base URL for formulating the RESTful API endpoint.
        - `protocol`: The HTTP protocol. Either `http` or `https`.
        - `type`: What type of GoshenAdapter to use. Options are currently `GoogleTranslateGoshenAdapter` or `MosesGoshenAdapter`.
        - `opts`: A dictonary of options to pass to the adapter constructor. Currently, none are required for existing adapters.

- function `url`

    Generate a complete URI. If `hostname` is `localhost:8000` and `protocol` is `https`, then `this.url('foo')` returns `https://localhost:8000/foo`
    - Arguments:
        - `suffix`: A suffix to concatenate onto the end of a well-formed URI.
    - Returns:
        - String: The complete web-accessible URL.

- function `translate`

    Translate a text from a source language to a target language.
    - Arguments:
        - `text`: The text to translate. If this is too long, a series of truncated versions are translated, splitting on sentence-delimiters if possible.
        - `source`: An item from the `LANGUAGES` set (e.g. `'en-us'`)
        - `target`: An item from the `LANGUAGES` set (e.g. `'en-us'`)
        - `callback`: Optional. If supplied, must be a function (or be of a callable type) that will be run with `errors` and `value` as its two arguments.
    - Returns:
        - String: The translated text. All supplementary data, such as alignments or language detections, are ignored by this function.


## `GoshenAdapter`
The `Goshen` class secretly outsources all of its computation to a GoshenAdapter class attribute, which is responsible for performing the machine translation. `GoshenAdapter`s should expose `url` and `translate` functions unambiguously, with the same signatures as those in the `Goshen` class. Other functions may be optionally exposed.

### `MosesGoshenAdapter`
This is one particular implementation of the `GoshenAdapter` type, that uses the `moses-mt-server` backend as its translation engine API endpoint. It splits text into manageable chunks when translating, to avoid crashing the underlying Moses server (RAM allocation fail).

### `GoogleTranslateGoshenAdapter`
This is another implementation of the `GoshenAdapter` type, that uses the Google Translate API as its translation engine endpoint. Because Google handles arbitrarily long text, this adapter does not split text, as `MosesGoshenAdapter`s do.
