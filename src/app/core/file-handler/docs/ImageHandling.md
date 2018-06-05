# Image Handling

## Excerpt from Friday April 13th 2018
Also with the Image Handling - does the Seller have a collection of all their uploaded media somewhere?

Nicole Jay [10:55 AM]
i think that would be on a product basis
they wouldnt need to see an overview of all images across all products because the images will be related to a product only
not sure, i dont think ive seen this on any other platform, its usually product related

AG [10:56 AM]
Yeah - so currently you can switch images to visible or not. You can also delete them. Is that a soft delete?


Nicole Jay [10:57 AM]
yeah deleting is necessary, i think theres a delete icon on the thumbnail of each image, as with visible. and yeah i pondered whether the images should be soft deleted, and currently i have an error returned if the image they're trying to delete is being used by the default product item, and if it isn't, it'll delete completely, as well as deleted from s3 (edited)
i dont think theres any need to keep images stored
we can just alert the user that its a permanent action

AG [10:58 AM]
Ok. So I can do that all from the one ‘delete’ end point?

Nicole Jay [10:58 AM]
yep

AG [10:59 AM]
Cool. That makes it easier.

Nicole Jay [3:35 PM]
@AG are you going to use the same upload widget/component for the shop image upload functionality?
the difference between the two is that a product image is a model with associated data, and a shop image is just a url reference on the shop model, so when uploading the shop image, only the url will be saved with the rest of the shop data, there wont be a shop image ID
so just wanted to flag that when working out how the upload functionality works for the shop settings

AG [3:44 PM]
Same base widget (different settings) but using a modal.
But currently an ImageId and Image Url is in my model - but not essential as I don’t use that ImageId anywhere except save.

Nicole Jay [3:56 PM]
ok cool