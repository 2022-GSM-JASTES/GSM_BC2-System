import RPi.GPIO as GPIO
import time
import sys

motor = int(sys.argv[1])
quantity = int(sys.argv[2])

GPIO.setmode(GPIO.BCM)

servo1 = 12
servo2 = 7
servo3 = 16

def push(PIN_no, cnt):
    if(PIN_no == 1):
        PIN_no = servo1
    elif(PIN_no == 2):
        PIN_no = servo2
    elif(PIN_no == 3):
        PIN_no = servo3
        
    GPIO.setup(PIN_no, GPIO.OUT)
    servo = GPIO.PWM(PIN_no, 100)
    
    for i in range(0, cnt):
        servo.start(5)
        time.sleep(2)
        
    servo.stop()
    GPIO.cleanup()

push(motor, quantity)
