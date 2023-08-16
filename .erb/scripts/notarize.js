const { notarize } = require('@electron/notarize');
const { build } = require('../../package.json');

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;
  console.log(
    electronPlatformName,
    process.env.CI,
    process.env.CI !== 'true',
    'electronPlatformName'
  );
  // if (electronPlatformName !== 'darwin') {
  //   return;
  // }

  // if (process.env.CI !== 'true') {
  //   console.warn('Skipping notarizing step. Packaging is not running in CI');
  //   return;
  // }

  // if (!('APPLE_ID' in process.env && 'APPLE_ID_PASS' in process.env)) {
  //   console.warn(
  //     'Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set'
  //   );
  //   return;
  // }

  const appName = context.packager.appInfo.productFilename;
  console.log(appOutDir, build.appId, appName);
  await notarize({
    tool: 'notarytool',
    appBundleId: build.appId,
    appPath: `${appOutDir}/${appName}.app`,
    appleId: 'kartik.kalia@nonceblox.com',
    appleIdPassword: 'ilqk-qwky-qvda-orky',
    // appleIdPassword: 'Hrms1234',
    teamId: '3YY3VY8285',
  });
};
// xcrun altool --notarize-app --primary-bundle-id "com.nonceblox.hrmsnonceblox" --username="kartik.kalia@nonceblox.com" --password "@keychain:Developer-alttool" --file ./myapp.pkg
