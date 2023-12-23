# Gmail Garbage Collection

Cleanup your personal Gmail using a [Google App Scripts](https://script.google.com).

![GMail Garbage Cleaner](assets/GmailGarbageCollector.png)

## About

This AppScript will leave you with no more than 100 Social, Updates, Promotions, and Forums emails.

If you have a lot of email subscriptions and other updates and you are not periodically
unsubscribing, manually deleting, or filtering then you probably have good amount of junk email.

You may even have to pay to [add storage](https://support.google.com/drive/answer/2375123?hl=en&co=GENIE.Platform%3DDesktop).

## Step by Step Guide

### Get started

Sign up for [Google App Scripts](https://script.google.com/) workspace.

![Main console](assets/gc1-newproject.png)

Click on New Project once you are signed in.

### Project Settings

#### Project Setting 1

Enable Gmail services for the AppScript.

![Gmail](assets/gc0-enablegmail.png) 

#### Project Setting 2

Copy in ```appscript.json``` to set the OAuth scope.

The Apps Script editor hides manifest files by default in order to protect your 
Apps Script project settings. Follow these steps to make a hidden project manifest 
visible in the Apps Script editor:

- Open the script project in the Apps Script editor.
- Click Project Settings settings.
- Select the ```Show appsscript.json`` manifest file in editor checkbox.

You will be prompted to access to your personal account so that the script
can run using your gmail credentials.

![Copy Manifest ](assets/gc2-appsscript.png)

![Consent](assets/gc2-consent.png)

#### Project Setting 3

Edit the script properties and add the ```currentCategory`` property setting a
starting point.

![Project Settings](assets/gc3-settings.png)


### Add the script

Now that the project settings are in place add the script. Enter into editor mode and 
copy in ```CleanupGmail.gs``.

![AddScript](assets/gc4-addscript.png)

### Setup the schedule

Add a new Trigger and select ```batchDeleteEmail`` to run on an hourly timer.

![Edit Trigger](assets/gc5-trigger.png)

![Edit Trigger](assets/gc6-trigger.png)

Important: The Max batchSize is 100.  Anything larger will cause the script to fail within a 24hour window.

``var batchSize = 100``

### Monitor and periodically check

Watch it run and periodically check it.  Navigate over to executions to see the execution log.

![Executions](assets/gc7-executions.png)

If all categories are below the 100 email threshold then stop processing.

![Threshold](assets/gc8-threshold.png)


### Constraints

The maximum batchSize is 100.  ```var batchSize = 100``

The main constraint is the number of times you can call ```batchDeleteEmail`` in a 24 hour period.

Google throttles at [around ~10K daily](https://stackoverflow.com/questions/10619919/service-invoked-too-many-times-for-one-day-gmail-read).
