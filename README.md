# OCROnTheWeb
Simple OCR Model 100% Free that runs on the browser using **tesseract.js** https://github.com/naptha/tesseract.js

Live on https://ocr-scanner.dloizides.com/
![alt text](ocr-scanner-preview.jpg)

## Addons

- ✅ Accessibility checked using WAVE https://wave.webaim.org/extension/
- ✅ OWASP OWASP ZAP (Zed Attack Proxy) is a free, open-source tool for finding vulnerabilities in web applications.
  - ✅ Content Security Policy (CSP)
    - Unfortunately had to use 'wasm-unsafe-eval' for tesseract.js to work
  - ⚠️Missing Anti-clickjacking Header
  - ⚠️Server Leaks Version Information via "Server" HTTP Response Header Field
  - ⚠️Strict-Transport-Security Header Not Set
  - ⚠️X-Content-Type-Options Header Missing
- ✅ CEO
