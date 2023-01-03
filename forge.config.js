module.exports = {
  packagerConfig: {
    icon: "../images/LOGO-256.png",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupExe: "Behemoth Quest ${version}.exe",
        setupIcon: __dirname + "/src/images/LOGO-256.ico",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "Behemoth-Quest",
          name: "BQ-App-Release",
        },
        prerelease: true,
      },
    },
  ],
};
