const fs = require('fs');
const PDFParse = require('pdf-parse').PDFParse;

(async () => {
    try {
        let dataBuffer = fs.readFileSync("D:/Diagnostic Microbiology Splits/Diagnostic Microbiology 13th ed - BAILEY&SCOTT'S_compressed-225-263.pdf");
        if (typeof PDFParse === 'function') {
            const data = await PDFParse(dataBuffer);
            fs.writeFileSync('biochemical_tests_raw.txt', data.text);
            console.log("Extraction complete. Text saved to biochemical_tests_raw.txt");
        } else {
            console.log(typeof PDFParse);
        }
    } catch (e) {
        console.error(e);
    }
})();
