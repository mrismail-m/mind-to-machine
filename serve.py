#!/usr/bin/env python3
"""Serve the captured landing page, with correct MIME types for CDN files."""
import functools
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import argparse

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def guess_type(self, path):
        relative = '/' + str(Path(path).relative_to(ROOT / 'public'))
        return TYPES.get(relative, super().guess_type(path))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'manifest.json').read_text())
    TYPES = {r['local']: r['content_type'] for r in manifest.values() if r['local']}
    server = ThreadingHTTPServer(('127.0.0.1', args.port), functools.partial(Handler, directory=str(ROOT / 'public')))
    print(f'TechTO landing page: http://localhost:{args.port}', flush=True)
    try: server.serve_forever()
    except KeyboardInterrupt: pass
