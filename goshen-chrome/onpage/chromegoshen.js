(function (window) {

    var _goshen = window._goshen;

    class ChromeGoshen {
        constructor() {
            this.G = new _goshen.Goshen("ec2-52-23-242-15.compute-1.amazonaws.com:8081");
            console.info("Goshenjs engine loaded successfully.")
        }
    };

    _goshen._cg = new ChromeGoshen();

})(this);
