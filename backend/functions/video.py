import cv2, base64

def retrieveVideoThumbnail(filePath, scalePercent = None):
    vid = cv2.VideoCapture(filePath)
    if scalePercent != None:
        vWidth = int(int(vid.get(3)) * scalePercent / 100)
        vHeight = int(int(vid.get(4)) * scalePercent / 100)
    if not vid.isOpened():
        raise RuntimeError("Could not open video file.")
    _, frame = vid.read()
    vid.release()
    if scalePercent != None:
        frame = cv2.resize(frame, (vWidth, vHeight))
    _, buffer = cv2.imencode('.jpg', frame)
    return base64.b64encode(buffer)