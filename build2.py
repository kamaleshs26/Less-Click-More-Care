import codecs

with codecs.open('app_clean.js', 'r', 'utf-8') as f:
    js = f.read()
with codecs.open('styles.css', 'r', 'utf-8') as f:
    css = f.read()

parts = [
    '<!DOCTYPE html>\n<html lang="en">\n<head>\n',
    '  <meta charset="UTF-8">\n',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n',
    '  <title>Less Clicks, More Care&trade; &mdash; Clinical AI Governance Platform</title>\n',
    '  <meta name="description" content="PHIPA-compliant AI governance for Canadian hospitals.">\n',
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n',
    '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n',
    '  <style>\n',
    css,
    '\n  </style>\n</head>\n<body>\n  <div id="app"></div>\n  <script>\n',
    js,
    '\n  </script>\n</body>\n</html>',
]

html = ''.join(parts)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)

print('Done:', len(html) // 1024, 'KB')
