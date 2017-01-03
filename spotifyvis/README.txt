~/ HOW TO RUN app.js /~
( THIS METHOD WILL GET US A JSON FILE )
1. INSTALL NODE.JS
2. ON CMD LINE:
    1. GO TO REPOSITORY FOLDER (visualizacao_ufpe_2016_2_projeto)
    2. RUN "npm install' -> THIS COMMAND WILL INSTALL ALL DEPENDENCIES
       MODULES LISTED ON package.json. ONLY NEED TO RUN ONE TIME, UNLESS
       A NEW MODULE GET ADDED
    3. NOW RUN "node Projeto/src/app.js"

~/ HOW TO RUN spotify-requests.js /~
( THIS METHOD WILL GET US A JAVASCRIPT OBJECT )
1. INSTALL NODE.JS
2. ON CMD LINE:
    1. GO TO REPOSITORY FOLDER (visualizacao_ufpe_2016_2_projeto);
    2. ENTER "npm install' -> THIS COMMAND WILL INSTALL ALL DEPENDENCIES
       MODULES LISTED ON package.json. WE ONLY NEED TO ENTER THIS COMMAND ONE TIME, 
       UNLESS A NEW MODULE GET ADDED. ALSO, ENTER "npm install -g browserify". THIS
       WILL ALLOW US TO RUN THE SPOTIFY WEB API IN A BROWSER, THROUGH A JAVASCRIPT
       FILE; 
    3. ENTER "browserify Projeto\src\spotify-requests.js > Projeto\src\bundle.js".
       WE CREATED A BUNDLE CONTAINING ALL THE INFORMATION A BROWSER NEEDS TO 
       "UNDERSTAND" THE spotify-request.js. ANYTIME WE MADE A CHANGE TO spotify-requests.js
       WE NEED TO RUN browserify TO GENERATE A NEW bundle.js;
    4. index.html ALREADY HAS A SCRIPT POINTING TO bundle.js. JUST OPEN IT ON A
       BROWSER.
        
