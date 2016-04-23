# GOSHEN: GOlly, Someone please Help mE acroNymize!
Jordan Matelsky (jmatels1)

## Abstract
...

## Usage
This section explains the usage of the various parts of the platform that were developed for this project.

### Server Installation and Configuration
I here describe the setup process I developed in order to best set up a MOSES server quickly for use over HTTP with the GOSHEN frontend.

I began by writing two scripts that thinly wrapped the suggested protocols on [the MOSES documentation page](http://www.statmt.org/moses/?n=Development.GetStarted), prioritizing simplicity and ease of installation and configuration. My installation uses MOSES with MGIZA for word-alignment. Installation can be performed by running the corresponding `install-moses.sh` and `install-mgiza.sh` scripts from the `scripts/install` directory, which are entirely standalone and can be run in sequence on a new Ubuntu 14.04 installation to go from start to finish without any further installations needed. Depending on your configuration, you may also need to install the correct Boost library for your OS distribution.

I also wrote this front-end to be compatible with the Linux binaries distributed on the MOSES website [here](http://www.statmt.org/moses/RELEASE-3.0/binaries/linux-64bit/linux-64bit.tgz). To use this binary instead, you can run the `configure-from-binary.sh` script. (Note that on an AWS ec2 m3.medium local to Virginia, this download took 10 minutes.)

You will need XMLRPC-C, which is available on SourceForge. To download this, you can use the `install-xmlrpc.sh` script.
