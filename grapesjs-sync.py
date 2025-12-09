#!/usr/bin/env python3

import os
import zipfile
import shutil
import subprocess
import tempfile
from pathlib import Path

def get_downloads_dir():
    # Try WSL Windows username
    try:
        out = subprocess.check_output(['cmd.exe', '/C', 'echo', '%USERNAME%'])
        win_user = out.decode().strip()
        if win_user:
            downloads = Path(f"/mnt/c/Users/{win_user}/Downloads")
            if downloads.exists(): return downloads
    except: pass
    # Fallback: Linux/Windows native home
    return Path.home() / "Downloads"




def find_latest_zip(downloads_dir):
    zips = list(downloads_dir.glob("*.zip"))
    if not zips: raise FileNotFoundError("No ZIP files in Downloads")
    return max(zips, key=lambda p: p.stat().st_mtime)


def extract_and_copy(zipPath, targetDir):
    with zipfile.ZipFile(zipPath, "r") as z:
        for name in z.namelist():
            if name.endswith("index.html") or name.endswith("style.css"):
                tmpPath = z.extract(name, tempfile.gettempdir())
                filename = os.path.basename(name)
                shutil.copy(tmpPath, targetDir / filename)
                print(f"Updated {filename}")


def main():
    downloads = get_downloads_dir()
    print(f'search in: {downloads}')
    latestZip = find_latest_zip(downloads)
    print(f"[grapesJS sync]: using ZIP: {latestZip}")
    extract_and_copy(latestZip, Path.cwd())


if __name__ == "__main__":
    main()
