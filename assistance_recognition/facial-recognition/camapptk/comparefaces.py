import face_recognition as fr
import numpy as np

class person:

    def __init__(self, name, enc) -> None:
        
        self.name = name
        self.enc = enc

    def id(self, encoding):

        result = fr.compare_faces([encoding], self.enc)[0]

        return result


def main():

    # 1. Cargar el encoding necesario
    encodings = np.load("C:/Programacion/projects/biometricStudent/Biometric-Student-Attendance-System/facial-recognition/camapp/encodings/ari0enc.npy")[0]

    # 2. cargar imagen y generar encoding
    img = fr.load_image_file("C:/Programacion/projects/biometricStudent/Biometric-Student-Attendance-System/facial-recognition/camapp/img/ari.png")
    enc = fr.face_encodings(img)[0]

    print(encodings)
    print(enc)

    # 3. array de resultado
    results = fr.compare_faces([encodings], enc)[0]

    print(results)

    if results:
        print("SON LA MISMA PERSONA WUUUUU")
    else:
        print("NO SON LA MISMA PERSONA NOUWU")




if __name__ == "__main__":
    main()