!function(){"use strict";!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}(".text {\n    background: linear-gradient(317.23deg, #DE2929 3.6%, #E33E75 39.75%, #E64CA8 71.38%, #D461D7 100%), #000000;\n    -webkit-background-clip: text; \n    color: transparent;\n}\n\n.text2 {\n    position: relative;\n    color: yellow;\n    \n}\n.text2::before {\n    content: attr(text);\n    position: absolute;\n    z-index: 10;\n    color: pink;\n    -webkit-mask: linear-gradient(to left, red, transparent );\n}")}();
