# Gmail Garbage Collection

Cleanup your personal Gmail using a [Google App Scripts](https://script.google.com)Project.

![GMail Garbage Cleaner](assets/GmailGarbageCollection.png)

## About

This handy little tool will leave you with no more than 100 Social, Updates, Promotions, and Forums emails.

If you have built up a lot of email subscriptions, notifications, and other updates and are not periodically
unsubscribing or filtering, then you may have a good amount of junk email.

## Step by Step Guide

### Get started

Sign up for [Google App Scripts](https://script.google.com/) workspace.

![Main console](assets/gc1-newproject.png)

Click on New Project once you are signed in.

### Project Settings

#### Setting 1

Enable Gmail services for the AppScript.

![Gmail](assets/enable_gmail.png) 

#### Setting 2

The Apps Script editor hides manifest files by default in order to protect your Apps Script project settings. Follow these steps to make a hidden project manifest visible in the Apps Script editor:

- Open the script project in the Apps Script editor.
- Click Project Settings settings.
- Select the Show "appsscript.json" manifest file in editor checkbox.

Copy in ```manifest.json```

The appscript.json sets the scope for oauth.  You will be prompted for enabling
the access to your personal account so that the script can run using your gmail
credentials.  Go ahead and setup your account.

#### Setting 3

Edit the script properties and add the ```currentCategory``` property setting the starting point.

![Project Settings](assets/gc2-settings.png)


### Enter Editor mode

In your new project add the script and copy in ```CleanupGmail.gs``` in editor mode.

![Files to add](assets/files.png)

### Setup the schedule

The main constraint is the number of times you can call ```batchDeleteEmail``` in a 24 hour period.

The threshold seems to be [around ~10K](https://stackoverflow.com/questions/10619919/service-invoked-too-many-times-for-one-day-gmail-read).  The timer is set at 1x every hour for deleting a batch of emails.
Navigate to Triggers:

![Triggers](assets/trigger1.png)

Add a new Trigger and select ```batchDeleteEmail``` to run on an hourly timer.  The categories are rotated through in the script here:

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

You can modify the variable for different categories as needed.

```var categories = ['Promotions', 'Social', 'Updates', 'Forums'];```

Important: Anything more aggressive than batchSize=100 will cause the script to fail within a 24hour window.

```var batchSize = 100;```

### Edit the trigger

Add a trigger for ```batchDeleteEmail``` to run hourly under triggers and save it.

![Edit Trigger](assets/edittrigger1.png)
![Edit Trigger](assets/edittrigger2.png)

### Watch it run and periodically check it

Navigate over to executions to see the execution log.

![Executions](assets/executions.png)

If all categories are below the 100 email threshold then stop processing.

![Threshold](assets/threshold.png)
