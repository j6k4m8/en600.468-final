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

You will need XMLRPC-C, which is available on SourceForge. To download this, you can use the `install-xmlrpc.sh` script.<sup id="r-xmlrpc">[1](f-xmlrpc)</sup>

### `mosesserver` and `casmacat` Installation
After xmlrpc-c has been installed and configured, mosesserver should operate out of the box. The next step is to install and configure [casmacat](https://github.com/casmacat/moses-mt-server/tree/master/python_server).

## Test Data Download and Configuration
Use the `scripts/tests/test-model.sh` script to download and untar some demo data.

## The Whole Enchilada
If you want to have a good day instead of a bad day (e.g. me installing everything on 14.04 a few weeks ago), run `the-whole-enchilada.sh` from the root of the scripts directory. I can guarantee with 0.4% confidence that this will work for you right out of the box.


## Future Work

### Installation Script
I'd really love to spend a few hours writing up a complete installation script for moses and mosesserver — as it stands right now, the installation process is prohibitively difficult for a newbie to the project (and the documentation is sparse unless one knows where to look). One OSX script and one Ubuntu 14.04 script would likely be sufficient, and should be relatively easy to write. I can see this being of immense utility to the field.


-----

<b id="f-xmlrpc">1</b> Full disclosure. I have no idea if what I just did actually works on a new installation, but I had pretty good luck. If you run into trouble, reach out and I'll try my best to help you out, too. [↩](#"r-xmlrpc")
