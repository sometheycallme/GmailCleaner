function batchDeletePromotionEmails() {
  var batchSize = 100
  var promotion_threads = GmailApp.search('category:promotions older_than:10d')
  console.log('promotions batch size is: ' + promotion_threads.length);
  console.log('Found: ' + promotion_threads.length + ' Emails');
  for (j = 0; j < promotion_threads.length; j+=batchSize) {
    console.log('removing promotion emails batch: ' + j);
    GmailApp.moveThreadsToTrash(promotion_threads.slice(j, j+batchSize));
  }
}
