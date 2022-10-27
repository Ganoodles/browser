from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import tomllib
import os

from .functions.cluster import clusterJson
from .events.watch import watchDir 

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


with open("config.toml", "rb") as f:
    config = tomllib.load(f)

thumbnailFolder = os.path.dirname(config["path"]) + "/thumbnails"

watchDir(thumbnailFolder, config["path"], 25).run()


@app.get("/")
async def read_root():
    # success thing
    return {"response": clusterJson(config)}
