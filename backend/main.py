from operator import truediv
from typing import Union
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware 
import tomllib
import os
from multiprocessing import Process

from .functions.cluster import clusterJson
from .events.watch import watchDir 

app = FastAPI()

with open("config.toml", "rb") as f:
    config = tomllib.load(f)

origins = [
    "http://localhost:" + str(config["ports"]["web"]),
    "https://localhost" + str(config["ports"]["web"]),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


thumbnailFolder = os.path.dirname(config["path"]) + "/thumbnails"

# start thumbnail watchdog
p = Process(target=watchDir, args=(thumbnailFolder, config["path"], 25))
p.daemon = True
p.start()

@app.get("/api")
async def read_root():
    # success thing
    return {"response": clusterJson(config)}
