#!/usr/bin/env python3

import os
import zipfile
import shutil
from pathlib import Path
import tempfile

def get_downloads_dir():
    home = Path.home()
    # Try to detect the Windows username under WSL
    win_user = os.getenv("USERNAME") or os.getenv("WSLUSER")
    if win_user:
        wslHome = Path(f"/mnt/c/Users/{win_user}")
        downloads = wslHome / "Downloads"
        if downloads.exists(): return downloads
    # Fallback: Linux/Windows native home
    return home / "Downloads"



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
    latestZip = find_latest_zip(downloads)
    print(f"[grapesJS sync]: using ZIP: {latestZip}")
    extract_and_copy(latestZip, Path.cwd())


if __name__ == "__main__":
    main()
