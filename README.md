## SEPETIN MOBILE APP

### download packages

yarn install

### run the project

yarn start or npx expo start

### ios development emulator build

eas build --profile development-simulator --platform ios

### run the development server

npx expo start --dev-client

### ios build

eas build -p ios

### android build

#### .abb

eas build -p android --profile production

#### .apk

eas build -p android --profile preview
