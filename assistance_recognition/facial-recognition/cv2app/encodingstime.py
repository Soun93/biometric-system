import face_recognition as fr
import cv2
import sys
import time

def faceRecognition(frame):

    start = time.time()

    smaller = cv2.resize(frame, (0, 0), fx = 0.25, fy = 0.25)
    rgbframe = cv2.cvtColor(smaller, cv2.COLOR_BGR2RGB)

    fr.face_encodings(rgbframe)

    return time.time() - start

def main():
    vc = cv2.VideoCapture(0)

    if not vc.isOpened():
        sys.exit("COULDNT OPEN VIDEO CAPTURE DEVICE")
    
    count = 0
    encnum = 10
    for i in range(0, encnum):

        ret, frame = vc.read()
        count += faceRecognition(frame)

    print(f"Face_recognition enc/sec is: {encnum/count} encodings per second")

if __name__ == "__main__":
    main()