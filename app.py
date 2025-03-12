from flask import Flask

app = None

def start():
    app = Flask(__name__)
    debug = True
    
    
    return app
    
app = start()

if __name__ == '__main__':
    app.run()