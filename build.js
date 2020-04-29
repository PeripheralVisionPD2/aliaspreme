"use strict"

const builder = require("electron-builder")
const Platform = builder.Platform

// Promise is returned
builder.build({
  targets: Platform.WINDOWS.createTarget(),
  config: {
    productName: "Dome AIO",
    target: "nsis",
    buildDependenciesFromSource: true,
    buildVersion: "0.3.0",
    asar: true,
    extraFiles: [
        "helper.json",
        "tasks.json",
        "proxies.txt",
        "restock.txt",
        "delay.txt"
      ],

  }
})
  .then(() => {
    console.log('HMM')
  })
  .catch((error) => {
    console.log(error)
  })