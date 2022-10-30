import cv2, time, shutil

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from pathlib import Path
import numpy as np

from ..utils import DirUtils, FileUtils

#TODO: handle executables and other thumbnail types

class Handler(FileSystemEventHandler):
    def __init__(self, inDir: Path, outDir: Path, inName: str, outName: str, imageQuality: int):
        self.inDir: Path = inDir
        self.outDir: Path = outDir
        self.inName: str = inName
        self.outName: str = outName
        self.imageQuality: int = imageQuality


    def on_any_event(self, event):
        """Watches for file event, and generates/removes thumbnail accordingly"""
        eventPath: Path = Path(event.src_path)
        thumPath: Path = Path(self.outDir).joinpath(Path(str(DirUtils.getSubPath(eventPath, self.inName)) + ".webp"))
        thumDirPath: Path = Path(str(thumPath.with_suffix('')))

        if event.event_type == 'created' or event.event_type == 'modified':
            Path(thumPath).parent.mkdir(parents=True, exist_ok=True) # generates parent folders if missing
            
            if FileUtils.mimeTypeCheck(eventPath, "video"):
                img: np.ndarray = FileUtils.frameCapture(str(eventPath), self.imageQuality)
                if not img is None:
                    cv2.imwrite(str(thumPath), img) 

            elif FileUtils.mimeTypeCheck(eventPath, "audio"):
                img: np.ndarray = FileUtils.grabCoverArt(str(eventPath), self.imageQuality)
                if not img is None:
                    cv2.imwrite(str(thumPath), img) 
        
        if event.event_type == 'deleted':
            try:
                if thumPath.is_file():
                    thumPath.unlink(missing_ok=True)
                elif thumDirPath.is_dir():
                    shutil.rmtree(str(thumDirPath)) # TODO: maybe try doing this without destructive force
            except:
                pass

class WatchDir:
    """Watches specified directory for file changes, and saves a matching thumbnail if needed, also checks on start for missing thumbnails."""
    def __init__(self, thumbDir: str, fileDir: str, imageQuality: int = 100):
        self.thumbDir, self.fileDir, self.imageQuality = thumbDir, fileDir, imageQuality
        
        self.observer: Observer = Observer() # defines observer that watches for file changes and updates thumbnails
        DirUtils.syncDirs(self.fileDir, self.thumbDir, "files", "thumbnails", self.imageQuality) # checks on start for missing or hanging thumbnails, and handles them accordingly
        self.run()


    def run(self):
        event_handler: Handler = Handler(self.fileDir, self.thumbDir, "files",  "thumbnails", self.imageQuality) # put files and thumbnails in variables 
        self.observer.schedule(event_handler, self.fileDir, recursive = True)
        self.observer.start()
        try: # waits for keyboard interrupt and stops if detects one
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
        self.observer.join()
