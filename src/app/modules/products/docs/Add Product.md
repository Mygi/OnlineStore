# Add products

## Generation of Products from a set of Attributes

### Excerpt from Tuesday April 17th 2018
yep
so the way it works is, we add in our product options (size, colour, etc) and their respective values, and then click "Generate Product Items"
the system will then go ahead and create product options (variants) for each of the possible combinations
so each black bar is a product options, and clicking on it will expand (accordian style) a form for that variant

AG [12:50 PM]
Yep - i’ve just implemented that as the cross product of each array.
But - I’m not sure how that fits back into Nicole’s data model?
As In a Product Item has many Variants?
But the Product Item is a Variant on Product.

Nicole Jay [12:51 PM]
Product item is a product item of product. Product items have variants
I’m not home to generate you a model sorry, will be back this afternoon

AG [12:51 PM]
I’m just looking at the one from the DOC you sent earlier in Slack.

Nicole Jay [12:52 PM]
The terminology is probably just confused

AG [12:52 PM]
A Variant is Like “Black” right?

Nicole Jay [12:52 PM]
No that’s an attribute. A variant is a group of attributes

Luke [12:53 PM]
Small + Black would be a variant right?

Nicole Jay [12:53 PM]
Yep
A variation of a product can include many attributes, like size and colour

AG [12:55 PM]
But we have stock quantity for each Single Product Item. So am I assuming that Attributes are reusable? Like Colors: ‘Black, White’ Blue” can be used on multiple Product Items.

Nicole Jay [12:56 PM]
Sorry I think I just confused it unecesary because I’m typing in a rush, a Product item is essentially a variant, a group of attributes with a bunch of other values like price and stock

AG [12:57 PM]
Yeah - that is how I saw it from Luke’s design -  does that mean the model might have changed since I last looked at it? (edited)

Nicole Jay [12:57 PM]
I’m not sure what you last saw tbh
I would have adapted the model from the mock up I did

AG [12:58 PM]
Alright. I may just continue with the model that achieves the design and see if I need to map when I get the service data.
I think I have an artefact in my model - from a previous E-R design - which I will remove.

Nicole Jay [1:00 PM]
I’ll let you know when I’m back send through examples of the product, it’s endpoints and example models for each

AG [1:00 PM]
Thanks.
@Luke Also what is the cross-hairs icon used for (I’ve got a re-order function using drag’n’drop) but it didn’t make much sense for product items.

Luke [1:05 PM]
Yeah youre probably right, I did initially think people might want to reorder the items... but I can think of a few reasons why that won't work or might not be a good idea or make sense to teh user
I'm happy to drop it off

AG [1:07 PM]
It might matter if the ’seller is always editing the same product Item and want to move further up the list - but I don’t think I have any ordering on my model yet.
But that might be a stretch

Luke [1:07 PM]
yeah maybe we can change it to "pin to top"
or something, i don't know
it's probably just going to confuse most people

AG [1:08 PM]
Thanks. I’ll drop it for now and we can add it again if there is  a use case.

Luke [1:09 PM]
all good, thanks