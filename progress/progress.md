# Final Project Progress Report

**Jordan Matelsky** — jmatels1 <br>
April 20, 2016

## Current Progress
### AMI Scripts
I have developed a set of scripts (available on [GitHub](https://github.com/j6k4m8/en600.468-final)) that serve as an installation script for all server-side systems required to run the Moses+CASMACAT+Meteor server stack on a new Ubuntu 14.04 installation. This is valuable, as it has allowed me to test several configurations on several virtual machines (I'm currently using AWS) without having to configure each system manually. These scripts can be found at [`master:/scripts/`](https://github.com/j6k4m8/en600.468-final/tree/master/scripts).

Furthermore, these scripts can all be run in sequence (see the files for more details), which is valuable for the purpose of developing an Amazon AMI for the marketplace. (To the best of my knowledge, a standalone Moses AMI does not currently exist.) With this installation script, it is possible to have a turn-key Moses server running with one line of code.

### Goshenlib.js
I have started progress on a very simple JavaScript library adaptable to work with any arbitrary translation backend. Currently, it is hardcoded to work only with a CASMACAT REST API. However, it is trivially expandable to interface with a Google Translate (or other) translation service, as I mention in the **Next Steps** section.

### Chat App
I have begun development on a realtime translation application for translating chat messages between users in an online, simple chat room. This is intended as a proof of concept of the Goshen library, more than a production-ready standalone application.

Below, we see this application in use:

> ![](app-demo.gif)
> <small>The user first receives a message from another user. (The other user has nothing interesting to say!) The current user switches his native language to English, and all chat messages that are not natively written in English are either translated, or a cached translation is substituted.</small>

This application currently uses a small, lower-case corpus of DE⟷EN.

### Chrome Extension
This project aims to incorporate this style of translation into a realtime Chrome extension that functions similarly to the existing Google Translate extension script [available here](https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb?hl=en). Though Goshenlib.js has been designed with this end-goal in mind, I have not yet published my in-progress code to actually manifest this extension.

## Next Steps
### AMI Scripts
My next step is to perfect the installation script (there are still some cases where user input is needed) and ensure that all of the scripts work with minimal sudo-access required. This will allow the deploy of a Moses+CASMACAT server with a single line of code (or the press of a button from the AWS control panel). These scripts can also be adapted to run in a Dockerfile, for debugging or easy-deploy purposes.

### Goshenlib.js
This library allows the easy client-side comparison of translation results via the use of two Goshen adapters, which will likely prove useful to those looking for consensus between several translation source. (For instance, one might compare the results of the slower pingback time of Google Translate, compared against the accuracy of Moses). As Google Translate is the current go-to for developers, I intend to make Moses a viable alternative for the savvy developer. This is in large part simplified by having an easily deployed (perhaps Dockerized) Moses server, as mentioned in the section above.

### Chat App
My future plans for the app do not extend very far, as this is an interesting use-case for machine-translation, but is certainly not particularly novel — see the [Skype realtime translation system](http://blogs.skype.com/2014/12/15/skype-translator-how-it-works/) — nor is it particularly interesting from an academic perspective beyond a proof of concept. I intend to add more languages, but as a proof of *CASMACAT* rather than a proof of the Goshen library.

### Chrome Extension
My final plans for this project involve releasing the code for a Chrome extension that can be used on top of a Moses+CASMACAT back-end, as a stand-in for the Google Translate Chrome Extension. This is a non-trivial undertaking, but it not only improves the visibility of the CASMACAT repository; it also allows independent developers to contribute to an alternate web-translation engine.

The algorithms developed for isolating 'content' (versus non-translatable components on the page) are highly reusable, and can be used in the future by others looking to translate webpages in realtime.

The specsheet for this particular component of my project is available near the top of [this page](http://www.statmt.org/moses/?n=Moses.GetInvolved). A less functional, and less modern version is available [here](http://www.statmt.org/moses/?n=Moses.WebTranslation), against which I intend to model some of my DOM-navigation and pruning code.

-----

I'm very open to hearing your feedback! I want to be sure this is both useful and interesting to the Moses/CASMACAT/MT community, which I am not nearly as familiar with as I'd like!
