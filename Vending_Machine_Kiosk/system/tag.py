import os

try:
    hex_data = os.popen('nfc-emulate-forum-tag4').read() #NDEF read command
    message = hex_data.split('\n')[24].split('55')[1]#NDEF에서 원하는 값만 인덱싱
    message = message.replace("  ","").replace("00","") #Remove a space
    message = bytes.fromhex(message).decode('utf-8') #hex to string
    print(message)
except:
    print('error')
