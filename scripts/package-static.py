#!/usr/bin/env python3
"""Package the self-contained index.html only; no assets or data directories."""
import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('output', type=Path, help='Output ZIP file')
args = parser.parse_args()
source = Path(__file__).resolve().parents[1]
output = args.output.expanduser().resolve()
if output.exists() and output.is_dir():
    parser.error('Output must be a ZIP file, not a directory')
entry = source / 'index.html'
if not entry.is_file() or 'id="atlas-bundle"' not in entry.read_text(encoding='utf-8'):
    parser.error('Run python3 build.py before packaging')
files = [entry]
output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(files):
        archive.write(path, path.relative_to(source))
print(f'{output} ({len(files)} files)')
