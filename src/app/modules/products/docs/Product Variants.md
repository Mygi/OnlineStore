# Excerpt from conversation Thursday 19th April 2018

AG [9:37 AM]
Good morning @Nicole Jay

I’m getting to the pointy end of my list - and I’m going to need the API soon.
I have a few things to clean up.

Nicole Jay [9:37 AM]
yep, just in postman now setting up the docs
then i have to set up the pipeline and server
then should be right to go

AG [9:38 AM]
Great!
I think we need to get the product function out pretty soon - because I imagine there will a number of use cases to test out (I’ve been holding off some test cases as a consequence).
For instance - when you generate variants - you create a bunch of product items and store the attributes sets used for generating those product Items.
But I can also delete a specific product item.
So If I come back to edit and add a new set of attributes - I will probably go and regenerate that product item again.
More over - if I delete an attribute - should the product item then get deleted as well?

Nicole Jay [9:41 AM]
yeah, i think maybe instead of delete, it should be disabled, or stock at 0
if its generated in the first place its because it met a condition
the only reason it would no longer apply is if you're out of stock or no longer making that size/colour for example
so perhaps so it doesnt get regenerated, it can be disabled, and down the bottom, or something (edited)

AG [9:43 AM]
So if you drop an attribute - we disable the related product item/s? (edited)

Nicole Jay [9:45 AM]
so there will have to be at least 2 attribute types to be able to use variations.. if they use "Size" and "Colour" they will never be able to drop either of those attributes entirely, only values of those attributes.. so Black, Blue, White / Small, Medium, Large.. they should be able to disable Black/Small if they want
and should be able to remove all of the "smalls".. or all of the "blacks"

AG [9:45 AM]
Ok - so you can’t drop an attribute type once created.

Nicole Jay [9:46 AM]
i think you can if you havent published your prodict
product
you might choose "material" and then decide that you dont wan tthat to be an option

AG [9:46 AM]
Yeah - that publish button becomes quite important now. (edited)

Nicole Jay [9:46 AM]
yeah it does, there will be a lot of validation on that click

AG [9:46 AM]
Probably needs a confirm modal with this information.

Nicole Jay [9:48 AM]
but if youve published, and you've got Colour, Size, Material.. i think after that if you don't want the customer to be able to specify material..  maybe because you're only offering cotton, but a product was added to the cart with "polyester" selected.. then we cant delete that product item's variation, because it has historical data

AG [9:48 AM]
Exactly.

Nicole Jay [9:48 AM]
so it could be archived or disable, just as long as it can be removed from the listing
and then it can just be enabled if it becomes an option again, and then that solves the regeneration issue as well, because it will already exist
i actually havent coded the publish endpoint yet, i think i'll take an overall look at whats required in that step first

AG [9:51 AM]
My plan would be to make the public button visible as soon as you add a Product Name and Description but disable it until the model is valid.
There can be an alert when you attempt to click it.
I’m also debating how much to auto save. Currently everything.

Nicole Jay [9:52 AM]
will you need the back end to validate the model or will you do that in the front end

AG [9:52 AM]
Probably the back end. I’m not sure which of your fields are required yet.

Nicole Jay [9:52 AM]
yeah autosaving only works if we offer versions of the product listing

AG [9:52 AM]
I can validate simple things though.

Nicole Jay [9:52 AM]
i havent incorporated this yet

AG [9:53 AM]
OK.
I feel like we can keep it simple and roll out a beta version.

Nicole Jay [9:53 AM]
autosaving is more important when the OM is in full operation
an dyou dont want to mess with a product thats a live listing

AG [9:53 AM]
Yeah exactly.

Nicole Jay [9:54 AM]
so having versions that are unpublished by default, and the override the live version on completion

AG [9:54 AM]
Versioning can become painful and for the number of times it is an issues, it can likely be achieved with regular database backups.

Nicole Jay [9:54 AM]
but yeah not a must have during the first stage of getting products in

AG [9:55 AM]
If it is a version - there becomes the question of how long we should store a version.

Nicole Jay [9:55 AM]
perhaps a product goes into unpublished mode when editing starts
then you have to worry about reminding the user its unpublished.. in case they go to edit, forget about it, and then dont republish
lots of small things to consider and it all comes down to how a user will modify their listings
they will likely always be small modificatoins
like stock updates, image updates, etc
i dont think attributes will change often
once theyre set up, theyre set up for the most part, etc

AG [9:56 AM]
Attributes use case feels like a case of - ” Oh we now have this in blue”

Nicole Jay [9:57 AM]
yeah, blue can be added
i think if blue is added, only blue + sizes is generated

AG [9:57 AM]
Yeah that’s how I have it.

Nicole Jay [9:57 AM]
great

AG [9:58 AM]
Should we copy details from another product item or just create blank ones?

Nicole Jay [9:58 AM]
copy for sure
especially specs.. they will likely be the same

AG [9:58 AM]
Cool.

Nicole Jay [9:58 AM]
we can alert saying it was copied

AG [9:58 AM]
Ok so what if I create a one product item listing (default) and then go on to add attributes.
What happens to the original?

Nicole Jay [10:00 AM]
interesting, there are two conditions.. whether the product item has historical data, and whether it doesnt.. if it doesnt, it can be deleted and regenerated, but if it does, it will either need to be archived, or just remain default and the attributes are added to it, and the rest of the combinations added in addition
i think they are very small use cases though.. if you have a product listing with one item and no attributes (edited)
its very rare this product will all of a sudden get attributes
only in the case of like Prints and art work where they could offer larger sizes
perhaps if your product changes like that then you need to create a whole new product where you check the "attributes" checkbox when creating the listing
i think we need to encourage users to really think about their products and what kind of listing the product needs

AG [10:03 AM]
Yeah - would be better I think ( likely you can mitigate problems by allowing a copy product function).

Nicole Jay [10:03 AM]
yeah, minus the product item, because we;ll want to generate those  based on the attributes, but everything else could be copied for sure

AG [10:04 AM]
Yeah - and I can’t help but think that things like a change to a print size will incur a change in price/ new picture and so forth. So the product item is a negligible win for the user
Also are we supporting user defined Attributes?

Nicole Jay [10:06 AM]
the DB supports it, the code supports it, but whether we want to offer it as a first round feature im not sure
its an interface concern. if the attribute isnt listed there needs to an option "create custom" and then that will need to provide and input and save to an endpoint, and then the attribute types will need to be refreshed with the new value
im thinking that we've tried to cover the obvious ones, and maybe if theres something we have missed, they can request us to add it
at least in the early stages
because we wont have admin tools to moderate it

AG [10:07 AM]
True.
I like the idea of a different interface for managing Attributes.
The convenience of creating new attributes on-the-fly will be very tempting. (edited)

Nicole Jay [10:08 AM]
an attributes wont be private to users .. if you add one, it will be global
so yeah perhaps down the line a listing cant be published until that new attribute is approved
we will have full time moderators so it wont be a big deal

AG [10:09 AM]
Yeah - when something is global there almost needs to be some control flow. Otherwise, you can just mess with everyone on a bad day.

Nicole Jay [10:10 AM]
yeah and also have blacklisted words as well
i mean, the sellers are curated, not likely to be little shits
but even typos
could make it to public
if theres no moderation

AG [10:11 AM]
Hmmm. So should I spell check some of the public content like “Product Description” or “Shop Description”?
This could also be run as a background service to alert moderators.

Nicole Jay [10:12 AM]
we need to get that squiggly red line underneath spelling errors in input fields