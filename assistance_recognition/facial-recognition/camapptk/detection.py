import cv2
import face_recognition as fr
import os
import numpy as np
import math
import tkinter as tk
from capture_devices import devices
from PIL import Image, ImageTk
import threading

SCREEN_WIDTH = 480
SCREEN_HEIGHT = 320

class App:

    def __init__(self, capture: cv2.VideoCapture):
            
        self.root = tk.Tk()
        self.capture = capture
        self.frame = None
        self.processedFrame = None
        self.frameReady = False
        self.known_encodings, self.names = load_encodings(path = './facial-recognition/camapptk/encodings/')
        self.faceInfo = []

        self.currentLocations = []


        self.root.title("Face Recognition")
        
        self.camera = tk.Label(self.root)
        self.camera.grid(column=0, row=0, columnspan=2)

        # event binding
        self.root.bind("<Key>", self.detect_key)

        self.button0 = tk.Button(self.root, text="Save Encodings", command=self.saveEncoding)
        self.button0.grid(column=0, row=1)

        self.button1 = tk.Button(self.root, text="Start recognize", command=lambda: threading.Thread(target=self.recognition).start())
        self.button1.grid(column=1, row=1)

        #person.loadPersons()

        self.root.after(0, self.updateCam)

        self.root.mainloop()

    def updateCam(self):

        ret, self.frame = self.capture.read()
        self.frameReady = False
        scaling = 0.5

        if ret:
            # change frame color format
            self.frame = cv2.resize(self.frame, (0, 0), fx=0.5, fy=0.5)
            self.processedFrame = cv2.cvtColor(self.frame, cv2.COLOR_BGR2RGB)

            self.imageResult(scaling)

            # create the image object for Tkinter and update 
            img = Image.fromarray(self.processedFrame)
            photo = ImageTk.PhotoImage(image=img)
            self.camera.config(image=photo)
            self.camera.image = photo
        else:
            self.camera.config(text="Camera not found")
            #print("Not found")

        self.frameReady = True
        self.root.after(1, self.updateCam)
    
    def imageResult(self, scaling):

        self.processedFrame = cv2.resize(self.processedFrame, (0, 0), fx=scaling, fy=scaling)

        # first look if there is faces in the location

        self.currentLocations = fr.face_locations(self.processedFrame)
        
        if len(self.currentLocations) != 0:
            self.drawBoxes(scaling)
        else:
            self.processedFrame = cv2.resize(self.processedFrame, (0, 0), fx=1/scaling, fy=1/scaling)   

        """
        for enc in frame_encodings:
            face_distance = fr.face_distance(known_encodings, enc)
            best_match_ind = int(np.argmin(face_distance)/128)
            print(face_distance)
            uwuName = names[best_match_ind] + face_confidence(face_distance[best_match_ind][0])
            print("True for", uwuName)
        """
    
    

    def detect_key(self, event):
        if event.char == 'c':
            self.saveEncoding()
    
    def saveEncoding(self):
        generateEncodings(self.frame)


    def drawBoxes(self, scaling: float):

        # Scale back up face locations since we scaled them down
        scale = int(1 / scaling)

        self.processedFrame = cv2.resize(self.processedFrame, (0, 0), fx=scale, fy=scale)
        
        for (top, right, bottom, left) in self.currentLocations:
            # Draw a box around the face
            top *= scale
            right *= scale
            bottom *= scale
            left *= scale
            cv2.rectangle(self.processedFrame, (left, top), (right, bottom), (255, 0, 0), 2)
            cv2.rectangle(self.processedFrame, (left, bottom + 35), (right, bottom), (255, 0, 0), cv2.FILLED)
        
        for (top, right, bottom, left), name  in zip(self.currentLocations, self.faceInfo):
            # Draw a box around the face
            top *= scale
            right *= scale
            bottom *= scale
            left *= scale
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(self.processedFrame, name, (left + 6, bottom + 30), font, 0.5, (255, 255, 255), 1)
        """
        cv2.rectangle(self.processedFrame, (left, bottom + 35), (right, bottom), (255, 0, 0), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(self.processedFrame, name, (left + 6, bottom + 30), font, 0.5, (255, 255, 255), 1)
        """
        
    def recognition(self):
        
        while True:

            encodings = fr.face_encodings(self.frame, self.currentLocations)

            faces_distance = []

            for enc in encodings:
                faces_distance.append(fr.face_distance(self.known_encodings, enc))
            # name = self.names[best_match_ind] + face_confidence(face_distance[best_match_ind][0])
            
            info = []
            # iterate for each encoding that has some distance in other encodings
            for distance in faces_distance:
                best_match_index = int(np.argmin(distance)/128)
                name = self.names[best_match_index]
                info.append((name)) 
                # + face_confidence(distance[best_match_index])

            self.faceInfo = info    
    



def listCamDev():
    
    result = devices.run_with_param(device_type='video', result_=True)

    return result

def videoCap(devID: int) -> list[bool, cv2.VideoCapture]:

    cap = cv2.VideoCapture(devID)

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, SCREEN_WIDTH)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, SCREEN_HEIGHT)
    uwu = True

    print("Using", listCamDev()[devID][14:], "with ID", devID)

    if cap is None or not cap.isOpened():
        print("Warning: Unable to open video capture device with ID - ", devID)
        uwu = False

    return (uwu, cap)

def generateEncodings(frame):
    
    encodings = fr.api.face_encodings(frame)

    if len(encodings) == 0:
        print("THERE IS NO FACES IN THE CAM")
        return

    print("Generating encodings with name?: ")
    name = input()

    path = './facial-recognition/camapptk/encodings/'

    i = 0
    while os.path.exists(r'{}{}{}enc.npy'.format(path, name, i)):
        i += 1
    
    path = r"{}{}{}enc.npy".format(path, name, i)

    # open file with writing binary
    with open(path, 'wb') as f:
        np.save(f, np.asarray(encodings))


def face_confidence(face_distance, threshold=0.6):
    range = 1.0 - threshold
    linear_val = (1.0 - face_distance) / (2.0 * range)

    if face_distance > threshold:
        return str(round(linear_val * 100, 2) + '%')
    else:
        value = (linear_val + ((1.0 - linear_val) * math.pow((linear_val - 0.5) * 2, 0.2))) * 100
        return str(round(value, 2)) + '%'

# path = './facial-recognition/camapptk/encodings/'
def load_encodings(path: str):

    encodings = []
    names = []
    for file in os.listdir(path):
        filename = os.fsdecode(file)
        if filename.endswith(".npy"):
            print("Looking in path:", os.path.join(path, filename))
            enc = np.load(os.path.join(path, filename))
            name = filename[:-4]

            encodings.append(enc)
            names.append(name)

    return (encodings, names)