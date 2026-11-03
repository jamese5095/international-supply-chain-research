#!/usr/bin/env python3
"""Package the root-based, buildless website without development files."""
import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('output', type=Path, help='Output ZIP file')
args = parser.parse_args()
source = Path(__file__).resolve().parents[1]
output = args.output.expanduser().resolve()
assets = ('downloads', 'vendor', 'story')
if any(output.is_relative_to(source / directory) for directory in assets):
    parser.error('Output must be outside website asset directories')
if output.exists() and output.is_dir():
    parser.error('Output must be a ZIP file, not a directory')
for required in ('index.html', 'app.js', 'research-data.js', 'downloads/scale-2025.json',
                 'downloads/trade-regions-2025.json', 'downloads/enterprise-chains-2025.json'):
    if not (source / required).is_file():
        parser.error('Missing website file: ' + required)
files = {path for path in source.iterdir()
         if path.is_file() and (path.suffix in ('.html', '.js', '.css', '.png')
                               or path.name in ('.nojekyll', 'data.json', 'DEPLOY.md'))}
for directory in assets:
    files.update(path for path in (source / directory).rglob('*')
                 if path.is_file() and not any(part.startswith('.') for part in path.relative_to(source).parts))
output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(files):
        archive.write(path, path.relative_to(source))
print(f'{output} ({len(files)} files)')
