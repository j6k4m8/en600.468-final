# Goshen: GOlly, Someone please Help mE acroNymize!
Jordan Matelsky (jmatels1)

## Abstract
Moses is an immensely powerful statistical machine translation engine that provides a large scheme of tools for those in the machine translation community. However, these tools are prohibitively technical for the casual user. Goshen provides a front-end JavaScript library for interacting with `mosesserver`, and furthermore expands upon the advantages of abstracting away the actual translation (using `Goshen.adapter.moses`, etc) to enable turn-key drop-in translation backends. (One could viably foresee adding a `Goshen.adapter.googletranslate` to provide an alternative translation backend.)

To illustrate the utility of Goshen, this project also includes GoshenTalk, a web-app example of using Goshen for real-time asynchronous translation for multiple human end-users.

## Installation and Setup
This section explains the usage of the various parts of the platform that were developed for this project.

If you're looking for a cure-all, do-everything-you-ever-wanted, best-day-ever solution, check out **The Whole Enchilada** section below.

### Moses Installation
I here describe the setup process I developed in order to best set up a MOSES server quickly for use over HTTP with the Goshen frontend.

I began by writing two scripts that thinly wrapped the suggested protocols on [the MOSES documentation page](http://www.statmt.org/moses/?n=Development.GetStarted), prioritizing simplicity and ease of installation and configuration. My installation uses MOSES with MGIZA for word-alignment. Installation can be performed by running the corresponding `install-moses.sh` and `install-mgiza.sh` scripts from the `scripts/install` directory, which are entirely standalone and can be run in sequence on a new Ubuntu 14.04 installation to go from start to finish without any further installations needed. Depending on your configuration, you may also need to install the correct Boost library for your OS distribution.

I also wrote this front-end to be compatible with the Linux binaries distributed on the MOSES website [here](http://www.statmt.org/moses/RELEASE-3.0/binaries/linux-64bit/linux-64bit.tgz). To use this binary instead, you can run the `configure-from-binary.sh` script. (Note that on an AWS ec2 m3.medium local to Virginia, this download took 10 minutes.)

You will need XMLRPC-C, which is available on SourceForge. To download this, you can use the `install-xmlrpc.sh` script. If you have trouble reproducing my successes, please feel free to reach out and I'll help you as best as I can.

### Test Data Download and Configuration
Use the `scripts/tests/test-model.sh` script to download and untar some demo data.

### `casmacat` Installation
After xmlrpc-c has been installed and configured, mosesserver should operate out of the box. The next step is to install and configure [moses-mt-server](https://github.com/casmacat/moses-mt-server/tree/master/python_server).

I use casmacat's moses-mt-server as a go-between between mosesserver and the JSON interface that Goshen accesses. Install the suite with `scripts/install/install-casmacat.sh`. (You can also manually clone this repository.)

Note that pip is installed in this step, which is then used to install cherrypy, Levenshtein, and other required libraries.

The moses-mt-server can then be run with `run/runserver-casmacat.sh`.

### The Whole Enchilada
If you want to have a good day instead of a bad day (e.g. me installing everything on 14.04 a few weeks ago), run `the-whole-enchilada.sh` from the root of the scripts directory. I can guarantee with 0.4% confidence that this will work for you right out of the box.

## Running casmacat's moses-mt-server over mosesserver
Start `mosesserver` with your specified model configuration file. If you want to get off the ground quickly, use `scripts/run/runserver-europarl`, which uses the EuroParl corpus as its model source.

You now have `mosesserver` running locally on port 8080. Next, we'll run casmacat's moses-mt-server.

You can either run the server as per the casmacat documentation, or you can simply run `runserver-casmacat.sh`.

## ...so, finally:
You can run everything inside the `scripts/run` directory — each will need its own terminal to run in, but once you're running those, you can hit your JSON server at `ip:port/translate`.

## Chrome Extension
I also developed a chrome extension that utilizes the CASMACAT moses-mt-server/Moses backend to provide a frontend website translation service. The extension automatically detects the content of most articles or body-text on the page, and at the user's request, translates it to the requested language.

- limitations on length
- implemented demo only — only de→en 

### Known Limitations
The server that I am running currently does not support HTTPS, and so translation requests made from websites served over HTTPS will probably fail (depending on your local browser configuration). This can be fixed in Chrome by running chrome with the `--unsafe` flag, though this is, of course, unadvisable.

## Future Work

### Installation Script
I'd really love to spend a few hours writing up a complete installation script for moses and mosesserver — as it stands right now, the installation process is prohibitively difficult for a newbie to the project (and the documentation is sparse unless one knows where to look). One OSX script and one Ubuntu 14.04 script would likely be sufficient, and should be relatively easy to write. I can see this being of immense utility to the field.

## Acknowledgements
My DOM-traversal code (available in `chromegoshen.js`) is (very) loosely adapted from the code I helped contribute to the Jetzt speed-reading codebase, available [here](https://github.com/ds300/jetzt/). I have many some simplifications and modifications in order to improve its usability for this particular task.
