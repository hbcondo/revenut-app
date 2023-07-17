<div align="center">
  <a href="https://revenut.com/" style="color: black;">
    <img alt="revenut" src="https://github.com/hbcondo/revenut-web/raw/main/assets/Revenut-logo-128x128.png" width="128" height="128">
    <h1>Revenut</h1>
  </a>
</div>

<div align="center">
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />

  <h3 align="center">SaaS Metrics in a Nutshell</h3>
</div>

---
> By Amar Kota - [Hire me](https://amarkota.com/resume)

# Getting started
This app is currently being developed as a [Progressive Web App (PWA) built on Expo](https://docs.expo.dev/guides/progressive-web-apps/). You can run it by performing these steps:

1. Clone this repo locally

2. Generate the PWA code by running this Expo command: ```npx expo export:web```

3. [Expo's export process currently doesn't generate a valid manifest.json file](https://github.com/expo/expo-cli/issues/2441) but there is a valid one along with some assets in the `public` folder. Just copy the contents of that folder to the `web-build` folder created in the previous step

4. [Publish the website](https://docs.expo.dev/distribution/publishing-websites/) locally (use webpack since it exports the service workers correctly): ```npx serve web-build --single```


# More info
Details on Revenut are currently being maintained in this repo: https://github.com/hbcondo/revenut-web
