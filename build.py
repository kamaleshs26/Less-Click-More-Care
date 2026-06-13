import codecs
import re

# Map emoji to clean text alternatives that render everywhere
EMOJI_MAP = {
    '🏥': '&#x2665;',   # heart for hospital
    '👨‍⚕️': 'MD',
    '👩‍⚕️': 'NP',
    '🩺': 'RES',
    '📊': '&#9783;',
    '🤖': 'AI',
    '🔒': '&#128274;',
    '📋': '&#128203;',
    '⚖️': '&#9878;',
    '🧠': '&#129504;',
    '🏗️': '&#127959;',
    '📈': '&#128200;',
    '📅': '&#128197;',
    '✅': '&#10003;',
    '⚠️': '&#9888;',
    '🚫': '&#128683;',
    '🔔': '&#128276;',
    '❓': '?',
    '🍁': '&#127809;',
    '🇨🇦': 'CA',
    '🔐': '&#128272;',
    '🛡️': '&#128737;',
    '🚨': '&#128680;',
    '🔴': '&#128308;',
    '🟡': '&#128993;',
    '🤖': 'AI',
    '⏱️': '&#9203;',
    '🔬': '&#128300;',
    '⚡': '&#9889;',
    '✂️': '&#9986;',
    '🗓': '&#128211;',
    '👤': '&#128100;',
    '🆔': 'ID',
    '📍': '&#128205;',
    '📞': '&#128222;',
    '📥': '&#128229;',
    '📄': '&#128196;',
    '🔍': '&#128269;',
    '🗑': '&#128465;',
    '💊': 'Rx',
    '📖': '&#128214;',
    '🏠': '&#127968;',
    '🔄': '&#8635;',
    '⏳': '&#8987;',
    '❌': '&#10007;',
    '📅': '&#128197;',
    '🔗': '&#128279;',
    '📊': '&#128202;',
    '🏆': '&#127942;',
    '🩺': 'Rx',
    '💾': '&#128190;',
    '👥': '&#128101;',
    '⚙️': '&#9881;',
    '🚪': '&#128682;',
    '🚨': '&#128680;',
    '🛡': '&#128737;',
    '🧪': '&#129514;',
}

with codecs.open('app.js', 'r', 'utf-8') as f:
    js = f.read()

with codecs.open('styles.css', 'r', 'utf-8') as f:
    css = f.read()

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Less Clicks, More Care&trade; &mdash; Clinical AI Governance Platform</title>
  <meta name="description" content="PHIPA-compliant AI governance for Canadian hospitals. Secure, auditable, and fast clinical AI for physicians, nurses, and residents.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
STYLES_PLACEHOLDER
  </style>
</head>
<body>
  <div id="app"></div>
  <script>
JS_PLACEHOLDER
  </script>
</body>
</html>"""

html = html_template.replace('STYLES_PLACEHOLDER', css).replace('JS_PLACEHOLDER', js)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)

# Verify
with codecs.open('index.html', 'r', 'utf-8') as f:
    content = f.read()

print(f'Build complete - {len(content.encode("utf-8"))//1024}KB')
print(f'Has hospital: {chr(0x1F3E5) in content}')
print(f'Has cross mark: {chr(0x2713) in content}')
