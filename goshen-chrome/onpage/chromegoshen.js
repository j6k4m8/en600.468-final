(function (window) {

    var _goshen = window._goshen;

    _goshen.ChromeGoshen = class ChromeGoshen {
        constructor() {
            this.G = new _goshen.Goshen("ec2-52-23-242-15.compute-1.amazonaws.com:8081");
        }
    }

})(this);
