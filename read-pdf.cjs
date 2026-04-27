const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const buf = fs.readFileSync('May 2023 ABSTRACT OVERALL QUOTATION DETAILS.pdf');
const parser = new PDFParse();
parser.parse(buf).then(data => { console.log(data.text); });
