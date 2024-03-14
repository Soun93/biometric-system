import detection

def main():
    _, capture = detection.videoCap(0)

    detection.App(capture)

    
if __name__ == "__main__":
    main()