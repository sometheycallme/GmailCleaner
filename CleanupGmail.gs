function batchDeleteEmails() {
  var batchSize = 100;
  var categories = ['Promotions', 'Social', 'Updates', 'Forums'];
  var minimumEmailCount = 100; // Set the min email count threshold here (e.g., 100 emails)
  var currentCategory = PropertiesService.getScriptProperties().getProperty('currentCategory');
  
  // If there is no currentCategory or its the last category, reset to the first category
  if (!currentCategory || categories.indexOf(currentCategory) === categories.length - 1) {
    currentCategory = categories[0];
  } else {
    // Otherwise, move to the next category in the list
    var currentIndex = categories.indexOf(currentCategory);
    currentCategory = categories[currentIndex + 1];
  }
  
  // Update the current category in script properties
  PropertiesService.getScriptProperties().setProperty('currentCategory', currentCategory);

  var category = 'category:' + currentCategory;
  var threads = GmailApp.search(category);

  if (threads.length >= minimumEmailCount) {
    console.log(currentCategory + ' batch size is: ' + threads.length);

    for (var j = 0; j < threads.length; j += batchSize) {
      console.log('Removing ' + currentCategory + ' emails batch: ' + j);
      GmailApp.moveThreadsToTrash(threads.slice(j, j + batchSize));
    }
  } else {
    console.log(currentCategory + ' has fewer than ' + minimumEmailCount + ' emails. Moving to the next category.');
    // Trigger the function to move to the next category
    batchDeleteEmails();
  }
}
