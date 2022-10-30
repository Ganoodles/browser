import os
import filetype
import pathlib
from datetime import datetime

from ..utils import DirUtils, FileUtils

# TODO: somehow need to handle files with same name as folder
# TODO: also need to rewrite this and put in methods
def clusterJson(config):
    path = config["path"]
    res = []

    for idx, filename in enumerate(os.listdir(path)):
        fThumbnail, fSize, fRPath, fType, fModified, fCreation, fExtension = None, None, None, None, None, None, None
        f = os.path.join(path, filename)

        stat = os.stat(f)
        fRelativePath = os.path.relpath(f)
        fDisplayPath = "files/" + os.path.relpath(f, path) # would need to remove if wanted to serve other paths
        fModified = datetime.fromtimestamp(stat.st_mtime).strftime('%m/%d/%Y')
        fCreation = datetime.fromtimestamp(stat.st_ctime).strftime('%m/%d/%Y')
        simpleIcon, galleryIcon = None, None
        
        if os.path.isfile(f):
            fExtension = pathlib.Path(filename).suffix
            fSize = format_bytes(stat.st_size)

            # TODO: screw this I need to do my own file matching
            # TODO: maybe find a better way to do this, switch case?
            if filetype.image_match(f):
                fType = "image"
                simpleIcon = "/svgs/image.svg"
                galleryIcon = "/svgs/gallery/image.svg"
            elif filetype.video_match(f):
                fThumbnail = "/thumbnails/" + pathlib.Path(f).name + ".webp"
                fType = "video"
                simpleIcon = "/svgs/video.svg"
                galleryIcon = "/svgs/gallery/video.svg"
            elif filetype.audio_match(f):
                fType = "audio"
                simpleIcon = "/svgs/audio.svg"
                galleryIcon = "/svgs/gallery/audio.svg"
            elif filetype.archive_match(f):
                fType = "archive"
                simpleIcon = "/svgs/archive.svg"
                galleryIcon = "/svgs/gallery/archive.svg"
            else:
                fType = "other"
                simpleIcon = "/svgs/globe.svg"
                galleryIcon = "/svgs/gallery/globe.svg"

        else:
            simpleIcon = "/svgs/folder.svg"
            fSize = format_bytes(get_dir_size(f))
            fType = "folder"

        res.append({
            "name": filename, 
            "extension": fExtension, 
            "size": fSize, 
            "path": path + f,
            "relativePath": fRelativePath,
            "displayPath": fDisplayPath,
            "dateModified": fModified,
            "dateCreated": fCreation,
            "type": fType, 
            "simpleIcon": simpleIcon,
            "galleryIcon": galleryIcon,
            "thumbnail" : fThumbnail
        })
    return(res)

def get_dir_size(dir_path:str) -> int:
    size = 0
    with os.scandir(dir_path) as itm:
        for entry in itm:
            if entry.is_file():
                size += entry.stat().st_size
            elif entry.is_dir():
                size += get_dir_size(entry.path)
    return size

sizes = ['bytes','KB','MB','GB','TB','PB','EB','ZB','YB']
def format_bytes(byte_count:int) -> str:
    size_type = 0
    while byte_count/1024 > 1:
        byte_count = byte_count/1024
        size_type += 1
    return f'{round(byte_count,2)} {sizes[size_type]}'
