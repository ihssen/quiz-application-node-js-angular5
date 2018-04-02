// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDM-S8LXU-Ri27RqzGjVa-uElOEqZ_mbsY",
    authDomain: "quizzes-cbed7.firebaseapp.com",
    databaseURL: "https://quizzes-cbed7.firebaseio.com",
    projectId: "quizzes-cbed7",
    storageBucket: "quizzes-cbed7.appspot.com",
    messagingSenderId: "809356575960"
  }
};
