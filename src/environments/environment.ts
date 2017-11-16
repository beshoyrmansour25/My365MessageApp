// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyABU7qUucpl9EDLdGhpNucjN5q0FW22okM',
    authDomain: 'my365msg.firebaseapp.com',
    databaseURL: 'https://my365msg.firebaseio.com',
    projectId: 'my365msg',
    storageBucket: '',
    messagingSenderId: '946068469705'
  }
};
