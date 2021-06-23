import csv
import yaml
import os

#----
#Name of the path to the branches files
branches_folder_path = "../../_branches"

#Name of the file made with the twitter_export script
file_twitter = 'twitter_export.csv'
#Which columns of twitter_export contain the screen_name and the name
column_screen_name = 1
column_name = 2

file_export_name = 'compareTwitterGlobal_result.csv'

#----

#Init the final results list
results=[]

# A result is defined by these properties:
# name : a generic name, either the branch name or twitter name
# global_file : if the result has been acquired from a branche file, it name is here
# tw_global : if the result has been acquired from a branche file and it contains a twitter account data, it is here
# twitter : data extracted from the list of exported twitter accounts
# analysis : checks if the data is redundant between the branche file and the twitter export
# suggestions : list of the exported twitter accounts that are not registered in an existing branche file but their name contain this branch's name
# comment : suggestion to clean the data of the branche file
class result:
    def __init__(self, name, global_file="", tw_global="", twitter="", analysis="", suggestions="", comment=""):
        self.name = name
        self.global_file = global_file
        self.tw_global = tw_global
        self.twitter = twitter
        self.analysis = analysis
        self.suggestions = suggestions
        self.comment = comment

    def __str__(self):
        return self.name+" - "+ self.twitter+" - "+self.tw_global+" - "+self.analysis+" - "+self.comment+" - "+self.suggestions


#Browse the branches folder
for root,dirs,files in os.walk(branches_folder_path):
    for file_name in files:
            #Checks if each file is a md or yaml file
        if file_name.endswith((".md", ".yaml")):
                    #Reads each branche file
                    with open(branches_folder_path+"/"+file_name) as reb_file:
                        # Browse the documents in the branche file
                        for doc in yaml.load_all(reb_file, Loader=yaml.FullLoader):
                            # Gets the twitter account name
                            try:
                                # Create a result object with the file name
                                branche = result(doc['name'], global_file=file_name , analysis="none")
                                results.append(branche)

                                #Extract the twitter sreenname
                                twitter_link = doc['links']['twitter']
                                #Removes the URL prefix to get the screenname
                                twitter_name_position = twitter_link.find("com/")+4
                                twitter_name = twitter_link[twitter_name_position:]

                                if ("@" in twitter_name):
                                    branche.comment += "prefix to remove, current data is : "+twitter_link +" - "
                                    twitter_name = twitter_name[twitter_name.find("@")+1:]

                                #Removes the URL suffixes
                                if ("?" in twitter_name):
                                    branche.comment += "suffix to remove, current data is : "+twitter_link +" - "
                                    twitter_name = twitter_name[:twitter_name.find("?")]

                                if ("/" in twitter_name):
                                    branche.comment += "suffix to remove, current data is : "+twitter_link +" - "
                                    twitter_name = twitter_name[:twitter_name.find("/")]

                                # Saves 
                                branche.tw_global = twitter_name
                                branche.analysis = "global_only"
                                
                                
                                # Stops at the first document of the file
                                break
                            # If can't find the twitter data from the file
                            except (KeyError, TypeError, AttributeError):
                                pass



#Read the twitter_export file
with open(file_twitter, newline='') as csvfile:
    csvread = csv.reader(csvfile, delimiter=',', quotechar='"')
    #Ignore the header
    next(csvread)
    #Read each twitter account of the csv
    for row in csvread:
        #Get the name of the account
        twitter_screen_name = row[column_screen_name]
        twitter_name = row[column_name]

        #Get the branches with the same twitter account_name
        results_same_tw = [r for r in results if r.tw_global.lower() == twitter_screen_name.lower()]

        #For each branche with the same twitter account_name, fuse the data
        for branche in results_same_tw :
            branche.twitter = twitter_screen_name
            branche.analysis = "found_both"

        #If the account_name isn't registered in any branche,
        if len(results_same_tw)==0:
            #Get the results based on a branche file
            res_branches_files = [r for r in results if r.analysis != "twitter_only"]
            #Search the branches files containing a part of the account_name
            for suggestion_branch in [r for r in res_branches_files if r.name.lower() in twitter_name.lower()]:
                #Add the current twitter account as a suggestion to the branche file
                suggestion_branch.suggestions += twitter_screen_name+","

            #Create a new branche result
            branche = result(twitter_name, twitter=twitter_screen_name, analysis="twitter_only")
            results.append(branche)

            

# Sorts the result by "analysis", then by "tw_global" and "twitter"
results.sort(key=lambda x: (x.analysis, x.tw_global.lower(), x.twitter.lower()))

#Exports the result
with open(file_export_name, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    #Header of the document : name of the columns
    writer.writerow(["name", "global_file", "tw_global", "twitter", "analysis","suggestions", "comment"])

    #For each result, add a line with the collected data 
    for branche_res in results:
        writer.writerow([branche_res.name, branche_res.global_file, branche_res.tw_global, branche_res.twitter, branche_res.analysis, branche_res.suggestions, branche_res.comment])
