# Security
The Finders Keepers Market place client side application is secured
via Javascript web tokens (JWTs) which are emitted from the server side API 
upon successful authentication.

The JWT is signed and hashed with the APIs private key and is used to secure each subsequent 
service request via inclusion of this token in the HTTP header.

Any spoofing of the JWT would only permit server side access should one be able to guess 
the APIs private key for effective re-hashing with fake data.

The client application is further secured using authentication guards on the CanLoad attribute
for page routes and their respective PageComponents. Using the lazy loading policy of Angular,
this ensures that javascript for authenticated users are only loaded into the browser when 
a successful authentication has been achieved.  

You could potentially get around angular's canLoad mechanism and access the javascript for an 
authenticaed user. You could only do this by inserting a fake token into client side code but 
this will be made more difficult by the token being stored in an encrypted and secured cookie. 

As the API will also block service data from loading, it is not possible to get the User Role data
required for bipassing the RoleGuard's CanAccess function. 

Noentheless, there is an important distinction as to the limits of the CanAccess guard, one cannot assume the 
client code for authenticated users is secured - and thus code must be written defensively with this
awareness taken into consideration.
NB: Production API requests are served via https, as such the token is encrypted in the HTTP headers and thus not available 
for decoding there.
NB2: JWT is stored in an https-only cookie and thus encrypted on client storage as well.

Where code must be secured, the final option would be to serve that code behind a server side authenticated
firewall. To support this solution, modules are separated for front-end and back-end code to allow Access based
partitioning.

User authentication is tested with a mock backend and it is important that the mock backend is not delivered with
any client facing code. Thus the environment.ts, package.json and configuration files are used to ensure the mocking API is not 
shipped with production code.

## Json Web Tokens (JWT)
A full description of jwt tokens is available here:
[JWT](https://jwt.io/)

The API sets the jwt (token) in the HTTP header: 'Authorisation Bearer'. This header is sent on every subsequent 
API web request. The angular JWT library by auth0 (@auth0/angular-jwt) calls upon the the JWTHelperService to
intercept and inject that header on every httpCLient request. The service is also used to decode JWT (tokens) and 
check their expiry dates. Sample usage:

`import { JwtHelperService } from '@auth0/angular-jwt';`
`constructor( private jwtHelper: JwtHelperService ){}`
`this.jwtHelper.isTokenExpired(token, <secondsAfterNow>);`

### Karma Testing dependency
`import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';`
```beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })]}
}
```

## Storage of Authenticated user data
Authenticated User data is stored in a `secure + httpsOnly` cookie. This includes the User Object, 
their roles and their profile data. 

In the case where cookies are not supported on the browser, a throw-back to Local Storage is supported.
An alert is sent to the User to notify them of this vulnerability as LocalStorage can potentially be read by
Cross site scripts. A mechanism for storing user data in encrypted form is proposed to circumvent a third party
script attempting generic attacks on code; at this stage it is not supported until statistics on users that
require localStorage are confirmed.

NB: In this scenario, a user could reverse Engineer the client side code to detect the encryption mechanism and then decode 
local storage. However this attack must be targeted by a cross site script which knows what to look for. This requires the
script to:
* Reverse engineer code that has been minified and uglified to discover paramter names.
* Check that local storage is used
* Find the encryption mechanism for the localStorage (or attempt all common ones)
* Know which data it is looking for (or send all)

This vulnerability is further secured by the partitioning behind a `canLoad` security guard in angular. Thus further reducing attack exposure.

Should locaStorage still by an issue, a final security mechanism would be to serve the client side code from the same domain as 
the API and reject all XSS script requests. This can be used for the shopping cart checkout as well.
NB: At this stage not implemented

## AuthUser Model
The authUser model (post login response) returns the following model:
```
{
    "data": {
        "userID": 1,
        "emailAddress": "test@test.com",
        "firstName": "Joe",
        "lastName": "Bloggs",
        "isVerified": 1,
        "createdDate": "2018-03-09 05:35:23"
    }
}
```

## Role Model
A user can have multiple roles. The role API is queried `/api/role/userId/{userId}` and returns the following model:
```
"data": [
        {
            "roleID": 1,
            "slug": "super-admin",
            "label": "Super Admin",
            "description": "Access all areas",
            "perms": {
                "data": []
            }
        }
	]
```
At this stage Access control list is split between:
* What routes/components can be loaded for a User's role
* Whic hAPI end-point are permitted by the user

The permissions model offers further granularity of User Access. In this security model, client side code does not support this
granularity in order to prevent issues with potential real-time conflicts in permissions. As per example:

```
    Role1.allowService(<ServiceName>) => true;
    Role2.allowService(<ServiceName>) => false;
```
In the case where role data can be altered dynamically in a database - a bug can be introduced that is not caught at development time.
To further prevent this, the ACL for the role data is stored in the routes file itself using the following data:
`data: {expectedRoles: ['admin', 'seller', 'buyer'] }`

NB: This could be modified to change the ACL status. Thus granular ACL at the API level is essential.
NB2: Calling the API consistently for Role/Permission data also introduces the challenge of invalidating a long-standing cache. In the case of a 
hot fix, changing ACL permissions on the database and hoping the client side code will follow immediately becomes unpredictable and difficult to
verify.

## Guards and Routing and ACL
As discussed, Access control is limited by routes and the rendering of routed links. This is secured by Angular routing guards and data on the
angular routes file itself. This is onvoked with the following code:

```this.authService.checkRole( route.data.expectedRoles )```

The authService will check for Allow type permissions. If the user has any of the required roles they will be allowed through. 
This means that if a user has two roles: "Seller and Buyer", there is no option to forbid Buyers from some route if they are
also sellers where sellers are allowed access. Such a change could be allowed if necessary by changes to the route data and authService:
``` data{ allowedRoles: ['seller'], forbidRoles: ['Buyer'], precedence: ['forbid'] }```
```
let allow = this.authService.checkRole( route.data.allowedRoles )
let forbid = this.authService.checkForbiddenRole( route.data.forbiddenRoles )
route.data.precedence == 'forbid' return (!forbid && allow) : return allow';
```
## User Model
The user model stores profile data for an authenticated user... 
In progress: data to come.

## Towards A provider model
In the case where an authentication regime is changed. A move to OAuth or built-in AWS authentication would be such examples; a provider model
could be injected using angular's dependency injection `{provide: AuthService, useClass: Provider}`.

In this case we would attempt to bundle the authentication contract logic into the AuthService Interface whilst still reusing role/auth guards and 
user Data models. This is identified as a piece of work for the future as vulnerabilities in this approach are yet to be considered. In the meantime
the AuthService will implment the iAuthService interface.

## Mocking Strategy
Mocking of the the API allows for decoupled development between the client and server side code. In this case, angular's largely developmental
[angular-in-memory-web-api](https://github.com/angular/in-memory-web-api) is used as a temporary data store with seeded data for each model. 
It is an all-in-one endpoint for all services which means data/service matching may become hard to manage as the application grows. Currently it returns
AuthUser with generated JWTs using the JWT.io's generator for a given username and password.

There is currently an override for handling postRequests on authUser as the Response is different to the Request data type and certain values need to be injected. It is intended ot be compatible with the auth0's JWT library so that tokens can be consumed and reused on subsequent service requests.

Further work should be done to test that the JWT is proided for subsequent requests to match the server side environment.ß 