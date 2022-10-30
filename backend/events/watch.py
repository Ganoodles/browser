import cv2, io, time, shutil, filetype, warnings, mimetypes

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from pathlib import Path

import numpy as np
import audio_metadata
from PIL import Image

#TODO: handle executables and other thumbnail types

warnings.filterwarnings("ignore", message="Ignoring ``TDRC`` frame with value") # ignores redundant warnings
warnings.filterwarnings("ignore", message="Ignoring ``TDOR`` frame with value")

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
    """Watches specified directory for file changes, and saves a matching thumbnail if needed, also checks on for missing thumbnails start."""
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


class DirUtils:
    @staticmethod
    def syncDirs(inPath: str, outputPath: str, inName: str, outName: str, imageQuality: int) -> bool:
        """Compares directory files once, deletes old thumbnails, makes missing ones, used on initialization."""
        # contains list of relative paths for every file in directory exclusing parent folder name
        inList: set[Path] = set([Path(DirUtils.getSubPath(f, inName)) for f in Path(inPath).rglob('*')])
        outList: set[Path] = set([Path(DirUtils.getSubPath(f, outName)).with_suffix('') for f in Path(outputPath).rglob('*')])
        
        inDif: set[Path] = inList.difference(outList)
        outDif: set[Path] = outList.difference(inList)
        
        folders: list[Path] = [] # contains all folders left over afted deleting files
        for file in outDif: # deletes old thumbnails
            file = Path(outputPath).joinpath(file)
            
            thum = Path(str(file) + ".webp") # TODO: maybe add suffix somehow instead of string manipulation
            
            if thum.is_file():
                try:
                    thum.unlink(missing_ok=True)
                except:
                    pass
                
            elif file.is_dir():
                folders.append(file)

        for dir in folders: # delete empty hanging folders
            dir.rmdir()
        
        # generates missing thumbnails and folders
        for file in inDif:
            outLocation: Path = Path(outputPath).joinpath(str(file) + '.webp')
            file: Path = Path(inPath).joinpath(file) 
            
            Path(outLocation).parent.mkdir(parents=True, exist_ok=True) # generates parent folders if missing
            if FileUtils.mimeTypeCheck(file, "video"):
                img: np.ndarray = FileUtils.frameCapture(str(file), imageQuality)
                cv2.imwrite(str(outLocation), img) 

            elif FileUtils.mimeTypeCheck(file, "audio"):
                img: np.ndarray = FileUtils.grabCoverArt(str(file), imageQuality)
                if not img is None:
                    cv2.imwrite(str(outLocation), img) 


    @staticmethod
    def splitAll(path: str) -> list:
        """ 
        Returns a path split into list by directories/file. 
        E.g "dir1/dir2/test.png" returns list "["dir1", "dir2, "test.png"]"
        """
        allParts: list[str] = []
        while 1:
            parts: tuple(str) = (str(Path(path).parent), str(Path(path).name))
            if parts[0] == path:
                allParts.insert(0, parts[0])
                break
            elif parts[1] == path:
                allParts.insert(0, parts[1])
                break
            else:
                path = parts[0]
                allParts.insert(0, parts[1])
                
        return allParts

    @staticmethod
    def getSubPath(originalPath: str, initialName: str) -> str:
        """Returns sub path of specified directory in first instance (can run again if repeated), Accepts absolute and relative paths."""
        pathArr: list[str] = DirUtils.splitAll(originalPath)
        itemIdx: int = pathArr.index(initialName)
        reversedArr: list[str] = pathArr[itemIdx + 1:] # stores everything after itemIdx
        return Path("/".join(reversedArr))

class FileUtils:
    @staticmethod
    def mimeTypeCheck(filePath: str, type: str) -> bool:
        """Compares a files mimetype to see if it matches the check"""
        return str(mimetypes.guess_type(filePath)[0]).find(type) != -1

    @staticmethod
    def grabCoverArt(filePath: str, imageQuality: int = 100) -> np.ndarray:
        """Gets the cover art of audio file from metadata, optionally downscales it with argument "imageQuality", and returns cv2 numpy array encoded for webp"""
        try:
            meta = audio_metadata.load(filePath)
            cover = meta.pictures[0].data
            if cover:
                stream = io.BytesIO(cover)
                pilImg = Image.open(stream) # TODO: maybe find a way to do this without pillow cv2.imread(path, 0) 
                cvImg = cv2.cvtColor(np.array(pilImg), cv2.COLOR_RGB2BGR) # Converts to numpy arr and converts RGB TO BGR

                _, buf = cv2.imencode(".webp", cvImg, [cv2.IMWRITE_WEBP_QUALITY, imageQuality])
                img = cv2.imdecode(buf, 1)
                
                return img
        except Exception:
            return None
        
    @staticmethod
    def frameCapture(filePath: str, imageQuality: int = 100) -> np.ndarray: 
        """Captures first frame of video, optionally downscales it with argument "imageQuality", and returns cv2 numpy array encoded for webp"""
        try:
            if FileUtils.mimeTypeCheck(filePath, "video"):
                vid: cv2.VideoCapture = cv2.VideoCapture(filePath)
                
                success: bool
                image: np.ndarray
                success, image = vid.read()
                
                _: bool
                buf: np.ndarray
                _, buf = cv2.imencode(".webp", image, [cv2.IMWRITE_WEBP_QUALITY, imageQuality])
                
                image = cv2.imdecode(buf, 1)
                
                return image
        except Exception:
            return None