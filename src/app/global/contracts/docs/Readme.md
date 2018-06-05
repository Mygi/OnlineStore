## Using json2Typescript on derived interfaces

### Debate
   So JSON Property doesn't like interfaces!! 
   Which is fair enough becuase we can't dynamically invoke the class this 
   way - which means our design is wrong - or else the approach is.
   We want a loosely coupled reference to a full blown image - that
   way the Image Handler can have a smuch as it wants in the model so 
   long as the Product Model can satify its requirements - namely display
   and link an image - it doesn't necessarily care about file size
   or meta data.
   
   Obviously option 1 is to use abstract classes - which might also work 
   better with a service. But - how effective will it to pass the abstract class
   I wonder? It begs the question of why/when we should use interfaces in Typescript
   as we have run into this problem a few times.
   
   A compile time error is possibly the best argument - An abstract class may allow 
   us to leave methods as abstract and not implement them - which is a potential problem
   But not such a big deal.
  
   Alternatively we could support the costruction of a contract class via an interface as in:
   `ConcreteClass.contructor(options: SomeInterface)`
   Which is nice in one way - but possibly meaningless
   I mean you are creating a lot of files for minimal benefit.
  
   We just want to be able to avoid strict dependency between modules - we want a concrete
   dependnecy to describe the contract and a dependencyInjection to meet that contract -
   Meaning we can alternate how we meet that contract in different modules.
   Otherwise - you aren't getting much improvement from this design - your concerns are not
   truly separated.
  
   Bear in mind that the rationale behind this was mainly for improved testing (which was also a code
   simplicity/quality question). So we could replace the contract with a mock in a test
   Class and just meet the contract requirements. Place these in a central mocking
   Module and away we go.
  
   Which tells us what exactly? That an abstract class is OK - not great but enough
   to achieve this. We may sacrifice fail-on-compiliation flags.

   ### Final solution
    Go with interfaces in the contract - Do not invoke a type with the json2typescript annotations as in:
    `@JsonProperty('productImage')`
    `productImages: ImageContract;`
    Because the composed type can not guarantee that a model meets the full specification of the full module type. 
    There should be no interdependency. If it needs to invoke json annotations specifically but still fulfil
    the contract, a type can be generated which fulfils the contract as in:
    `ProductTag implements TagContract`
    `@JsonProperty('tag', ProductTag)`
    `tag: TagContract;
    * The contracts should also not have to worry about invoking full types either.

