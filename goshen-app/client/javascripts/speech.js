speak = function(text) {
    var msg = new SpeechSynthesisUtterance(text);
    msg.lang = LOCALES[Session.get('mylang')];
    speechSynthesis.speak(msg);
}
