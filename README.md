# MSAL Browser React
A simple demo showing how the new [msal2.0 library](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser) can be used in React using a context and hook.

## Running
#### Pre-requisites
To run this you need:
- An Azure AD B2C directory.
- An app registration with http://localhost:3000 enabled as a single page application redirect uri.
- A sign up / sign in policy which returns the User's Object Id as an application claim.
- A second app registration with a published scope.
- Permission granted to your client app for the published scopes.

#### Configuration
Open up .env and populate the parameters with the values from your directory / app registrations.

#### Start it
Once you have the configuration set, you can start it by opening a terminal in the project root and running :
- `yarn install`
- `yarn start`