(()=>{var r={199:(r,n,t)=>{"use strict";t.d(n,{Z:()=>s});var i=t(15),e=t.n(i),o=t(645),A=t.n(o)()(e());A.push([r.id,"html{height:100%}#gameArea{height:90%;display:none;-ms-grid-rows:10% 30px -webkit-min-content 30px -webkit-min-content;-ms-grid-rows:10% 30px min-content 30px min-content;grid-template-rows:10% -webkit-min-content -webkit-min-content;grid-template-rows:10% min-content min-content;-ms-grid-columns:-webkit-min-content 10px -webkit-min-content 10px -webkit-min-content;-ms-grid-columns:min-content 10px min-content 10px min-content;grid-template-columns:-webkit-min-content -webkit-min-content -webkit-min-content;grid-template-columns:min-content min-content min-content;grid-column-gap:10px;grid-row-gap:30px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}#gameArea > *:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}#gameArea > *:nth-child(2){-ms-grid-row:1;-ms-grid-column:3}#gameArea > *:nth-child(3){-ms-grid-row:1;-ms-grid-column:5}#gameArea > *:nth-child(4){-ms-grid-row:3;-ms-grid-column:1}#gameArea > *:nth-child(5){-ms-grid-row:3;-ms-grid-column:3}#gameArea > *:nth-child(6){-ms-grid-row:3;-ms-grid-column:5}#gameArea > *:nth-child(7){-ms-grid-row:5;-ms-grid-column:1}#gameArea > *:nth-child(8){-ms-grid-row:5;-ms-grid-column:3}#gameArea > *:nth-child(9){-ms-grid-row:5;-ms-grid-column:5}#field{-ms-grid-row:1;-ms-grid-row-span:3;grid-row:1 / 4;-ms-grid-column:2;grid-column:2;display:-ms-grid;display:grid;width:auto;height:auto;-ms-grid-rows:7px 0px var(--sizeOfMino);grid-template-rows:7px var(--sizeOfMino);-ms-grid-columns:var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino) 0px var(--sizeOfMino);grid-template-columns:repeat(10, var(--sizeOfMino));grid-gap:0px 0px}#field > *:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}#field > *:nth-child(2){-ms-grid-row:1;-ms-grid-column:3}#field > *:nth-child(3){-ms-grid-row:1;-ms-grid-column:5}#field > *:nth-child(4){-ms-grid-row:1;-ms-grid-column:7}#field > *:nth-child(5){-ms-grid-row:1;-ms-grid-column:9}#field > *:nth-child(6){-ms-grid-row:1;-ms-grid-column:11}#field > *:nth-child(7){-ms-grid-row:1;-ms-grid-column:13}#field > *:nth-child(8){-ms-grid-row:1;-ms-grid-column:15}#field > *:nth-child(9){-ms-grid-row:1;-ms-grid-column:17}#field > *:nth-child(10){-ms-grid-row:1;-ms-grid-column:19}#field > *:nth-child(11){-ms-grid-row:3;-ms-grid-column:1}#field > *:nth-child(12){-ms-grid-row:3;-ms-grid-column:3}#field > *:nth-child(13){-ms-grid-row:3;-ms-grid-column:5}#field > *:nth-child(14){-ms-grid-row:3;-ms-grid-column:7}#field > *:nth-child(15){-ms-grid-row:3;-ms-grid-column:9}#field > *:nth-child(16){-ms-grid-row:3;-ms-grid-column:11}#field > *:nth-child(17){-ms-grid-row:3;-ms-grid-column:13}#field > *:nth-child(18){-ms-grid-row:3;-ms-grid-column:15}#field > *:nth-child(19){-ms-grid-row:3;-ms-grid-column:17}#field > *:nth-child(20){-ms-grid-row:3;-ms-grid-column:19}#startButton{-ms-grid-row:1;grid-row:1;border-color:#005ba6}#optionRadio{-ms-grid-row:2;grid-row:2}#holdArea{-ms-grid-row:1;grid-row:1;-ms-grid-column:1;grid-column:1;display:-ms-grid;display:grid;-ms-grid-columns:1fr -webkit-min-content;-ms-grid-columns:1fr min-content;grid-template-columns:1fr -webkit-min-content;grid-template-columns:1fr min-content;-ms-grid-rows:-webkit-min-content -webkit-min-content;-ms-grid-rows:min-content min-content;grid-template-rows:-webkit-min-content -webkit-min-content;grid-template-rows:min-content min-content;margin-right:30px}#holdArea > *:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}#holdArea > *:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}#holdArea > *:nth-child(3){-ms-grid-row:2;-ms-grid-column:1}#holdArea > *:nth-child(4){-ms-grid-row:2;-ms-grid-column:2}#holdHead{-ms-grid-row:1;grid-row:1;-ms-grid-column:2;grid-column:2;height:20px}#holdArea>.displayers{width:90px;height:50px;-ms-grid-row:2;grid-row:2;-ms-grid-column:2;grid-column:2}#scoreArea{-ms-grid-row:2;grid-row:2;-ms-grid-column:1;grid-column:1}#nextArea{-ms-grid-row:1;grid-row:1;-ms-grid-column:3;grid-column:3;display:-ms-grid;display:grid;-ms-grid-columns:-webkit-min-content 1fr;-ms-grid-columns:min-content 1fr;grid-template-columns:-webkit-min-content 1fr;grid-template-columns:min-content 1fr;-ms-grid-rows:-webkit-min-content 5px -webkit-min-content 5px -webkit-min-content 5px -webkit-min-content 5px -webkit-min-content 5px -webkit-min-content 5px -webkit-min-content;-ms-grid-rows:min-content 5px min-content 5px min-content 5px min-content 5px min-content 5px min-content 5px min-content;grid-template-rows:repeat(7, -webkit-min-content);grid-template-rows:repeat(7, min-content);grid-row-gap:5px}#nextArea > *:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}#nextArea > *:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}#nextArea > *:nth-child(3){-ms-grid-row:3;-ms-grid-column:1}#nextArea > *:nth-child(4){-ms-grid-row:3;-ms-grid-column:2}#nextArea > *:nth-child(5){-ms-grid-row:5;-ms-grid-column:1}#nextArea > *:nth-child(6){-ms-grid-row:5;-ms-grid-column:2}#nextArea > *:nth-child(7){-ms-grid-row:7;-ms-grid-column:1}#nextArea > *:nth-child(8){-ms-grid-row:7;-ms-grid-column:2}#nextArea > *:nth-child(9){-ms-grid-row:9;-ms-grid-column:1}#nextArea > *:nth-child(10){-ms-grid-row:9;-ms-grid-column:2}#nextArea > *:nth-child(11){-ms-grid-row:11;-ms-grid-column:1}#nextArea > *:nth-child(12){-ms-grid-row:11;-ms-grid-column:2}#nextArea > *:nth-child(13){-ms-grid-row:13;-ms-grid-column:1}#nextArea > *:nth-child(14){-ms-grid-row:13;-ms-grid-column:2}#nextArea>.displayers{-ms-grid-column:1;grid-column:1}#nextHead{-ms-grid-column:1;grid-column:1;height:20px}.dialogs{display:none}.radio{margin:0.5rem}.radio input[type='radio']{position:absolute;opacity:0}.radio input[type='radio']+.radio-label:before{content:'';background:#f4f4f4;border-radius:100%;border:1px solid #b4b4b4;display:inline-block;width:1.4em;height:1.4em;position:relative;top:-0.2em;margin-right:1em;vertical-align:top;cursor:pointer;text-align:center;transition:all 250ms ease}.radio input[type='radio']:checked+.radio-label:before{background-color:#3197EE;box-shadow:inset 0 0 0 4px #f4f4f4}.radio input[type='radio']:focus+.radio-label:before{outline:none;border-color:#3197EE}.radio input[type='radio']:disabled+.radio-label:before{box-shadow:inset 0 0 0 4px #f4f4f4;border-color:#b4b4b4;background:#b4b4b4}.radio input[type='radio']+.radio-label:empty:before{margin-right:0}\n","",{version:3,sources:["webpack://./src/master.scss","<no source>"],names:[],mappings:"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",sourcesContent:["$color1: #f4f4f4;\r\n$color2: #3197EE;\r\n\r\nhtml {\r\n\theight: 100%;\r\n}\r\n#gameArea {\r\n\theight: 90%;\r\n\r\n\tdisplay: none;\r\n\r\n\tgrid-template-rows: 10% min-content min-content;\r\n\tgrid-template-columns: min-content min-content min-content;\r\n\r\n\tgrid-column-gap: 10px;\r\n\tgrid-row-gap: 30px;\r\n\r\n\tuser-select: none;\r\n}\r\n\r\n#field {\r\n\tgrid-row: 1 / 4;\r\n\tgrid-column: 2;\r\n\r\n\tdisplay: grid;\r\n\r\n\twidth: auto;\r\n\theight: auto;\r\n\r\n\tgrid-template-rows: 7px var(--sizeOfMino);\r\n\tgrid-template-columns: repeat(10, var(--sizeOfMino));\r\n\tgrid-gap: 0px 0px;\r\n}\r\n\r\n#startButton {\r\n\tgrid-row: 1;\r\n\tborder-color: #005ba6;\r\n}\r\n#optionRadio {\r\n\tgrid-row: 2;\r\n}\r\n\r\n#holdArea {\r\n\tgrid-row: 1;\r\n\tgrid-column: 1;\r\n\r\n\tdisplay: grid;\r\n\tgrid-template-columns: 1fr min-content;\r\n\tgrid-template-rows: min-content min-content;\r\n\r\n\tmargin-right: 30px;\r\n}\r\n\r\n#holdHead {\r\n\tgrid-row: 1;\r\n\tgrid-column: 2;\r\n\r\n\theight: 20px;\r\n}\r\n\r\n#holdArea > .displayers {\r\n\t/* border: 2px black solid; */\r\n\twidth: 90px;\r\n\theight: 50px;\r\n\r\n\tgrid-row: 2;\r\n\tgrid-column: 2;\r\n}\r\n\r\n#scoreArea {\r\n\tgrid-row: 2;\r\n\tgrid-column: 1;\r\n}\r\n\r\n#nextArea {\r\n\tgrid-row: 1;\r\n\tgrid-column: 3;\r\n\r\n\tdisplay: grid;\r\n\tgrid-template-columns: min-content 1fr;\r\n\tgrid-template-rows: repeat(7, min-content);\r\n\r\n\tgrid-row-gap: 5px;\r\n}\r\n\r\n#nextArea > .displayers {\r\n\tgrid-column: 1;\r\n}\r\n#nextHead {\r\n\tgrid-column: 1;\r\n\theight: 20px;\r\n}\r\n\r\n.dialogs {\r\n\tdisplay: none;\r\n}\r\n\r\n.radio {\r\n\tmargin: 0.5rem;\r\n\tinput[type='radio'] {\r\n\t\tposition: absolute;\r\n\t\topacity: 0;\r\n\t\t+ .radio-label {\r\n\t\t\t&:before {\r\n\t\t\t\tcontent: '';\r\n\t\t\t\tbackground: $color1;\r\n\t\t\t\tborder-radius: 100%;\r\n\t\t\t\tborder: 1px solid darken($color1, 25%);\r\n\t\t\t\tdisplay: inline-block;\r\n\t\t\t\twidth: 1.4em;\r\n\t\t\t\theight: 1.4em;\r\n\t\t\t\tposition: relative;\r\n\t\t\t\ttop: -0.2em;\r\n\t\t\t\tmargin-right: 1em;\r\n\t\t\t\tvertical-align: top;\r\n\t\t\t\tcursor: pointer;\r\n\t\t\t\ttext-align: center;\r\n\t\t\t\ttransition: all 250ms ease;\r\n\t\t\t}\r\n\t\t}\r\n\t\t&:checked {\r\n\t\t\t+ .radio-label {\r\n\t\t\t\t&:before {\r\n\t\t\t\t\tbackground-color: $color2;\r\n\t\t\t\t\tbox-shadow: inset 0 0 0 4px $color1;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t\t&:focus {\r\n\t\t\t+ .radio-label {\r\n\t\t\t\t&:before {\r\n\t\t\t\t\toutline: none;\r\n\t\t\t\t\tborder-color: $color2;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t\t&:disabled {\r\n\t\t\t+ .radio-label {\r\n\t\t\t\t&:before {\r\n\t\t\t\t\tbox-shadow: inset 0 0 0 4px $color1;\r\n\t\t\t\t\tborder-color: darken($color1, 25%);\r\n\t\t\t\t\tbackground: darken($color1, 25%);\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t\t+ .radio-label {\r\n\t\t\t&:empty {\r\n\t\t\t\t&:before {\r\n\t\t\t\t\tmargin-right: 0;\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n}\r\n",null],sourceRoot:""}]);const s=A},529:(r,n,t)=>{"use strict";t.d(n,{Z:()=>s});var i=t(15),e=t.n(i),o=t(645),A=t.n(o)()(e());A.push([r.id,"@media (pointer: fine){:root{--sizeOfMino: 30px;--sizeOfDisplayedMino: 20px}#startButton{width:420px;height:100px}}@media (pointer: coarse){:root{--sizeOfMino: 40px;--sizeOfDisplayedMino: 25px}#startButton{width:400px;height:90px}}\n","",{version:3,sources:["webpack://./src/media.scss"],names:[],mappings:"AAAA,uBACE,MACE,kBAAa,CACb,2BAAsB,CACvB,aAGC,WAAY,CACZ,YAAa,CACd,CAGH,yBACE,MACE,kBAAa,CACb,2BAAsB,CACvB,aAGC,WAAY,CACZ,WAAY,CACb",sourcesContent:["@media (pointer: fine) {\r\n  :root {\r\n    --sizeOfMino: 30px;\r\n    --sizeOfDisplayedMino: 20px;\r\n  }\r\n\r\n  #startButton {\r\n    width: 420px;\r\n    height: 100px;\r\n  }\r\n}\r\n\r\n@media (pointer: coarse) {\r\n  :root {\r\n    --sizeOfMino: 40px;\r\n    --sizeOfDisplayedMino: 25px;\r\n  }\r\n\r\n  #startButton {\r\n    width: 400px;\r\n    height: 90px;\r\n  }\r\n}\r\n"],sourceRoot:""}]);const s=A},644:(r,n,t)=>{"use strict";t.d(n,{Z:()=>s});var i=t(15),e=t.n(i),o=t(645),A=t.n(o)()(e());A.push([r.id,".minos{width:var(--sizeOfMino);height:var(--sizeOfMino);border-top:1px solid white;border-left:1px solid white;grid-row:calc(attr(data-y) - 2);grid-column:calc(attr(data-x))}.emptyMinos{background-color:#0b1013}.iMinos{background-color:#348fca}.oMinos{background-color:#e7bd22}.sMinos{background-color:#2aa55d}.zMinos{background-color:#da4b3c}.jMinos{background-color:#246eab}.lMinos{background-color:#dc7a23}.tMinos{background-color:#824597}.wallMinos{background-color:gray}.ghostMinos{background-color:#0b1013}.ghostMinos{content:'';height:50%;width:50%;position:relative;top:25%;left:25%}.iGhostMinos{background-color:#348fca}.oGhostMinos{background-color:#e7bd22}.sGhostMinos{background-color:#2aa55d}.zGhostMinos{background-color:#da4b3c}.jGhostMinos{background-color:#246eab}.lGhostMinos{background-color:#dc7a23}.tGhostMinos{background-color:#824597}.displayers{display:-ms-grid;display:grid;-ms-grid-columns:(var(--sizeOfDisplayedMino))[4];grid-template-columns:repeat(4, var(--sizeOfDisplayedMino));-ms-grid-rows:(var(--sizeOfDisplayedMino))[2];grid-template-rows:repeat(2, var(--sizeOfDisplayedMino))}.displayers > *:nth-child(1){-ms-grid-row:1;-ms-grid-column:1}.displayers > *:nth-child(2){-ms-grid-row:1;-ms-grid-column:2}.displayers > *:nth-child(3){-ms-grid-row:1;-ms-grid-column:3}.displayers > *:nth-child(4){-ms-grid-row:1;-ms-grid-column:4}.displayers > *:nth-child(5){-ms-grid-row:2;-ms-grid-column:1}.displayers > *:nth-child(6){-ms-grid-row:2;-ms-grid-column:2}.displayers > *:nth-child(7){-ms-grid-row:2;-ms-grid-column:3}.displayers > *:nth-child(8){-ms-grid-row:2;-ms-grid-column:4}.displayers .minos{width:var(--sizeOfDisplayedMino);height:var(--sizeOfDisplayedMino)}\n","",{version:3,sources:["webpack://./src/tetriminos.scss","<no source>"],names:[],mappings:"AAAA,OACC,uBAAwB,CACxB,wBAAyB,CAEzB,0BAA2B,CAC3B,2BAA4B,CAE5B,+BAAgC,CAChC,8BAA+B,CAC/B,YAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,QAGA,wBAAyB,CACzB,WAGA,qBAAsB,CACtB,YAGA,wBAAyB,CACzB,YAEA,UAAW,CACX,UAAW,CACX,SAAU,CACV,iBAAkB,CAClB,OAAQ,CACR,QAAS,CACT,aAGA,wBAAyB,CACzB,aAGA,wBAAyB,CACzB,aAGA,wBAAyB,CACzB,aAGA,wBAAyB,CACzB,aAGA,wBAAyB,CACzB,aAGA,wBAAyB,CACzB,aAGA,wBAAyB,CACzB,YAGA,gBAAa,CAAb,YAAa,CACb,gDAA4D,CAA5D,2DAA4D,CAC5D,6CAAoB,CAApB,wDAAyD,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CALzD,6BCrFD,eAAA,iBD0F0D,CACzD,mBAEA,gCAAiC,CACjC,iCAAkC",sourcesContent:[".minos {\r\n\twidth: var(--sizeOfMino);\r\n\theight: var(--sizeOfMino);\r\n\r\n\tborder-top: 1px solid white;\r\n\tborder-left: 1px solid white;\r\n\r\n\tgrid-row: calc(attr(data-y) - 2);\r\n\tgrid-column: calc(attr(data-x));\r\n}\r\n\r\n.emptyMinos {\r\n\tbackground-color: #0b1013;\r\n}\r\n\r\n.iMinos {\r\n\tbackground-color: #348fca;\r\n}\r\n\r\n.oMinos {\r\n\tbackground-color: #e7bd22;\r\n}\r\n\r\n.sMinos {\r\n\tbackground-color: #2aa55d;\r\n}\r\n\r\n.zMinos {\r\n\tbackground-color: #da4b3c;\r\n}\r\n\r\n.jMinos {\r\n\tbackground-color: #246eab;\r\n}\r\n\r\n.lMinos {\r\n\tbackground-color: #dc7a23;\r\n}\r\n\r\n.tMinos {\r\n\tbackground-color: #824597;\r\n}\r\n\r\n.wallMinos {\r\n\tbackground-color: gray;\r\n}\r\n\r\n.ghostMinos {\r\n\tbackground-color: #0b1013;\r\n}\r\n.ghostMinos {\r\n\tcontent: '';\r\n\theight: 50%;\r\n\twidth: 50%;\r\n\tposition: relative;\r\n\ttop: 25%;\r\n\tleft: 25%;\r\n}\r\n\r\n.iGhostMinos {\r\n\tbackground-color: #348fca;\r\n}\r\n\r\n.oGhostMinos {\r\n\tbackground-color: #e7bd22;\r\n}\r\n\r\n.sGhostMinos {\r\n\tbackground-color: #2aa55d;\r\n}\r\n\r\n.zGhostMinos {\r\n\tbackground-color: #da4b3c;\r\n}\r\n\r\n.jGhostMinos {\r\n\tbackground-color: #246eab;\r\n}\r\n\r\n.lGhostMinos {\r\n\tbackground-color: #dc7a23;\r\n}\r\n\r\n.tGhostMinos {\r\n\tbackground-color: #824597;\r\n}\r\n\r\n.displayers {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: repeat(4, var(--sizeOfDisplayedMino));\r\n\tgrid-template-rows: repeat(2, var(--sizeOfDisplayedMino));\r\n}\r\n.displayers .minos {\r\n\twidth: var(--sizeOfDisplayedMino);\r\n\theight: var(--sizeOfDisplayedMino);\r\n}\r\n",null],sourceRoot:""}]);const s=A},645:r=>{"use strict";r.exports=function(r){var n=[];return n.toString=function(){return this.map((function(n){var t=r(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(r,t,i){"string"==typeof r&&(r=[[null,r,""]]);var e={};if(i)for(var o=0;o<this.length;o++){var A=this[o][0];null!=A&&(e[A]=!0)}for(var s=0;s<r.length;s++){var d=[].concat(r[s]);i&&e[d[0]]||(t&&(d[2]?d[2]="".concat(t," and ").concat(d[2]):d[2]=t),n.push(d))}},n}},15:r=>{"use strict";function n(r,n){(null==n||n>r.length)&&(n=r.length);for(var t=0,i=new Array(n);t<n;t++)i[t]=r[t];return i}r.exports=function(r){var t,i,e=(i=4,function(r){if(Array.isArray(r))return r}(t=r)||function(r,n){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var i,e,o=[],A=!0,s=!1;try{for(t=t.call(r);!(A=(i=t.next()).done)&&(o.push(i.value),!n||o.length!==n);A=!0);}catch(r){s=!0,e=r}finally{try{A||null==t.return||t.return()}finally{if(s)throw e}}return o}}(t,i)||function(r,t){if(r){if("string"==typeof r)return n(r,t);var i=Object.prototype.toString.call(r).slice(8,-1);return"Object"===i&&r.constructor&&(i=r.constructor.name),"Map"===i||"Set"===i?Array.from(r):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?n(r,t):void 0}}(t,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=e[1],A=e[3];if(!A)return o;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(A)))),d="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),a="/*# ".concat(d," */"),l=A.sources.map((function(r){return"/*# sourceURL=".concat(A.sourceRoot||"").concat(r," */")}));return[o].concat(l).concat([a]).join("\n")}return[o].join("\n")}},58:(r,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>p});var i=t(379),e=t.n(i),o=t(795),A=t.n(o),s=t(569),d=t.n(s),a=t(565),l=t.n(a),c=t(216),m=t.n(c),C=t(589),g=t.n(C),B=t(199),u={};u.styleTagTransform=g(),u.setAttributes=l(),u.insert=d().bind(null,"head"),u.domAPI=A(),u.insertStyleElement=m(),e()(B.Z,u);const p=B.Z&&B.Z.locals?B.Z.locals:void 0},948:(r,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>p});var i=t(379),e=t.n(i),o=t(795),A=t.n(o),s=t(569),d=t.n(s),a=t(565),l=t.n(a),c=t(216),m=t.n(c),C=t(589),g=t.n(C),B=t(529),u={};u.styleTagTransform=g(),u.setAttributes=l(),u.insert=d().bind(null,"head"),u.domAPI=A(),u.insertStyleElement=m(),e()(B.Z,u);const p=B.Z&&B.Z.locals?B.Z.locals:void 0},887:(r,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>p});var i=t(379),e=t.n(i),o=t(795),A=t.n(o),s=t(569),d=t.n(s),a=t(565),l=t.n(a),c=t(216),m=t.n(c),C=t(589),g=t.n(C),B=t(644),u={};u.styleTagTransform=g(),u.setAttributes=l(),u.insert=d().bind(null,"head"),u.domAPI=A(),u.insertStyleElement=m(),e()(B.Z,u);const p=B.Z&&B.Z.locals?B.Z.locals:void 0},379:r=>{"use strict";var n=[];function t(r){for(var t=-1,i=0;i<n.length;i++)if(n[i].identifier===r){t=i;break}return t}function i(r,i){for(var o={},A=[],s=0;s<r.length;s++){var d=r[s],a=i.base?d[0]+i.base:d[0],l=o[a]||0,c="".concat(a," ").concat(l);o[a]=l+1;var m=t(c),C={css:d[1],media:d[2],sourceMap:d[3]};-1!==m?(n[m].references++,n[m].updater(C)):n.push({identifier:c,updater:e(C,i),references:1}),A.push(c)}return A}function e(r,n){var t=n.domAPI(n);return t.update(r),function(n){if(n){if(n.css===r.css&&n.media===r.media&&n.sourceMap===r.sourceMap)return;t.update(r=n)}else t.remove()}}r.exports=function(r,e){var o=i(r=r||[],e=e||{});return function(r){r=r||[];for(var A=0;A<o.length;A++){var s=t(o[A]);n[s].references--}for(var d=i(r,e),a=0;a<o.length;a++){var l=t(o[a]);0===n[l].references&&(n[l].updater(),n.splice(l,1))}o=d}}},569:r=>{"use strict";var n={};r.exports=function(r,t){var i=function(r){if(void 0===n[r]){var t=document.querySelector(r);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(r){t=null}n[r]=t}return n[r]}(r);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}},216:r=>{"use strict";r.exports=function(r){var n=document.createElement("style");return r.setAttributes(n,r.attributes),r.insert(n),n}},565:(r,n,t)=>{"use strict";r.exports=function(r){var n=t.nc;n&&r.setAttribute("nonce",n)}},795:r=>{"use strict";r.exports=function(r){var n=r.insertStyleElement(r);return{update:function(t){!function(r,n,t){var i=t.css,e=t.media,o=t.sourceMap;e?r.setAttribute("media",e):r.removeAttribute("media"),o&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(i,r)}(n,r,t)},remove:function(){!function(r){if(null===r.parentNode)return!1;r.parentNode.removeChild(r)}(n)}}}},589:r=>{"use strict";r.exports=function(r,n){if(n.styleSheet)n.styleSheet.cssText=r;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(r))}}},876:()=>{},970:()=>{const r=new Map;r.set(-2,"wall"),r.set(-1,"empty"),r.set(0,"i"),r.set(1,"o"),r.set(2,"s"),r.set(3,"z"),r.set(4,"j"),r.set(5,"l"),r.set(6,"t");const n=new Map;n.set("i",[[1,0,1,1]]),n.set("o",[[1,1],[0,1]]),n.set("s",[[-1,1,1],[1,0,-1]]),n.set("z",[[1,1,-1],[-1,0,1]]),n.set("j",[[1,-1,-1],[1,0,1]]),n.set("l",[[-1,-1,1],[1,0,1]]),n.set("t",[[-1,1,-1],[1,0,1]]),defineEnum({none:{string:"none",score:0,displayTitle:""},single:{string:"single",score:100,displayTitle:"Single"},double:{string:"double",score:300,displayTitle:"Double"},triple:{string:"triple",score:500,displayTitle:"Triple"},tetris:{string:"tetris",score:800,displayTitle:"Tetris"},mini_tspin:{string:"mini-t",score:100,displayTitle:""},mini_tspin_single:{string:"mini-t_single",score:200,displayTitle:"Mini T-Spin Single"},tspin:{string:"tspin",score:400,displayTitle:""},tspin_single:{string:"t_single",score:800,displayTitle:"T-Spin Single"},tspin_double:{string:"t_double",score:1200,displayTitle:"T-Spin Double"},tspin_triple:{string:"t_triple",score:1600,displayTitle:"T-Spin Triple"},back_to_back:{string:"btob",score:1.5,displayTitle:""},softDrop:{string:"softDrop",score:1,displayTitle:""},hardDrop:{string:"hardDrop",score:2,displayTitle:""},ren:{string:"ren",score:50,displayTitle:""}}),defineEnum({Up:{string:"up",value:0},Right:{string:"right",value:1},Down:{string:"down",value:2},Left:{string:"left",value:3}}),defineEnum({Normal:{string:"normal"},FirstTerrain:{string:"firstTerrain"}})},855:()=>{$((function(){$("#gameoverDialog").dialog({title:"game over",buttons:{restart:function(){startTetris(),$(this).dialog("close")},toMainMenu:function(){toMainMenu(),$(this).dialog("close")}}})}))},596:()=>{},397:()=>{const r=function(){this._enums=[],this._lookups={}};r.prototype.getEnums=function(){return this._enums},r.prototype.forEach=function(r){let n=this._enums.length;for(let t=0;t<n;++t)r(this._enums[t])},r.prototype.addEnum=function(r){this._enums.push(r)},r.prototype.getByName=function(r){return this[r]},r.prototype.getByValue=function(r,n){let t=this._lookups[r];if(t)return t[n];{this._lookups[r]=t={};let i,e=this._enums.length-1;for(;e>=0;--e){let o=this._enums[e],A=o[r];t[A]=o,A==n&&(i=o)}return i}}},609:()=>{},238:()=>{},178:()=>{initDialogs(),$(document).on("click","#startButton",(()=>{initTetris(),startTetris()})),$(document).on("touched","#startButton",(()=>{initTetris(),startTetris()})),toMainMenu()},271:()=>{},578:()=>{},763:()=>{},721:()=>{},733:()=>{GameRuleType.Normal.string,GameRuleType.FirstTerrain.string},337:()=>{function r(){moveToLeft((function(r){}))}function n(){moveToRight((function(r){}))}function t(r){softDrop(r)}function i(){hardDrop()}function e(){rightRotation()}function o(){leftRotation()}function A(){hold()}$(document).ready((function(){addKeyActions(68,n,(()=>{}),n,(()=>{}),300,50),addKeyActions(65,r,(()=>{}),r,(()=>{}),300,50),addKeyActions(38,i),addKeyActions(87,i),addKeyActions(40,t.bind(null,!0),t.bind(null,!1)),addKeyActions(83,t.bind(null,!0),t.bind(null,!1)),addKeyActions(37,o),addKeyActions(39,e),addKeyActions(16,A),$(this).on("swipedist",(function(t,i,e){switch(console.log(i),i){case"left":r();break;case"right":n()}})),$(this).on("swipestart",(function(r,n,t){switch(n){case"up":A()}})),$(this).on("longswipe",(function(r,n,i){switch(console.log(redLog+i+resetLogColor),"down"!=n&&t(!1),n){case"down":t(!0);break;case"up":A()}})),$(this).on("swipeend",(function(r,n,e){switch(console.log(redLog+e+resetLogColor),t(!1),n){case"down":e>5&&i();break;case"up":A()}})),$(this).on("touched",(function(r,n,t){console.log(n,t),n>300?e():o()}))}))}},n={};function t(i){var e=n[i];if(void 0!==e)return e.exports;var o=n[i]={id:i,exports:{}};return r[i](o,o.exports,t),o.exports}t.n=r=>{var n=r&&r.__esModule?()=>r.default:()=>r;return t.d(n,{a:n}),n},t.d=(r,n)=>{for(var i in n)t.o(n,i)&&!t.o(r,i)&&Object.defineProperty(r,i,{enumerable:!0,get:n[i]})},t.o=(r,n)=>Object.prototype.hasOwnProperty.call(r,n),t.r=r=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},(()=>{"use strict";t(58),t(948),t(887),t(970),t(855),t(596),t(397),t(609),t(238),t(178),t(271),t(578),t(876),t(763),t(721),t(733),t(337)})()})();
//# sourceMappingURL=main.js.map