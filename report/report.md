# Goshen: GOlly, Someone please Help mE acroNymize!
Jordan Matelsky (jmatels1)

## Abstract
> Moses is an immensely powerful statistical machine translation engine that provides a large scheme of tools for those in the machine translation community. However, these tools are prohibitively technical for the casual semi-technical or non-technical user. Goshen provides a front-end JavaScript library for interacting with `mosesserver`, and furthermore expands upon the advantages of abstracting away the actual translation (using `Goshen.adapter.moses`, etc) to enable turn-key drop-in translation backends. (One could viably foresee adding a `Goshen.adapter.googletranslate` to provide an alternative translation backend.)

> To illustrate the utility of Goshen, this project also includes GoshenTalk, a web-app example of using Goshen for real-time asynchronous translation for multiple human end-users.

> I ran into some difficulties while installing Moses and the corresponding upstream supporting libraries. In order to improve this installation experience for others, I have also compiled a series of installation scripts that I used (with success) during the production of my final project. These scripts are known to work on the latest AWS EC2 14.04 Ubuntu AMI.

## Installation and Setup
This section explains the usage of the various parts of the platform that were developed for this project.

If you're looking for a cure-all, do-everything-you-ever-wanted, best-day-ever solution, check out [**The Whole Enchilada**](#the-whole-enchilada) section below.

### Moses Installation
I here describe the setup process I developed in order to best set up a MOSES server quickly for use over HTTP with the Goshen frontend.

I began by writing two scripts that thinly wrapped the suggested protocols on [the MOSES documentation page](http://www.statmt.org/moses/?n=Development.GetStarted), prioritizing simplicity and ease of installation and configuration. My installation uses MOSES with MGIZA for word-alignment. Installation can be performed by running the corresponding `install-moses.sh` and `install-mgiza.sh` scripts from the `scripts/install` directory, which are entirely standalone and can be run in sequence on a new Ubuntu 14.04 installation to go from start to finish without any further installations needed. Depending on your configuration, you may also need to install the correct Boost library for your OS distribution.

I also wrote this front-end to be compatible with the Linux binaries distributed on the MOSES website [here](http://www.statmt.org/moses/RELEASE-3.0/binaries/linux-64bit/linux-64bit.tgz). To use this binary instead, you can run the `configure-from-binary.sh` script. (Note that on an AWS ec2 m3.medium local to Virginia, this download took 10 minutes.)

You will need XMLRPC-C, which is available on SourceForge. To download this, you can use the `install-xmlrpc.sh` script. If you have trouble reproducing my successes, please feel free to reach out and I'll help you as best as I can.

### Test Data Download and Configuration
Use the `scripts/tests/test-model.sh` script to download and untar some demo data.

### `casmacat moses-mt-server` Installation
After xmlrpc-c has been installed and configured, moses-mt-server should operate out of the box. The next step is to install and configure [moses-mt-server](https://github.com/casmacat/moses-mt-server/tree/master/python_server).

I use casmacat's moses-mt-server as a go-between between mosesserver and the JSON interface that Goshen accesses because it provides a more modern, developer-friendly API. Install the suite with `scripts/install/install-casmacat.sh`. (You can also manually clone this repository.)

Note that pip is installed in this step, which is then used to install cherrypy, Levenshtein, and other required libraries.

The moses-mt-server can then be run with `run/runserver-casmacat.sh`.

### The Whole Enchilada
If you want to have a good day instead of a bad day (e.g. the bad day that I had when troubleshooting the install and writing these scripts on 14.04 a few weeks ago), run `the-whole-enchilada.sh` from the root of the scripts directory. I can guarantee with 0.4% confidence that this will work for you right out of the box. (Bug reports are more than welcome on the [GitHub repository](https://github.com/j6k4m8/en600.468-final/issues).)

## Running casmacat's moses-mt-server over mosesserver
Start `mosesserver` with your specified model configuration file. If you want to get off the ground quickly, use `scripts/run/runserver-europarl`, which uses the EuroParl corpus as its model source.

You now have `mosesserver` running locally on port 8080. Next, we'll run casmacat's moses-mt-server.

You can either run the server as per the casmacat documentation, or you can simply run `runserver-casmacat.sh`.

## ...so, finally:
You can run everything inside the `scripts/run` directory — each will need its own terminal to run in, but once you're running those, you can hit your JSON server at `ip:port/translate`.

## Chrome Extension
I also developed a chrome extension that utilizes the CASMACAT moses-mt-server/Moses backend to provide a frontend website translation service. The extension automatically detects the relevant content of most articles or body-text on the page, and at the user's request, translates it to the requested language.

### Known Limitations
**HTTPS**. The server that I am running currently does not support HTTPS, and so translation requests made from websites served over HTTPS will probably fail (depending on your local browser configuration). This can be fixed in Chrome by running chrome with the `--unsafe` flag, though this is, of course, unadvisable.

**German-only.** Currently, my demo only supports the translation of German to English, because my backend Moses server is only trained on the demonstration EuroParl DE→EN corpus. This is, of course, easily extensible, simply by adding the appropriate models to the Moses server.

### Usage
1. **Install the unpacked extension.** Go to `chrome://extensions` and click <kbd>Load Unpacked Extension</kbd>. Navigate to the `goshen-chrome/` directory, and load.
2. This adds a Goshen icon to your Chrome toolbar. ![](figs/chrome-bar.png) Clicking it brings up a simple modal that allows the switching of languages. (See above — currently, only DE→EN translation is supported, as that is all I'm running on my server.)
3. Use the <kbd>Alt</kbd>+<kbd>T</kbd> key-chord ("T" for "Translate") to begin text-selection. The Goshen-translate extension will highlight elements of text in cyan as you mouse over them: To translate what is currently highlighted, click.
  ![](figs/chrome-highlight.png)

## Future Work

### Installation Script
I'd really love to spend a few hours writing up a complete installation script for moses and moses-mt-server — as it stands right now, the installation process is prohibitively difficult for a newbie to the project (and the documentation is sparse unless one knows where to look). One OSX script and one Ubuntu 14.04 script would likely be sufficient, and should be relatively easy to write. I can see this being of immense utility to the field, as it would be very simple to spin up a "template" like a Docker image or an AMI on the AWS Marketplace, and immediately support the Moses stack.

### Chrome Extension
This extension is nearly complete: The main modifications I would like to make are as follows:
- **See-original.** Currently, the HTML element is permanently mutated in-place: To see the original text, you must reload the entire web-page.
- **Translation-candidate display.** One huge advantage that Moses has over Google Translate's Chrome Extension is the native support for multiple candidate-translations. I would very much like to implement support for several overlays, so that mousing over translated text gives alternate translated text alongside the original.

## Acknowledgements
My DOM-traversal code (available in `chromegoshen.js`) is (very) loosely adapted from the code I helped contribute to the Jetzt speed-reading codebase, available [here](https://github.com/ds300/jetzt/). I have many some simplifications and modifications in order to improve its usability for this particular task.
