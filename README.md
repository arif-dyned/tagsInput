# tagsInput
Plugins for tags input which allows duplicates value

How to use :

     1. Initial tagInput
         example :
         $('input[name=ex]').inputTags({
           setValue: ["1","2","2"], // for set value
         })
         
     2. get value
       example :
       $('#ex').val(); // example output 1,2,2
