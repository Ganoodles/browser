#### THIS PROJECT IS A WIP, DO NOT TRY TO USE IT FOR PRODUCTION YET, SERIOUSLY!
# What is this:
**What:** _This is a side project I'm working on that intends to be a self-hostable option to serve a specified folder index with a web interface._ With features such as editing and viewing inside the browser, providing a direct link to files served through HTTP, _(Maybe open API access too)_, and tons of other features. This project is oriented towards speed and being lighter than all other options currently available while still maintaining an impressive UI design and smooth feel. 

**Why:** Simply because when I perusing for something similar to host on my own, I noticed a complete lack in features for what I was looking for in what is currently available, alongside that a massive lack in visually appealing ui. So this projects hopes to fill that gap.

**How**: Currently this project is using a Python [FastAPI](https://fastapi.tiangolo.com/) rest server as the backend, the frontend is built on [Next.JS](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/) and [Tailwind CSS](https://tailwindcss.com/). 

_Have an idea which you think would be cool and don't wanna implement it yourself?:_\
Contact me on discord: **_Ganoodles#4080_**\
Or email me: __[contact@somedamndomain.lol](mailto:contact@somedamndomain.lol)__\
(this is just a temporary email, will update later)

**Estimated Release Date?:** No clue

**Similar Projects**
- https://github.com/filebrowser/filebrowser
- https://github.com/mickael-kerjean/filestash
- https://github.com/misterunknown/ifm
- https://github.com/silverwind/droppy (Archived)
- https://github.com/lrsjng/h5ai


------
# Quick how to use:
 AGAIN, do not use this yet! Its still very early on in production! 
### Prerequisites
- [Install python](https://www.python.org/downloads/), minimum version: 3.11
- Install python requirements:
    ```shell
    pip3 install -r requirements.txt
    ```

- Install [node.js and npm](https://nodejs.org/en/download/)
- Install node.js requirements: 
    ``npm install``

### How to run:
#### Start Automatically:
Simply run, ``start.bat`` stop with ctrl+break, or incase of linux run ``sh start.sh`` _requires: [gnu-parallel](https://www.gnu.org/software/parallel/)_

#### Or Start Manually:
- In one terminal instance run the following line to start the **FastAPI Python Rest Server**:
    ```shell
    uvicorn backend.main:app
    ```
- In another terminal instance run the following line to start the frontend **Next.JS** server:
    ```shell
    npm run start
    ```
    _Or if you're working on a fork/contributing, replace with the following:_\
    ``uvicorn backend.main:app --reload`` _and_ ``npm run dev``


----

### TODO:
- [ ] Clean up frontend
- [ ] Make resizable file tree
- [ ] Add file tree
- [ ] Find better gallery icons
- [ ] Add file path browser functional
- [ ] Add file uploading
  - [ ] Upload through url? (probably not)
  - [ ] Add drag and drop support
- [ ] Add folder uploading (maybe)
- [ ] Add built in text editor
  - [ ] Vim support?
- [ ] Add optional password authentication
- [ ] Add optional IP whitelist
- [ ] Add video, audio, image viewing lightbox
- [ ] Add file renaming
- [ ] Create file properties button
- [ ] Maybe file/folder permissions maybe
- [ ] Add search
- [ ] Mobile Version
- [ ] Add customization
- [ ] Full screen and simple view
- [ ] Setup keybinds
- [ ] Side by side windows?
- [ ] Add option to download directories as zips
- [ ] Setup docker image
- [ ] Create better start script
- [ ] Switch to typescript

