import face_recognition
import os, sys
import numpy as np
import cv2
import math
from numba import jit, cuda
import threading
import multiprocessing
import random
import time

def face_confidence(face_distance, threshold=0.6):
    range = 1.0 - threshold
    linear_val = (1.0 - face_distance) / (2.0 * range)

    if face_distance > threshold:
        return str(round(linear_val * 100, 2) + '%')
    else:
        value = (linear_val + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))) * 100
        return str(round(value, 2)) + '%'

def generateEncodings(frame, locations):
    return face_recognition.api.face_encodings(frame, locations)

class facerec:
    face_locations = []
    face_encodings = []
    face_names = []
    names = []
    known_encodings = []
    known_names = []
    frame = []
    process_frame = True


    def __init__(self) -> None:
        pass

    def loadEncodings(self):
        path = './facial-recognition/camapptk/encodings/'

        for file in os.listdir(path):
            filename = os.fsdecode(file)
            if filename.endswith(".npy"):
                print("Looking in path:", os.path.join(path, filename))
                enc = np.load(os.path.join(path, filename))
                name = filename[:-4]

                self.known_encodings.append(enc)
                self.known_names.append(name)

    def recognition(self, known_encodings, known_names, locationsQueue: multiprocessing.Queue, frameQueue: multiprocessing.Queue, namesQueue: multiprocessing.Queue, event):
        
        while True:
            if event.is_set():
                break
            #print("creating encodings")
            #print(frame)
            #if len(self.frame) != 0:
                #cv2.imshow("enc", self.frame)

            if frameQueue.empty():
                continue
            frame = frameQueue.get(block=False)
            loc = locationsQueue.get(block=False)

            encodings = generateEncodings(frame, loc)

            locationsQueue.put(loc)

            if len(encodings) == 0:
                continue
            
            names = []
            # using face distance
            for face_encoding in encodings:
                #match = face_recognition.compare_faces(self.known_encodings, face_encoding)
                name = ''
                confidence = ''

                face_distance = face_recognition.face_distance(known_encodings, face_encoding)
                print(face_distance)
                time.sleep(2)
                best_match_ind = int(np.argmin(face_distance)/128)
                #print("best match", best_match_ind)

                #if match[best_match_ind]:
                name = known_names[best_match_ind]
                confidence = face_confidence(face_distance[best_match_ind][0])
                
                #print(name, "found")
                names.append(f"{name} {confidence}")  
            namesQueue.put(names)
            

    def run(self):
        self.loadEncodings()
        videocap = cv2.VideoCapture(0)
        scaling = 4

        if not videocap.isOpened():
            sys.exit("Video Capture not found")
        
        #event = threading.Event()
        #thread = threading.Thread(target=self.recognition, args=(event,)).start()
        event = multiprocessing.Event()

        namesQueue = multiprocessing.Queue()
        frameQueue = multiprocessing.Queue()
        locationsQueue = multiprocessing.Queue()
        namesQueue.put(self.names)
        frameQueue.put(self.frame)
        locationsQueue.put(self.face_locations)
        
        process = multiprocessing.Process(target=self.recognition, args=(self.known_encodings, self.known_names, locationsQueue, frameQueue, namesQueue, event,)).start()
        
        print("initializing capture")
        while True:
            ret, frame = videocap.read()
            if self.process_frame == True:
                scale = 1/scaling
                smaller = cv2.resize(frame, (0, 0), fx = scale, fy = scale)
                rgbframe = cv2.cvtColor(smaller, cv2.COLOR_BGR2RGB)

                # find faces
                self.face_locations = face_recognition.face_locations(rgbframe)
                while not locationsQueue.empty():
                    locationsQueue.get(block=False)
                locationsQueue.put(self.face_locations)
                while not frameQueue.empty():
                    frameQueue.get(block=False)
                frameQueue.put(rgbframe)

            """
            self.process_frame = not self.process_frame
            for (top, right, bottom, left) in self.face_locations:
                # Scale back up face locations since we scaled them down
                #frame = cv2.resize(frame, (0, 0), fx=scale, fy=4)   
                top *= scaling
                right *= scaling
                bottom *= scaling
                left *= scaling

                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), (255, 0, 0), 2)
                cv2.rectangle(frame, (left, bottom + 35), (right, bottom), (255, 0, 0), cv2.FILLED)
            """
            names = namesQueue.get(block=False)
            namesQueue.put(names)
            if len(names) == 0:
                names = []
                for name in range(0, len(self.face_locations)):
                    names.append("")
            for (top, right, bottom, left), name in zip(self.face_locations, names):
                # Scale back up face locations since we scaled them down
                #frame = cv2.resize(frame, (0, 0), fx=scale, fy=4)   
                top *= scaling
                right *= scaling
                bottom *= scaling
                left *= scaling

                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), (255, 0, 0), 2)
                cv2.rectangle(frame, (left, bottom + 35), (right, bottom), (255, 0, 0), cv2.FILLED)
                # draw font
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom + 30), font, 0.5, (255, 255, 255), 1)
            cv2.imshow("FACE RECOGNITION ONLY CV2", frame)

            if cv2.waitKey(1) == ord('q'):
                event.set() 
                break

        videocap.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    fr = facerec()
    fr.run()