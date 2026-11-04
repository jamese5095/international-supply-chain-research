#!/usr/bin/env python3
"""Build a self-contained dashboard from the explicitly referenced source graph."""
import base64
import json
import re
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'src'
PAGES = {
    'home': 'index.html', 'heatmaps': 'trade-heatmaps.html',
    'enterprises': 'enterprises.html', 'capability-export': 'capability-export.html',
    'capability-import': 'capability-import.html',
}
DATA = (
    'downloads/scale-2025.json', 'downloads/trade-regions-2025.json',
    'downloads/trade-region-products-2025.json', 'downloads/trade-country-products-2025.json',
    'downloads/enterprise-samples-2025.json', 'downloads/international-import-references.json',
    'downloads/calculation-evidence-2025.json', 'vendor/countries-50m.json',
)
LICENSES = ('vendor/D3-LICENSE.txt', 'vendor/TOPOJSON-LICENSE.txt', 'vendor/WORLD-ATLAS-LICENSE.txt')
used = set()


def read(path):
    file = SOURCE / path
    if not file.is_file():
        raise ValueError('Missing referenced source: ' + path)
    used.add(path)
    return file.read_text(encoding='utf-8')


def js_json(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')


def inline_script(code):
    # A JS string or comment must not terminate its containing HTML script.
    return '<script>\n' + re.sub(r'</script', r'<\\/script', code, flags=re.I) + '\n</script>'


def local_path(value):
    return unescape(value).split('?', 1)[0].split('#', 1)[0].removeprefix('./')


def virtual_navigation(code):
    # Existing screen code keeps its own global scope and styles. Only browser
    # navigation is delegated to the single outer entry point.
    code = re.sub(r'(?<![\w$.])location\.', 'AtlasLocation.', code)
    code = re.sub(r'(?<![\w$.])history\.', 'AtlasHistory.', code)
    code = code.replace('window.location.', 'window.AtlasLocation.')
    code = code.replace('window.history.', 'window.AtlasHistory.')
    return code


def image_uri(path):
    file = SOURCE / path
    used.add(path)
    return 'data:image/png;base64,' + base64.b64encode(file.read_bytes()).decode('ascii')


def compile_page(file):
    text = read('pages/' + file)
    scripts = []

    def collect(match):
        path = local_path(match.group(1))
        code = read(path)
        scripts.append(inline_script(code if path.startswith('vendor/') else virtual_navigation(code)))
        return ''

    text = re.sub(r'<script\b[^>]*\bsrc="([^"]+)"[^>]*>\s*</script>', collect, text)

    def stylesheet(match):
        tag = match.group(0)
        rel = re.search(r'rel="([^"]+)"', tag)
        href = re.search(r'href="([^"]+)"', tag)
        if not rel or not href:
            return tag
        if rel.group(1) == 'stylesheet':
            return '<style>\n' + read(local_path(href.group(1))) + '\n</style>'
        if rel.group(1) == 'icon':
            return tag.replace(href.group(1), image_uri(local_path(href.group(1))))
        return tag

    text = re.sub(r'<link\b[^>]*>', stylesheet, text)
    text = re.sub(r'(<img\b[^>]*\bsrc=")([^"]+)(")',
                  lambda m: m.group(1) + image_uri(local_path(m.group(2))) + m.group(3), text)
    text = virtual_navigation(text)  # Inline event attributes, if present.
    bridge = inline_script(read('embedded-bridge.js'))
    text = text.replace('</body>', bridge + '\n'.join(scripts) + '</body>')
    if re.search(r'<script\b[^>]*\bsrc=|<link\b[^>]*rel="stylesheet"', text):
        raise ValueError('Unbundled resource in ' + file)
    return text


def build():
    pages = {key: compile_page(file) for key, file in PAGES.items()}
    titles = {key: re.search(r'<title>(.*?)</title>', html).group(1) for key, html in pages.items()}
    payload = {'pages': pages, 'titles': titles, 'data': {path: json.loads(read(path)) for path in DATA}}
    router = read('single-router.js')
    shell = read('single-shell.js')
    notices = '\n\n'.join(read(path) for path in LICENSES)
    # Any file under src must be a build dependency. A new abandoned source or
    # duplicate snapshot fails the build instead of silently expanding releases.
    actual = {str(p.relative_to(SOURCE)) for p in SOURCE.rglob('*') if p.is_file()}
    unused = sorted(actual - used)
    if unused:
        raise ValueError('Unreferenced source files: ' + ', '.join(unused))
    html = '''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="六行业国际供应链研究：行业规模、区域流向、贸易热力图、代表企业与进出口能力建设">
<title>国际供应链行业研究</title>
<style>html,body{margin:0;height:100%;background:#f4f7f9}#atlas-view{display:block;width:100%;height:100%;border:0}#atlas-status{position:fixed;inset:0;display:grid;place-items:center;font:15px system-ui;color:#536778;background:#f4f7f9}#atlas-status[hidden]{display:none}</style>
</head><body>
<div id="atlas-status" role="status">正在打开研究看板…</div>
<iframe id="atlas-view" title="国际供应链行业研究"></iframe>
<noscript>请启用JavaScript查看研究看板。</noscript>
'''
    html = html.replace('</head>', '<link rel="icon" href="' + image_uri('logo.png') + '"></head>')
    html += '<!-- Third-party notices\n' + notices.replace('--', '—') + '\nNatural Earth geographical data: Public Domain.\n-->\n'
    html += '<script id="atlas-bundle" type="application/json">' + js_json(payload) + '</script>\n'
    html += inline_script(router) + '\n' + inline_script(shell) + '\n</body></html>\n'
    (ROOT / 'index.html').write_text(html, encoding='utf-8')
    for key, file in PAGES.items():
        if key == 'home':
            continue
        # Keep already-shared public URLs usable without keeping a second app.
        fallback = './index.html#' + key
        redirect = "const u=new URL('/" + file + "'+location.search+location.hash,AtlasRoutes.origin);location.replace('./index.html'+AtlasRoutes.encode(u));"
        (ROOT / file).write_text('<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>国际供应链行业研究</title><body><a href="' + fallback + '">进入研究看板</a>' + inline_script(router) + inline_script(redirect) + '</body></html>\n', encoding='utf-8')
    print(f'Built index.html: {len(html.encode()):,} bytes; {len(pages)} screens; {len(DATA)} embedded snapshots; {len(used)} referenced source files; 0 unused sources.')


if __name__ == '__main__':
    build()
