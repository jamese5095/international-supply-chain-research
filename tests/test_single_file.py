"""Check the standalone artifact, embedded snapshots and JS syntax without npm."""
import json
import re
import subprocess
import tempfile
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.scripts = []
        self.current = None
        self.remote = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script':
            if attrs.get('src'):
                self.remote.append(attrs['src'])
            self.current = [attrs, '']
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.remote.append(attrs.get('href'))
        if tag == 'img' and not attrs.get('src', '').startswith('data:'):
            self.remote.append(attrs.get('src'))

    def handle_data(self, value):
        if self.current is not None:
            self.current[1] += value

    def handle_endtag(self, tag):
        if tag == 'script' and self.current is not None:
            self.scripts.append(self.current)
            self.current = None


class SingleFile(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (ROOT / 'index.html').read_text()
        cls.doc = Scripts()
        cls.doc.feed(cls.html)
        cls.bundle = json.loads(next(code for attrs, code in cls.doc.scripts if attrs.get('id') == 'atlas-bundle'))

    def test_no_external_runtime_resources(self):
        self.assertEqual(self.doc.remote, [])
        for page, text in self.bundle['pages'].items():
            doc = Scripts()
            doc.feed(text)
            self.assertEqual(doc.remote, [], page)
            scripts = '\n'.join(code for _, code in doc.scripts)
            self.assertFalse("createElement('script')" in scripts, page)
        # D3 includes unused optional fetch helpers. Application code never calls
        # them; inspect the app sources rather than mistaking library APIs for IO.
        for file in (ROOT / 'src').glob('*.js'):
            self.assertFalse(bool(re.search(r'\bfetch\s*\(', file.read_text())), file.name)

    def test_data_has_not_changed(self):
        for path, value in self.bundle['data'].items():
            self.assertEqual(value, json.loads((ROOT / 'src' / path).read_text()), path)
        firms = self.bundle['data']['downloads/enterprise-samples-2025.json']['enterprises']
        self.assertEqual(len(firms), 55)
        self.assertEqual(sum(f['flow'] == 'X' for f in firms), 30)
        self.assertEqual(sum(f['flow'] == 'M' for f in firms), 25)
        self.assertEqual(len(self.bundle['data']['downloads/scale-2025.json']['trade']), 29)

    def test_all_script_blocks_parse(self):
        with tempfile.TemporaryDirectory() as folder:
            groups = {'shell': self.doc.scripts}
            for page, text in self.bundle['pages'].items():
                doc = Scripts(); doc.feed(text); groups[page] = doc.scripts
            for name, blocks in groups.items():
                source = '\n'.join(code for attrs, code in blocks if attrs.get('type', '') != 'application/json')
                source = source.replace('/*__ATLAS_STATE__*/', '"https://atlas.internal/index.html#home"')
                file = Path(folder) / (name + '.js'); file.write_text(source)
                result = subprocess.run(['node', '--check', str(file)], capture_output=True, text=True)
                self.assertEqual(result.returncode, 0, name + ': ' + result.stderr)

    def test_build_is_reproducible_and_has_no_abandoned_sources(self):
        before = self.html
        subprocess.run(['python3', 'build.py'], cwd=ROOT, check=True, capture_output=True)
        self.assertEqual(before, (ROOT / 'index.html').read_text())


if __name__ == '__main__':
    unittest.main()
