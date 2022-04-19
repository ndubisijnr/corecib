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
        logoUrlGhana: "https://assets-base.s3.amazonaws.com/img/firstbank/fbnLogoGhana.png",
        logoUrlDrc: "https://assets-base.s3.amazonaws.com/img/firstbank/fbnLogoDrc.png",
        logoUrlSenegal: "https://assets-base.s3.amazonaws.com/img/firstbank/fbnLogoSenegal.png",
        logoUrlGuinea: "https://assets-base.s3.amazonaws.com/img/firstbank/fbnLogoGuinea.png",
        facebookUrlGhana: "https://www.facebook.com/firstbankgh",
        twitterUrlGhana: "https://twitter.com/FBNBankGh",
        instagramUrlGhana: "https://www.instagram.com/fbnbbankgh",
        linkedinUrlGhana: "https://www.linkedin.com/company/fbnbank-ghana-ltd",
        facebookUrlDrc: "#",
        twitterUrlDrc: "#",
        instagramUrlDrc: "#",
        linkedinUrlDrc: "#",
        facebookUrlSenegal: "https://www.facebook.com/FBNBankSenegal",
        twitterUrlSenegal: "https://twitter.com/fbnbank_senegal",
        instagramUrlSenegal: "https://www.instagram.com/fbnbanksenegal",
        linkedinUrlSenegal: "https://www.linkedin.com/company/fbnbank-senegal",
        facebookUrlGuinea: "https://www.facebook.com/fbnbankguinee",
        twitterUrlGuinea: "https://twitter.com/FBNBankGuinea",
        instagramUrlGuinea: "https://www.instagram.com/FBNBankGuinea",
        linkedinUrlGuinea: "#",
        primaryColor: "#6d0606",
        publicPath: "/home/",
        stage: "dev"
    };
    window.__env.api = {
        // baseUrl: "https://fbndirect.fbngroup.com/fbncore/api/v1/",
        // "baseUrl": "https://fbndirect.fbngroup.com/fbncoredrc/api/v1/",
        // "baseUrl": "https://fbndirect.fbngroup.com/fbncoreguinea/api/v1/",
        // "baseUrl": "https://fbndirect.fbngroup.com/fbncoresenegal/api/v1/",
        "baseUrl": "https://196.11.150.250/fbncore/api/v1/",
        // "baseUrl": "http://54.184.87.138:8080/fbncore/api/v1/",
        timeout: 80000
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