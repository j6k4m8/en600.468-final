# Goshen.js Documentation

## Overview
TODO

## Usage
TODO

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
