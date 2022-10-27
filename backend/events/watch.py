from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import os
from pathlib import Path
import glob
import shutil
import cv2, base64
import os
from pathlib import Path
import filetype
import logging


class Handler(FileSystemEventHandler):
    @staticmethod
    def on_any_event(event):
        thumbnailDirectory = watchDir.thumbnailDirectory
        fileDir = watchDir.fileDir
        

        filename = Path(event.src_path).stem
        relpath = os.path.relpath(os.path.dirname(event.src_path), fileDir)
        dirLoc = thumbnailDirectory + relpath[1:] + "/" + filename
        thumbLoc = dirLoc + ".webp"

        if event.event_type == 'created' or event.event_type == 'modified':
            print("a")
            if filetype.video_match(event.src_path):
                print("a")
                watchDir.FrameCapture(event.src_path, thumbnailDirectory + relpath + "/", 15)
        elif event.event_type == 'deleted':
            if(os.path.isfile(thumbLoc)):
                os.remove(thumbLoc) 
            elif os.path.isdir(dirLoc):
                shutil.rmtree(os.path.dirname(dirLoc) + "/" + filename)


class watchDir:
    def __init__(self, thumbnailDirectory, fileDir, quality):
        self.thumbnailDirectory = thumbnailDirectory
        self.fileDir = fileDir
        self.quality = quality
        
        self.observer = Observer()
        self.syncDirs(self.thumbnailDirectory, self.fileDir)

    def run(self):
        event_handler = Handler()
        self.observer.schedule(event_handler, self.fileDir, recursive = True)
        self.observer.start()
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
        self.observer.join()

    def FrameCapture(self, filePath, outputPath, scalePercent = None):
        if filetype.video_match(filePath):
            filename = Path(filePath).stem
            vid = cv2.VideoCapture(filePath)
            success, image = vid.read()
            Path(outputPath).mkdir(parents=True, exist_ok=True)
            _, buf = cv2.imencode(".webp", image, [cv2.IMWRITE_WEBP_QUALITY, 25])
            img = cv2.imdecode(buf, 1)
            cv2.imwrite(os.path.join(outputPath, (filename + ".webp")), img)
            return True
        else: 
            return "Error: Not Video File"

    def syncDirs(self, thumb, file):
        thumb = os.path.normpath(thumb) + "/"
        file = os.path.normpath(file) + "/"

        fileLen, thumbLen = len(file)-1, len(thumb)-1

        # collect all files in thumb dir and file dir and remove parent dir for comparison
        sRPath1 = []
        rPath1 = [f for f in glob.glob(thumb + "**/*", recursive=True)]
        for value in rPath1:
            sRPath1.append ((os.path.dirname(value) + Path(value).stem)[thumbLen:])

        sRPath2 = []
        rPath2 = [f for f in glob.glob(file + "**/*", recursive=True)]
        for value in rPath2:
            sRPath2.append ((os.path.dirname(value) + Path(value).stem)[fileLen:])

        lFolders = []
        for i in rPath1:
            item = (os.path.dirname(i) + Path(i).stem)[thumbLen:]
            if item not in sRPath2:
                if(os.path.isfile(i)):
                    os.remove(i)
                else:
                    lFolders.append(i)
            else:
                pass
        if(lFolders):
            for i in lFolders:
                shutil.rmtree(i)

        for i in rPath2:
            if(os.path.isfile(i)):
                item = (os.path.dirname(i) + Path(i).stem)[fileLen:]
                if item not in sRPath1:
                    relpath = os.path.dirname(i)
                    relpath = os.path.relpath(relpath, file)
                    if filetype.video_match(i):
                        self.FrameCapture(i, thumb + relpath, self.quality)

