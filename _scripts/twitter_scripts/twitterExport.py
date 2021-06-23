import csv
import pickle
import tweepy

# Name of the exported file
file_export_name = 'twitter_export.csv'

# Define the account ID of which one we want to extract the "friends" ("friends" = subscriptions)
# How to get an account id : http://gettwitterid.com/?user_name=XrCollect&submit=GET+USER+ID
me_id = "1122125845123014658"

# Set up the API, you must get tokens here : https://developer.twitter.com/en/apps
# Use "Create an app", then go to the "Keys and Tokens" tab

# Here paste the "Consumer API keys" fields
auth = tweepy.OAuthHandler("**", "**")

#Here paste the "Access tokens" fields
auth.set_access_token("**","**")
api = tweepy.API(auth)

# Get the account friends (limited up to 5000 friends at a time)
me_friends_id=api.friends_ids(me_id)

# Browse the friends and get the data
friends_info = dict()
for friend_id in me_friends_id:
    # For each friend ID, use the API to get the accound data
    friends_info[friend_id] = api.get_user(friend_id)
    print('.', end= '')

# Save the data in a CSV file
with open(file_export_name, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    writer.writerow(["id", "screen_name", "name", "location", "description","url"])
    
    for friend in friends_info:
        friend_o = friends_info[friend]
        writer.writerow([friend_o.id, friend_o.screen_name, friend_o.name, friend_o.location, friend_o.description, friend_o.url])
