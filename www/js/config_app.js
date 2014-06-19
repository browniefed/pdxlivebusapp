window.ENV = {};

window.ENV.devBaseUrl = 'http://localhost:8080/';
window.ENV.prodBaseUrl = 'http://pdxlivebus.herokuapp.com/';
window.ENV.dev = 0;
window.ENV.prod = 1;


window.ENV.mode = window.ENV.dev;
// window.ENV.mode = window.ENV.prod;


if (window.ENV.mode === window.ENV.prod) {
	window.ENV.baseUrl = window.ENV.prodBaseUrl;
} else {
	window.ENV.baseUrl = window.ENV.devBaseUrl;
}