# Local Storage

## Using Providers and Dependency Injection

 Arguably we could do

 `SecureStorageProvider extends StorageProvider Implements SecuredProvider`

Better design, But then the interface is not usable and we can not extend two classes.
Which means we need th @Inject mechanism again.




 the problem with this design is that mocking support in test cases
 is limited. But we need to decide at run-time what support we have
 for cookies/etc.
 Alternatively - we could use environment to decide which provider to
 use. How should we mock?

 1. We want to be able to select which storage provider to use for each service
 2. We need to be able to know if a Provider is NotSupported at runtime
 3. That could mean supplying an object to the factory like: {primaryProvider: ,backupProvider:  }
 4. Alternatively conditional marker in the module file like {provider: , useClass: supported ? provider1: provider2}
 5. This adds flexibility to do {provider: , useClass: environment.test ? provider1: provider2}
 6. The factory is only needed to inject specific values from other services.

 This leads to token based injection across the board but we may want to be more specific
 Like service.forRoot(storageProvider)
 Possible for a component!
 Better still is just to use different tags - {provide: 'secureProvider', useClass: allowCookies ? CookieProvider : LocalProvider}

 An interface for secured stroage providers to impplement
  Why the interface and the abstract base class?
  Partly because an interface is the classic contract
  for the factory design pattern. The fact that is is not
  usable as an object in Typescript and thus not available
  in Angular's dependency injection limits its capability but
  it permists two form of dsign by contract should it be needed.
 
  There is an argument to be made that SecuredStorageService Provider
  should extend StorageProvider as opposed to having the provider injected.
 
  There is also the argument that the Auth Service should do the bulk of
  this work and let the factory handle the storage provider
 
  What do we gain from this pattern?
  Considering we have to inject a secured storage provider intot the Auth Service
  We haven't achieved a standalone provider.
 
  Design principle: Less is more (is slightly broken)
  We have added bulk here that may not add value
 
  Design Principle: Separation of concerns
  Actually we are now vested in the AuthModel with our Storage provider.
  But we do avoid the circular dependency with tbe JWT service
  Also getAuthToken is not something we want to expose in the AuthProvider
 
  Design Principle: What do we gain in testability?
  Layers of Abstraction I guess.
  Auth Service Concerns itself with Authentication but not storage.
  Auth Service can therefore concern itself with Login/Logout/ has Access problems
  which can be swapped out.
 
  Storage Provider isn't a bad swap out design pattern either. I mean consider an
  Http Storage Provider with the same contract. You could choose Local vs Remote storage
  relative to a cache expiry and pop that in a factory. In which case the storageProvider
  should be stored with the Auth Service
 
  NB: Roles are separeted into methods as they may require separate requests/storage
  NB2: The better option might be to extend BaseStorageProvider But Implement SecuredStorageProvider.
  NB3: The problem there would be the Multiple Inheritance issue. You now have to write a class
  for Cookie + Secured and Local + Secured.
 
  Another question: Where should the Observable/Subscription be handled?