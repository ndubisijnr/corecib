/*
This file goes as an asset without any of compilation even after build process.
Thus, it can be replaced in a runtime by different file in another environment.

Example for Docker:
  docker run -v ./local_cfg_dir:cfg image:tag
*/

(function(window) {
    window.__env = window.__env || {};
    window.__env.app = {
        title: "FBNDirect Portal",
        description: "FBNDirect Portal",
        primaryColor: "#3F88C5",
        publicPath: "/home/",
        stage: "dev"
    };
    window.__env.api = {
        "baseUrl": "https://sandbox.bizgem.io",
        timeout: 80000,
        "imageUpload": "https://m2nz1o078e.execute-api.us-east-1.amazonaws.com/prod"
    };
    window.__env.captcha = {
        "enabled": true,
        "key": "Mee1ieth1IeR8aezeiwi0cai8quahy"
    };
    window.__env.rollbar = {
        "enabled": true,
        "token": "zieriu1Saip5Soiquie6zoo7shae0o"
    };
    window.__env.debug = false;
})(this);