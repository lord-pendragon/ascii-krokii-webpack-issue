- npm install
- npm start

Description: Using Asciidoctor's Kroki extension with Webpackv4 results in the following error:

ERROR in ./node_modules/asciidoctor-kroki/dist/browser/asciidoctor-kroki.js 29:32-40 
Cannot statically analyse 'require(…, …)' in line 29 
@ ./src/AsciiDoctor/AsciiDoctor.jsx 13:0-38 28:6-20 
@ ./src/App.jsx 5:0-52 11:35-46 @ ./src/index.js 7:0-24 11:33-36
 

How to Reproduce:

1. Make a React-App 

2. Add the following dependencies to packages.json:
"asciidoctor": "^2.2.5",
"asciidoctor-kroki": "^0.15.4",
"highlight.js": "11.4.0",
"sanitize-html": "2.6.1",
"webpack": "^4.0.0"

3. Add AsciiDoctor.jsx to your project

4. Import AsciiDoctor into App.jsx and use it as <AsciiDoctor/>

5. npm start: You will see the issue
