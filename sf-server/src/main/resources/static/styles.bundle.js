webpackJsonp([2,4],{

/***/ 21:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(428);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(477)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../node_modules/postcss-loader/index.js!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?{\"sourceMap\":false,\"importLoaders\":1}!../node_modules/postcss-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)();
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\r\n* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\n@font-face {\r\n  font-family: lato;\r\n  src: url(" + __webpack_require__(479) + ");\r\n}\r\n\r\n@font-face {\r\n  font-family: lato-light;\r\n  src: url(" + __webpack_require__(478) + ");\r\n}\r\n\r\nlabel {\r\n  color: #4ca1af;\r\n  font-size: 12px;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\na {\r\n  color: #4ca1af;\r\n}\r\n\r\nhtml {\r\n  background-color: #fff;\r\n  color: #555;\r\n  font-size: 18px;\r\n  text-rendering: optimizeLegibility;\r\n}\r\n\r\nh2 {\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-size: 150%;\r\n  font-weight: 300;\r\n  letter-spacing: 2px;\r\n  transition: font-size 0.3s;\r\n  word-spacing: 4px;\r\n}\r\n\r\nh1 {\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-size: 150%;\r\n  font-weight: 300;\r\n  letter-spacing: 2px;\r\n  transition: font-size 0.3s;\r\n  word-spacing: 4px;\r\n}\r\n\r\nh3 {\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-weight: 300;\r\n}\r\n\r\nfieldset {\r\n  border-style: none;\r\n  clear: both;\r\n}\r\n\r\n.loading {\r\n  opacity: 0;\r\n  transition: opacity 0.8s ease-in-out;\r\n  height: 100vh;\r\n  width: 100%;\r\n  overflow: hidden;\r\n  position: absolute;\r\n  background: #fff;\r\n  z-index: -1;\r\n}\r\n\r\n.loading > h1 {\r\n  top: 50%;\r\n  left: 50%;\r\n  position: absolute;\r\n  text-align: center;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n}\r\n\r\n/* .loading screen is visible when app is not bootstraped yet, .my-app is empty */\r\nmy-app:empty + .loading {\r\n  opacity: 1;\r\n  z-index: 100;\r\n}\r\n\r\ninput,\r\nbutton {\r\n  outline: none;\r\n  border: none;\r\n}\r\n\r\n.body {\r\n  background-color: #f3f3f4;\r\n  left: 70px;\r\n  position: absolute;\r\n  top: 64px;\r\n  width: calc(100% - 70px);\r\n  padding-top: 40px;\r\n  padding-bottom: 100px;\r\n  padding-left: 10px;\r\n  z-index: -1;\r\n  min-height: 100%;\r\n}\r\n\r\n.wrapper {\r\n  margin: 0 auto;\r\n  padding: 40px;\r\n  max-width: 800px;\r\n}\r\n\r\n.table {\r\n  background-color: #fff;\r\n  margin: 10px 0;\r\n  padding: 30px;\r\n  display: table;\r\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\r\n}\r\n\r\n.table .display-table {\r\n  display: table;\r\n  width: 100%;\r\n  background-color: #fff;\r\n  padding: 5px 20px 35px 20px;\r\n  border-radius: 4px;\r\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.display-table {\r\n  display: inline-block;\r\n  width: 100%;\r\n  background-color: #fff;\r\n  padding: 5px 20px 35px 20px;\r\n  border-radius: 4px;\r\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.table .row {\r\n  display: table-row;\r\n  border-left: solid white 10px;\r\n}\r\n\r\n.row {\r\n  width: 100%;\r\n  display: inline-block;\r\n  vertical-align: top;\r\n}\r\n\r\n.table .row:nth-of-type(even) {\r\n  background: #e3eeff;\r\n}\r\n\r\n.table .row:nth-of-type(even):hover {\r\n  background: #e3eeff;\r\n}\r\n\r\n.table .row:nth-of-type(odd) {\r\n  background: #fff;\r\n}\r\n\r\n.table .row:nth-of-type(odd):hover {\r\n  background: #fff;\r\n}\r\n\r\n.table .row:nth-child(1) {\r\n  background-color: #4ca1af;\r\n  color: #fff;\r\n}\r\n\r\n.table .row:hover {\r\n  background: #83d6de;\r\n}\r\n\r\n.table .row:nth-child(1):hover {\r\n  background: #4ca1af;\r\n}\r\n\r\n.table .cell {\r\n  padding: 6px 12px;\r\n  display: table-cell;\r\n  border-color: #fff;\r\n  border-width: 0 1px 1px 1px;\r\n  border-style: solid;\r\n  word-wrap: break-word;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-size: 13px;\r\n}\r\n\r\n.cell {\r\n  padding: 18px;\r\n  display: inline-block;\r\n  border-color: #fff;\r\n  border-width: 0 1px 1px 1px;\r\n  border-style: solid;\r\n  word-wrap: break-word;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-size: 12px;\r\n  vertical-align: top;\r\n}\r\n\r\n.page-header {\r\n  width: 100%;\r\n  left: 72px;\r\n  top: 0;\r\n  color: #fff;\r\n  background-color: #4ca1af;\r\n  padding: 30px;\r\n  display: block;\r\n  position: fixed;\r\n  z-index: 25;\r\n}\r\n\r\n/*  GRID COLUMN SETUP   ==================================================================== */\r\n\r\n.col {\r\n  display: block;\r\n  float: left;\r\n  margin: 1% 0 1% 1.6%;\r\n}\r\n\r\n.col:first-child { margin-left: 0; } /* all browsers except IE6 and lower */\r\n\r\n/* GRID OF FOUR   ============================================================================= */\r\n\r\n.span_4_of_4 {\r\n  width: 100%;\r\n}\r\n\r\n.span_3_of_4 {\r\n  width: 74.6%;\r\n}\r\n\r\n.span_2_of_4 {\r\n  width: 49.2%;\r\n}\r\n\r\n.span_1_of_4 {\r\n  width: 23.8%;\r\n}\r\n\r\n.span_3_of_3 {\r\n  width: 100%;\r\n}\r\n\r\n.span_2_of_3 {\r\n  width: 66.13%;\r\n}\r\n\r\n.span_1_of_3 {\r\n  width: 32.26%;\r\n}\r\n\r\n.span_6_of_6 {\r\n  width: 100%;\r\n}\r\n\r\n.span_5_of_6 {\r\n  width: 83.06%;\r\n}\r\n\r\n.span_4_of_6 {\r\n  width: 66.13%;\r\n}\r\n\r\n.span_3_of_6 {\r\n  width: 49.2%;\r\n}\r\n\r\n.span_2_of_6 {\r\n  width: 32.26%;\r\n}\r\n\r\n.span_1_of_6 {\r\n  width: 15.33%;\r\n}\r\n\r\n.span_7_of_7 {\r\n  width: 100%;\r\n}\r\n\r\n.span_6_of_7 {\r\n  width: 85.48%;\r\n}\r\n\r\n.span_5_of_7 {\r\n  width: 70.97%;\r\n}\r\n\r\n.span_4_of_7 {\r\n  width: 56.45%;\r\n}\r\n\r\n.span_3_of_7 {\r\n  width: 41.94%;\r\n}\r\n\r\n.span_2_of_7 {\r\n  width: 27.42%;\r\n}\r\n\r\n.span_1_of_7 {\r\n  width: 12.91%;\r\n}\r\n\r\n.span_5_of_5 {\r\n  width: 100%;\r\n}\r\n\r\n.span_4_of_5 {\r\n  width: 79.68%;\r\n}\r\n\r\n.span_3_of_5 {\r\n  width: 59.36%;\r\n}\r\n\r\n.span_2_of_5 {\r\n  width: 39.04%;\r\n}\r\n\r\n.span_1_of_5 {\r\n  width: 18.72%;\r\n}\r\n\r\n/* Text box */\r\n\r\ninput {\r\n  color: #3e3e3e;\r\n}\r\n\r\n.group {\r\n  position: relative;\r\n  margin-top: 20px 0.8rem 8px 0.8rem;\r\n}\r\n\r\n.inputMaterial,\r\n.inputMaterial:disabled {\r\n  width: 100%;\r\n  font-size: 16px;\r\n  padding: 8px 0 8px 0;\r\n  display: block;\r\n  border: none;\r\n  border-bottom: 2px solid #dfdfdf;\r\n  outline: none;\r\n  background: transparent;\r\n}\r\n\r\n.text-input-label {\r\n  color: #999;\r\n  font-size: 13px;\r\n  font-weight: normal;\r\n  position: absolute;\r\n  pointer-events: none;\r\n  left: 0;\r\n  top: 10px;\r\n  transition: 0.2s ease all;\r\n}\r\n\r\n.error-text-input-label {\r\n  color: #e74c3c;\r\n  font-size: 12px;\r\n  font-weight: normal;\r\n  position: absolute;\r\n  pointer-events: none;\r\n  left: 0;\r\n  top: 44px;\r\n  transition: 0.2s ease all;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\n.inputMaterial:disabled ~ .text-input-label {\r\n  top: -12px;\r\n  font-size: 12px;\r\n  color: #4ca1af;\r\n}\r\n\r\n/* active state */\r\n.inputMaterial:focus ~ .text-input-label {\r\n  top: -12px;\r\n  font-size: 12px;\r\n  color: #4ca1af;\r\n}\r\n\r\n.inputMaterial:valid ~ .text-input-label {\r\n  top: -12px;\r\n  font-size: 12px;\r\n  color: #4ca1af;\r\n}\r\n\r\n.inputMaterial:-moz-read-only ~ .text-input-label {\r\n  top: -12px;\r\n  font-size: 12px;\r\n  color: #4ca1af;\r\n}\r\n\r\n.inputMaterial:read-only ~ .text-input-label {\r\n  top: -12px;\r\n  font-size: 12px;\r\n  color: #4ca1af;\r\n}\r\n\r\n.inputMaterial:-moz-read-only {\r\n  color: #afafaf;\r\n}\r\n\r\n.inputMaterial:read-only {\r\n  color: #afafaf;\r\n}\r\n\r\n.read-only ~ .text-input-label {\r\n  top: -15px;\r\n  font-size: 14px;\r\n  color: #4ca1af;\r\n}\r\n\r\n.read-only {\r\n  color: #afafaf;\r\n}\r\n\r\n/* BOTTOM BARS ================================= */\r\n.bar {\r\n  position: relative;\r\n  display: block;\r\n}\r\n\r\n.bar:before,\r\n.bar:after {\r\n  content: '';\r\n  height: 2px;\r\n  width: 0;\r\n  bottom: 1px;\r\n  position: absolute;\r\n  background: #009688;\r\n  transition: 0.2s ease all;\r\n}\r\n\r\n.bar:before {\r\n  left: 50%;\r\n}\r\n\r\n.bar:after {\r\n  right: 50%;\r\n}\r\n\r\n.error-bar:before,\r\n.error-bar:after {\r\n  content: '';\r\n  height: 2px;\r\n  width: 0;\r\n  bottom: 1px;\r\n  position: absolute;\r\n  background: #e74c3c;\r\n  transition: 0.2s ease all;\r\n}\r\n\r\n.error-bar:before {\r\n  left: 50%;\r\n}\r\n\r\n.error-bar:after {\r\n  right: 50%;\r\n}\r\n\r\n.inputMaterial:focus ~ .bar:before,\r\n.inputMaterial:focus ~ .bar:after {\r\n  width: 50%;\r\n}\r\n\r\n.inputMaterial ~ .error-bar:before,\r\n.inputMaterial ~ .error-bar:after {\r\n  width: 50%;\r\n}\r\n\r\n.inputMaterial:focus ~ .highlight {\r\n  -webkit-animation: inputHighlighter 0.3s ease;\r\n          animation: inputHighlighter 0.3s ease;\r\n}\r\n\r\n@-webkit-keyframes inputHighlighter {\r\n  from {\r\n    background: #5264ae;\r\n  }\r\n\r\n  to {\r\n    width: 0;\r\n    background: transparent;\r\n  }\r\n}\r\n\r\n@keyframes inputHighlighter {\r\n  from {\r\n    background: #5264ae;\r\n  }\r\n\r\n  to {\r\n    width: 0;\r\n    background: transparent;\r\n  }\r\n}\r\n\r\n.change-password {\r\n  position: absolute;\r\n}\r\n\r\napp-spinner {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n}\r\n\r\n.context-menu {\r\n  width: 200px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\r\n  z-index: 7;\r\n  background-color: white;\r\n}\r\n\r\n.context-menu-item {\r\n  padding: 10px;\r\n}\r\n\r\n.context-menu-item:hover {\r\n  background-color: #4ca1af;\r\n  color: #fff;\r\n}\r\n\r\n/* Modal Content */\r\n.modal-backdrop {\r\n  position: fixed; /* Stay in place */\r\n  z-index: 49; /* Sit on top */\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%; /* Full width */\r\n  height: 100%; /* Full height */\r\n  background-color: rgb(0, 0, 0); /* Fallback color */\r\n  background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */\r\n}\r\n\r\n.modal-small {\r\n  top: 50%;\r\n  left: calc(50%);\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  position: fixed;\r\n  background-color: #fefefe;\r\n  margin: auto;\r\n  border: 1px solid #888;\r\n  width: 28rem;\r\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n  -webkit-animation-name: animatetop;\r\n          animation-name: animatetop;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  z-index: 50;\r\n}\r\n\r\n.modal-medium {\r\n  top: 50%;\r\n  left: calc(50% + 70px);\r\n  -webkit-transform: translate(-50%, -50%);\r\n          transform: translate(-50%, -50%);\r\n  position: fixed;\r\n  background-color: #fefefe;\r\n  margin: auto;\r\n  border: 1px solid #888;\r\n  width: 40rem;\r\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),0 6px 20px 0 rgba(0, 0, 0, 0.19);\r\n  -webkit-animation-name: animatetop;\r\n          animation-name: animatetop;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  z-index: 50;\r\n}\r\n\r\n@-webkit-keyframes animatetop {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes animatetop {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.close {\r\n  color: white;\r\n  float: right;\r\n  font-size: 28px;\r\n  font-weight: bold;\r\n}\r\n\r\n.close:hover,\r\n.close:focus {\r\n  color: #000;\r\n  text-decoration: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.modal-header {\r\n  padding: 20px 40px;\r\n  background-color: #4ca1af;\r\n  color: white;\r\n}\r\n\r\n.modal-body {\r\n  padding: 10px 10px;\r\n  max-height: calc(100vh - 8rem);\r\n  max-width: 100%;\r\n  overflow-y: auto;\r\n  background-color: #f3f3f4;\r\n}\r\n\r\n.btn {\r\n  text-align: center;\r\n  display: inline-block;\r\n  border-radius: 5px;\r\n  padding: 10px 40px;\r\n  text-decoration: none;\r\n  color: #fff;\r\n  border: none;\r\n  margin-top: 3px;\r\n  font-size: 14px;\r\n  background-color: rgba(76, 161, 175, 0.8);\r\n  transition: all 0.3s;\r\n  pointer-events: auto;\r\n  cursor: pointer;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\n.btn::before {\r\n  content: '';\r\n  background-color: rgba(76, 161, 175, 1);\r\n  width: 0%;\r\n  height: 300%;\r\n  right: 0;\r\n  top: 0;\r\n  position: absolute;\r\n  color: #fff;\r\n  z-index: -1;\r\n  transition: all 0.8s;\r\n}\r\n\r\n.btn:hover::before {\r\n  width: 200%;\r\n}\r\n\r\n/* Combo */\r\n\r\n.select-fancy {\r\n  width: 100%;\r\n  display: inline-block;\r\n  border: 1px solid #e5e5e5;\r\n  position: relative;\r\n  border-radius: 4px;\r\n  overflow: hidden;\r\n  height: 28px;\r\n  box-shadow: inset 0 -2px 5px rgba(255, 255, 255, 0.4);\r\n  top: 15px;\r\n}\r\n\r\n.select-fancy,\r\n.select-fancy > * {\r\n  cursor: pointer;\r\n}\r\n\r\n.select-fancy select {\r\n  width: 100%;\r\n  background: #fff;\r\n  border: 0;\r\n  outline: 0;\r\n  padding: 0 0 2px 8px;\r\n  height: 30px;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  font-size: 16px;\r\n  color: #3e3e3e;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\nselect * {\r\n  color: #999;\r\n  font-size: 16px;\r\n}\r\n\r\n.combo-group .text-input-label {\r\n  font-size: 12px;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-weight: normal;\r\n  position: absolute;\r\n  pointer-events: none;\r\n  left: 0;\r\n  top: -6px;\r\n  color: #4ca1af;\r\n}\r\n\r\n.select-fancy-image {\r\n  height: 30px;\r\n  /* background: url(\"http://css.yipitcdn.com/img/arrow-down.png\") no-repeat right; */\r\n}\r\n\r\n/* Combo Ends */\r\n\r\n/****** Ripple Effect *************/\r\n\r\n.ripple {\r\n  position: relative;\r\n  overflow: hidden;\r\n  -webkit-transform: translate3d(0, 0, 0);\r\n          transform: translate3d(0, 0, 0);\r\n}\r\n\r\n.ripple:after {\r\n  content: \"\";\r\n  display: block;\r\n  position: absolute;\r\n  width: 100%;\r\n  height: 100%;\r\n  top: 0;\r\n  left: 0;\r\n  pointer-events: none;\r\n  background-image: radial-gradient(circle, #000 10%, transparent 10.01%);\r\n  background-repeat: no-repeat;\r\n  background-position: 50%;\r\n  -webkit-transform: scale(10, 10);\r\n          transform: scale(10, 10);\r\n  opacity: 0;\r\n  transition: opacity 1s, -webkit-transform 0.5s;\r\n  transition: transform 0.5s, opacity 1s;\r\n  transition: transform 0.5s, opacity 1s, -webkit-transform 0.5s;\r\n}\r\n\r\n.ripple:active:after {\r\n  -webkit-transform: scale(0, 0);\r\n          transform: scale(0, 0);\r\n  opacity: 0.2;\r\n  transition: 0s;\r\n}\r\n\r\n/************* Ripple Effect Ends ***************/\r\n\r\n.circle-btn {\r\n  background: url(\"/assets/img/ic_add_white_24px.svg\") no-repeat 13px center;\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none; \r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  z-index: 100;\r\n}\r\n\r\n.circle-btn > .material-icons { font-size: 20px; }\r\n\r\n.circle-btn-fixed {\r\n  position: fixed;\r\n  bottom: 1rem;\r\n  right: 1rem;\r\n}\r\n\r\n.search-btn {\r\n  background: url(\"/assets/img/ic_search_white_24px.svg\") no-repeat 13px center;\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none; \r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  z-index: 100;\r\n}\r\n.search-btn > .material-icons { font-size: 20px; }\r\n\r\n.search-btn-fixed {\r\n  position: fixed;\r\n  top: 120px;\r\n  right: 10px;\r\n}\r\n\r\n.save-btn {\r\n  background: url(\"/assets/img/ic_save_white_24px.svg\") no-repeat 13px center;\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none; \r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  z-index: 100;\r\n}\r\n.save-btn > .material-icons { font-size: 20px; }\r\n\r\n.save-btn-fixed {\r\n  position: absolute;\r\n  top: 84px;\r\n  right: 20px;\r\n}\r\n\r\n.modal-close-btn {\r\n  background: url(\"/assets/img/ic_clear_white_24px.svg\") no-repeat 13px center;\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none;\r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  z-index: 100;\r\n}\r\n.modal-close-btn > .material-icons { font-size: 20px; }\r\n\r\n.modal-close-btn-fixed {\r\n  position: absolute;\r\n  right: 28px;\r\n  top: 10px;\r\n}\r\n\r\n.create-btn {\r\n  background: url(\"/assets/img/ic_arrow_forward_white_24px.svg\") no-repeat 13px center;\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none;\r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  z-index: 100;\r\n}\r\n.create-btn > .material-icons { font-size: 20px; }\r\n\r\n.create-btn-fixed {\r\n  position: fixed;\r\n  top: calc(90px + 1 rem);\r\n  right: 10px;\r\n}\r\n\r\n.back-btn {\r\n  background: url(\"/assets/img/ic_replay_white_24px.svg\") no-repeat 13px center;\r\n  width: 50px;\r\n  height: 50px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none; \r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  z-index: 100;\r\n}\r\n.back-btn > .material-icons { font-size: 20px; }\r\n\r\n.back-btn-fixed {\r\n  position: fixed;\r\n  top: 120px;\r\n  right: 10px;\r\n}\r\n\r\n.previous-btn {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius:100%;\r\n  color: #4ca1af;\r\n  border-color: #4ca1af;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none;\r\n  background-color: #fff;\r\n  text-decoration: none;\r\n  border-width: 2px;\r\n  border-style: solid;\r\n  margin: 0 5px;\r\n}\r\n\r\n.next-btn {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 100%;\r\n  color: #fff;\r\n  text-align: center;\r\n  display: -webkit-inline-box;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-box-direction: normal;\r\n      -ms-flex-direction: column;\r\n          flex-direction: column;\r\n  -webkit-box-align: center;\r\n      -ms-flex-align: center;\r\n          align-items: center;\r\n  -webkit-box-pack: center;\r\n      -ms-flex-pack: center;\r\n          justify-content: center;\r\n  border-bottom: none;\r\n  background-color: #4ca1af;\r\n  text-decoration: none;\r\n  margin: 0 5px;\r\n}\r\n\r\n.center {\r\n  text-align: center;\r\n}\r\n\r\n.btn:disabled {\r\n  opacity: 0.5;\r\n}\r\n\r\n.page-status {\r\n  color: #4ca1af;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-size: 14px;\r\n  margin: 10px;\r\n  word-spacing: 10px;\r\n}\r\n\r\n/******** Tab ********/\r\n\r\n.tab-header {\r\n  display: block;\r\n  float: left;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  text-decoration: none;\r\n  text-align: center;\r\n  background-color: #4ca1af;\r\n  position: relative;\r\n  padding: 12px 0;\r\n  border-bottom-right-radius: 10px;\r\n  border-bottom-left-radius: 0;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  font-size: 14px;\r\n}\r\n\r\n.tab-radio {\r\n  display: none;\r\n  clear: both;\r\n}\r\n\r\n.tab-content {\r\n  display: none;\r\n}\r\n\r\n#tab1:checked ~ form #content1,\r\n#tab2:checked ~ form #content2,\r\n#tab3:checked ~ form #content3,\r\n#tab4:checked ~ form #content4,\r\n#tab5:checked ~ form #content5,\r\n#tab6:checked ~ form #content6 {\r\n  display: block;\r\n  padding-top: 1rem;\r\n  padding-bottom: 2rem;\r\n}\r\n\r\n#tab1:checked ~ #content1,\r\n#tab2:checked ~ #content2,\r\n#tab3:checked ~ #content3,\r\n#tab4:checked ~ #content4,\r\n#tab5:checked ~ #content5,\r\n#tab6:checked ~ #content6 {\r\n  clear: both;\r\n  display: block;\r\n  padding-top: 1rem;\r\n  padding-bottom: 2rem;\r\n}\r\n\r\n.tab_container [id^=\"tab\"]:checked + .tab-header {\r\n  background: #fff;\r\n  box-shadow: inset 0 3px #4ca1af;\r\n  color: #4ca1af;\r\n}\r\n\r\n.tab-radio:disabled ~ .tab-header {\r\n  background-color: #efefef;\r\n  color: #4ca1af;\r\n}\r\n\r\n@-webkit-keyframes fadeInScale {\r\n  0% {\r\n    -webkit-transform: scale(0.9);\r\n            transform: scale(0.9);\r\n    opacity: 0;\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes fadeInScale {\r\n  0% {\r\n    -webkit-transform: scale(0.9);\r\n            transform: scale(0.9);\r\n    opacity: 0;\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.tab_container .tab-content p,\r\n.tab_container .tab-content h3 {\r\n  -webkit-animation: fadeInScale 0.7s ease-in-out;\r\n          animation: fadeInScale 0.7s ease-in-out;\r\n}\r\n\r\n/* Field level error */\r\n\r\n.error {\r\n  border: 1px solid;\r\n  border-color: #D8000C;\r\n  color: #D8000C;\r\n  border-radius: 4px;\r\n  margin: 10px 0;\r\n  padding: 8px 6px 8px 10px;\r\n  background-repeat: no-repeat;\r\n  background-position: 10px center;\r\n}\r\n\r\n/******** Accordion ************/\r\n\r\n.toggle {\r\n  max-width: calc(100%);\r\n}\r\n\r\n.toggle-label {\r\n  font-size: 14px;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n  background: #4ca1af;\r\n  padding: 1em 2em;\r\n  cursor: pointer;\r\n  display: block;\r\n  margin: 0 auto 10px;\r\n  border-radius: 4px;\r\n  color: #fff;\r\n}\r\n\r\n.toggle-label:after {\r\n  color: #fff;\r\n  content: \"+\";\r\n  float: right;\r\n  font-weight: bold;\r\n}\r\n\r\n.toggle-content {\r\n  color: #b0b3c2;\r\n  font-size: 16px;\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.toggle-input {\r\n  display: none;\r\n}\r\n\r\n.toggle-input:not(checked) ~ .toggle-content {\r\n  display: none;\r\n}\r\n\r\n.toggle-input:checked ~ .toggle-content {\r\n  display: block;\r\n}\r\n\r\n.toggle-input:checked ~ .toggle-label:after {\r\n  content: \"-\";\r\n}\r\n\r\n/******* Accordion ends here *********/\r\n\r\n.alert {\r\n  display: inline-block;\r\n  width: 100%;\r\n  padding: 12px 1.5rem;\r\n  margin: 1em 0;\r\n  background: #f2dede;\r\n  color: #a94442;\r\n  border-radius: 10px;\r\n  font-size: 14px;\r\n  font-family: 'lato', 'arial', sans-serif;\r\n}\r\n\r\n/******** Check box **************/\r\n\r\n[type=\"checkbox\"].default-checkbox + label {\r\n  position: relative;\r\n  padding-left: 35px;\r\n  cursor: pointer;\r\n  display: inline-block;\r\n  height: 25px;\r\n  line-height: 25px;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox + label:before,\r\n[type=\"checkbox\"].default-checkbox:not(.default-checkbox) + label:after {\r\n  content: '';\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 18px;\r\n  height: 18px;\r\n  z-index: 0;\r\n  border: 2px solid #4ca1af;\r\n  border-radius: 1px;\r\n  margin-top: 2px;\r\n  transition: 0.2s;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:not(.default-checkbox) + label:after {\r\n  border: 0;\r\n  -webkit-transform: scale(0);\r\n          transform: scale(0);\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:not(:checked):disabled + label:before {\r\n  border: none;\r\n  background-color: #efefef;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:checked + label:before {\r\n  top: -4px;\r\n  left: -5px;\r\n  width: 12px;\r\n  height: 22px;\r\n  border-top: 2px solid transparent;\r\n  border-left: 2px solid transparent;\r\n  border-right: #4ca1af;\r\n  border-bottom: #4ca1af;\r\n  -webkit-transform: rotate(40deg);\r\n          transform: rotate(40deg);\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  -webkit-transform-origin: 100% 100%;\r\n          transform-origin: 100% 100%;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:checked:disabled + label:before {\r\n  border-right: 2px solid #efefef;\r\n  border-bottom: 2px solid #efefef;\r\n}\r\n\r\n/* Indeterminate checkbox */\r\n[type=\"checkbox\"].default-checkbox:indeterminate + label:before {\r\n  top: -11px;\r\n  left: -12px;\r\n  width: 10px;\r\n  height: 22px;\r\n  border-top: none;\r\n  border-left: none;\r\n  border-right: #4ca1af;\r\n  border-bottom: none;\r\n  -webkit-transform: rotate(90deg);\r\n          transform: rotate(90deg);\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  -webkit-transform-origin: 100% 100%;\r\n          transform-origin: 100% 100%;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:indeterminate:disabled + label:before {\r\n  border-right: 2px solid #efefef;\r\n  background-color: transparent;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:not(:checked),\r\n[type=\"checkbox\"].default-checkbox:checked {\r\n  position: absolute;\r\n  left: -9999px;\r\n  opacity: 0;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox + label:after {\r\n  border-radius: 2px;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox + label:before,\r\n[type=\"checkbox\"].default-checkbox + label:after {\r\n  content: '';\r\n  left: 0;\r\n  position: absolute;\r\n\r\n  /* .1s delay is for check animation */\r\n  transition: border 0.25s, background-color 0.25s, width 0.2s 0.1s, height 0.2s 0.1s, top 0.2s 0.1s, left 0.2s 0.1s;\r\n  z-index: 1;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:not(:checked) + label:before {\r\n  width: 0;\r\n  height: 0;\r\n  border: 3px solid transparent;\r\n  left: 6px;\r\n  top: 10px;\r\n  -webkit-transform: rotateZ(37deg);\r\n          transform: rotateZ(37deg);\r\n  -webkit-transform-origin: 100% 100%;\r\n          transform-origin: 100% 100%;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:not(:checked) + label:after {\r\n  height: 20px;\r\n  width: 20px;\r\n  background-color: transparent;\r\n  border: 2px solid #4ca1af;\r\n  top: 0;\r\n  z-index: 0;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:checked + label:before {\r\n  top: 0;\r\n  left: 1px;\r\n  width: 6px;\r\n  height: 13px;\r\n  border-top: 2px solid transparent;\r\n  border-left: 2px solid transparent;\r\n  border-right: 2px solid #fff;\r\n  border-bottom: 2px solid #fff;\r\n  -webkit-transform: rotateZ(37deg);\r\n          transform: rotateZ(37deg);\r\n  -webkit-transform-origin: 100% 100%;\r\n          transform-origin: 100% 100%;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:checked + label:after {\r\n  top: 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  border: 2px solid #4ca1af;\r\n  background-color: #4ca1af;\r\n  z-index: 0;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox.tabbed:focus + label:after {\r\n  border-radius: 2px;\r\n  border-color: #4ca1af;\r\n  background-color: rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox.tabbed:checked:focus + label:after {\r\n  border-radius: 2px;\r\n  background-color: #4ca1af;\r\n  border-color: #4ca1af;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:disabled:not(:checked) + label:before {\r\n  background-color: transparent;\r\n  border: 2px solid transparent;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:disabled:not(:checked) + label:after {\r\n  border-color: transparent;\r\n  background-color: #efefef;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:disabled:checked + label:before {\r\n  background-color: transparent;\r\n}\r\n\r\n[type=\"checkbox\"].default-checkbox:disabled:checked + label:after {\r\n  background-color: #efefef;\r\n  border-color: #efefef;\r\n}\r\n\r\n/********** Check box ends ***************/\r\n\r\n.text-label {\r\n  color: #4ca1af;\r\n  font-size: 12px;\r\n}\r\n\r\n.text-value {\r\n  color: #3e3e3e;\r\n  font-size: 13px;\r\n}\r\n\r\n.width-with-right-margin {\r\n  width: calc(100% - 70px) !important;\r\n}\r\n\r\n.group-header {\r\n  color: #4ca1af;\r\n  font-size: 14px;\r\n  text-decoration: underline;\r\n  text-align: center;\r\n  padding: 10px;\r\n}\r\n\r\n.disable-scroll {\r\n  overflow: hidden;\r\n  position: fixed;\r\n  width: 100%;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 477:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Lato-Light.5b761f2d1e4259ea6ac7.ttf";

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Roboto-Regular.3e1af3ef546b9e6ecef9.ttf";

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(264);


/***/ })

},[484]);
//# sourceMappingURL=styles.bundle.js.map