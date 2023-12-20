# Got Junkmail?

Cleanup your Gmail using AppScripts.  This handy little tool will
periodically clean up Gmail categories.

If you have built up a lot of email subscriptions then you may 
have a good amount of junk email noise.  Google doesn't make it
easy to bulk delete these emails via the GUI.

Google AppScripts can help.

The goal of this script is to cleanup your personal Gmail using
[Google App Scripts](https://script.google.com/)

It's based on a few pre-existing gists on the topic.

[batch-delete-gmail-emails](https://gist.github.com/gene1wood/0f455239490e5342fa49?permalink_comment_id=3644)

This repository has some additional screenshots and instructions.

This simple script will cleanup approximately 500 emails per hour, iterating through four categories.

The categories are:

- Promotions
- Social
- Updates
- Forums

### Get started

Sign up for [Google App Scripts](https://script.google.com/) workspace.

![Main console](assets/appscripts.png)

Click on New Project once you are signed in through your personal account.

### Copy the script

In the new empty project, populate it with the two files:

```CleanupGmail.gs and appscript.json```

![Files to add](assets/files.png)

The appscript.json sets the scope for oauth.  You will be prompted for enabling
the access to your personal account so that the script can run using your gmail
credentials.

### Setup the schedule

The main constraint is the number of times you can call ```batchDeleteEmail``` in a 24 hour period.

The threshold seems to be [around ~10K](https://stackoverflow.com/questions/10619919/service-invoked-too-many-times-for-one-day-gmail-read).  The timer is set at 1x every hour for deleting a batch of emails.  It's possible to [batch multiple categories](https://stackoverflow.com/questions/21509254/get-gmail-categories)

Navigate to Triggers:

![Triggers](assets/trigger1.png)

Add a new Trigger and select batchEmail to run on an hourly timer.

We sort through the scope of email categories here:

```
  // If there is no currentCategory or its the last category, reset to the first category
  if (!currentCategory || categories.indexOf(currentCategory) === categories.length - 1) {
    currentCategory = categories[0];
  } else {
    // Otherwise, move to the next category in the list
    var currentIndex = categories.indexOf(currentCategory);
    currentCategory = categories[currentIndex + 1];
  }
```

You can modify the variable for categories as needed.

```var categories = ['Promotions', 'Social', 'Updates', 'Forums'];```

Anything more aggressive than batchSize=100 will cause the script to fail within the 24hour timer.  We want this running around the clock, so set the threshold.

```var batchSize = 100;```

![Edit Trigger](assets/edittrigger.png)

### Watch it run and periodically check it

Navigate over to executions to see the execution log.

![Executions](assets/executions.png)
