<p align="center">
  <img src="https://raw.githubusercontent.com/steveacalabro/CraftMate/master/icon.png" alt="Sublime's custom image"/>
</p>
# CraftMate

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Web Demo](#web-demo)
- [Devlopment](#devlopment)
  - [Setup](#setup)
  - [Building/starting the app](#buildingstarting-the-app)
  - [Electron](#electron)
- [Recipe Data](#recipe-data)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

CraftMate is a Minecraft crafting tool created for a school project. I've decided to share it so that people may use it if they feel like it. Currently there are a few updates in the pipeline for improvement but if you have any ideas feel free to make a PR and I will review it. 

## Web Demo

If you would like to see a [demo](http://steveacalabro.github.io/CraftMate) or just use the application head over to [http://steveacalabro.github.io/CraftMate](http://steveacalabro.github.io/CraftMate)


## Devlopment

This section covers some information you will need to devlop.

### Setup

Run both `npm install` and `bower install` when you clone the repository.

### Building/starting the app

Run `grunt` for building. This will also start a live reload server so you can test on the fly

### Electron

I have included electron.io which allows the application to deployed to desktops in this project, but I have not speant much time getting it production ready. I was more or less playing around with some new things. If you want more information on it create an issue and I will take a look at it. 

## Recipe Data

The recipe data was obtained using a script that I have created to parse the minecraft wiki. Some of the items there are a little messed up. If you have a better way of getting the recipe data please let me know. I'm not sure how to improve it other than manually going through and fixing the items in the .json file.

Additionally, the current .json does not link the items with an item id. I plan to implement this as part of issue [#2](/../../issues/2)
