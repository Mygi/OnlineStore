AG [8:46 PM]
Yeah - I was wondering if the User could create an extra level of nesting.

Nicole Jay [8:47 PM]
yeah so if they reach the end of pre defined, there would be a "add custom" option, and that would add a new custom category with the last category as its parent, and in the DB it'll have a "user_defined" flag set to true.. so we can stay on top of those added by users
we may want to put a limit on how many levels of custom categories though, we dont want them to go nuts

AG [8:48 PM]
Those categories are global right?


## Excerpt from Wednesday April 4th 2018
Nicole Jay [8:48 PM]
yeah
so we dont get duplicates
one person adds a category, and the second person needs it, it will already be available and they wont have to add it

AG [8:49 PM]
So if they make a typo and don’t delete - everyone gets it?

Nicole Jay [8:50 PM]
the shop moderators will be aware when things are added
perhaps at first we dont allow custom, and any new categories need to be requested
because shop moderators wont have access at the same time as sellers will

AG [8:50 PM]
Yeah - I was thinking of leaving those functions closed for now.

Nicole Jay [8:51 PM]
yep all good

AG [8:53 PM]
I was also weary of the nested category delete function - I wasn’t sure how intuitive it is. It may have been better if the tag created when you add a category has a parent->child label instead of parent label and child label.

Nicole Jay [8:53 PM]
im not sure what you mean

AG [8:53 PM]
Best to be seen first I think.

Nicole Jay [8:55 PM]
Im terms of saving/updating.. there will only be a POST endpoint for categories, not put or delete. Each POST requests expects all categories levels selected, and will detach all product->categories and re-add them based ont he data sent through, which is why i think there needs to be a "save" button, so all records can be sent at once.. an array of categoryIDs (edited)

AG [8:56 PM]
Yep - I currently send an array of categories (can be IDs as well). Can be flattened or include subcategories as needed. (edited)

Nicole Jay [8:59 PM]
it'll just need to be categoryIDs.. the post endpoint doesnt need to know anything else about the categories or the nesting because the database already knows this. For eg if they select parent-sub-sub.. that turns out to be ids [4,123,270], the code attaches those 3 ids to the product record and thats all that needs to happen. The request is validated to make sure the IDs exist in the DB, and the data object is an array, etc

AG [9:00 PM]
OK. That works.


Nicole Jay [9:01 PM]
so if a user wants to remove the third category (270) we'd allow a delete front end function for this, which really just regenerates the array to only [4,123] and then re-posts to the POST endpoint

AG [9:02 PM]
More like a sync function then.

Nicole Jay [9:02 PM]
pretty much