# EHN-Empowering-Health-Network

### Overview:

EHN (Empowering Health Network) is a project I developed with international teammates in Tokyo, Japan during a month-long Hacakthon style coding exercise. Our team was tasked with developing an application to help people navigate the COVID-19 pandemic. Therefore the purpose of EHN is to support mental health during COVID isolation by connecting and empowering people through relatable experiences. 

EHN is a blog style social media platform that is catered towards helping individuals navigate their Covid-19 isolation by allowing affected people to post, comment and learn about other experiences. Additionally, some people who suffer from COVID-19 develop a condition called Parosmia, where their taste and smell are altered. Therefore, we also created a Parosmia flavor rating tool (Foomy) that allows users to input and share what foods now taste different to help people affected by Parosmia connect and discover what foods they can and can't eat. 

When a User registers on the website they are required to input some personal information relevant to COVID-19 while they create a user profile. Once a User is registered, they can create "Journal posts" in a blog style fashion. The User can view other user profiles, like posts, comment on other posts, report posts and view their own posts as well as post likes. Within the "Foomy" Parosmia Food Rating Tool the User can search for foods and rate them based off of their Parosmia experience. The User can also comment on and view the overall rating of foods within this tool. If a User does not register, they are allowed to vie Journal Posts but cannot interact or post. 

EHN also contains Admin user functionality. The Admin can view reported posts and hide them from the public if they deem the posts to be inappropriate. Additionally the Admin can "un-hide" posts to re-display them to the public, dismiss unnecessary reports and view User analytics. 

## Detailed Overview:
#### Personal Contributions 
Within this project I filled the role of Back-end Team leader. As the lead Back-End developer I led two talented Back-End Japanese developers in creating a Rest-ful API as well as SQL database. The responsibilities indcluded leading Back-End discussion meetings, assigning tasks, helping team-mates with bugs or questions, working with the front-end team and product manager to collaboratively determine and implement the structure and features of the REST-ful API. The discussion topics included but were not limited to what API endpoints were to be implemented, security, QA testing and general questions that would help the team produce the best product. These discussions took place in both Japanese and English in order to make sure the team was communicating effectively. Additionally, I helped code and develop the REST-ful API. 

## Back-End 

The back-end of this project consisted of a REST-ful API created with Spring Boot and a locally run SQL database created using mySQL. 
##### Impemented Features 
- Spring boot Security 

#### The API Controllers and Endpoints are as follows: 
##### Journal Post Controller

1. Create a Journal Post POST /journal	
    - User creates a new journal post.
2. Edit a Journal Post PATCH /journal
    - User can edit a pre-existing journal entry that was created by them. 
3. Delete a Journal Post DELETE	/journal/{journalId}
    - User can delete a journal post created by them. 
4. Get a Specific Journal Post	GET	/journal/post?journalId={journalId}&userId={userId}	
    - Retrieves a specific Journal Post through Journal id
5. Display all Journals ordered by specific sort method	GET	/journal/sort?sortKey={sortKey}&userId={userId}	
    - Retrieves a list of all Journals ordered by a specific sort method.
6.	Display all Journals for specific user	GET	/journal/user/{userId}	
    - Retrieves a list of all Journals for a specific user. 
7.	Display all Comments for a specific Journal Post	GET	/journal/comment/{postId}	
    - Retrieves a list of all comments for a specific journal post. 
8.	Comment on a Journal Post	POST	/journal/comment	
    - User can comment on a journal post. 
9.	Get user likes	GET	/journal/like/{userId}	
    - Retrieves a list of Journal Posts that have been liked by the user. 
10.	Like a Journal Post POST /journal/like	
    - User can like a journal post. 
11.	Remove a like from a journal post	POST	/journal/removeLike	
    - User can remove a like from a journal post
12.	Report a Journal Post	POST	/journal/report	
    - User can submit a report for a journal post that appears to be malicious. 
##### Journal Search Controller
13. Search Journal posts 	GET	/journal/search?size={}&page={}&keyword={}&userId={}	
    - Search Journal posts 
14.	Filtering Journal posts	GET	/journal/filterBy?size={}&page={}&filterKey={}&lowerAgeGroup={}&upperAgeGroup={}&lowerDate={}&upperDate={}&lowerRating={}&upperRating={}&userId={}	
    - Filter Journal posts
##### Admin Controller
15.	Hide Journal post	POST	/admin/hide/{id}	
    - Hide the malicious post which is reported by someone
16.	Dismiss Journal Report	POST	/admin/dismissreport/{id}	
    - Dismiss journal reports
17.	Retrieve all Journal Reports	GET	/admin/getAllReports	
    - Retrieve all reported journal posts
18.	Retrieve report list to the journal	GET	/admin/getReports/{journalId}	
    - Retrieve all report to the journal
19. Retrieve hidden journals GET /admin/hidedJournals
    - Retrieves a list of journal posts that are hidden to regular users
21. Get hidden journal GET /admin/hidedJournal/{journalId}	  
    - Retrieves a specific hidden journal 
23. Unhide journal PATCH /admin/unhide/{journalId}
    - Unhides a Journal so that regular users can now view them again 
##### Login Controller
24. Login to Website POST user/login
    - Login to the website
25. Register to the website POST user/register	
    - Register to the website
26.	Update user info POST user/updateInfo/{id}	
    - Update the user information
27. Get User Information GET /user/{id}	
    - Retrieves basic user information through user Id
##### Food Rating Tool (Foomy) Controller 
28. Rate a Food on the FRT	POST /frt/rate	
    - User can rate a food displayed on the FRT
29. Create a comment for an frt	POST /frt/comment	
    - User can comment on a pre-existing food in the FRT
30. Search the frt GET /frt/search?keyword={keyword}	
    - User can search using a keyword to retrieve related food items in the FRT 
31. Display all foods GET /frt	
    - Retrieves a list of all food items on the FRT
32. Display all analytics GET admin/analytics	
    - Retrieves a list containing all analytics
33. Get the food GET /frt/getFood/{foodId}	
34. Get all comments on the food GET /frt/comment/{foodId}	
35. Get rate history of the user GET /frt/rateHistory?userId={userId}&foodId={foodId}	
36. Get all rate history of the user GET /frt/allRateHistory?userId={userId}	

## Front-end 
The Front-end was delevoped by talented developers from Japan, Canada and Peru. These individuals developed the front-end using React.js. 

#### Front-end Dev Specs
- Main Page	
User can see all the Journal Posts that is enabled by the Admin.(Non-Deleted posts)
User can search Journal posts by inputting keywords
User can sort the Journal posts by the number of likes and by date.
User can submit LIKE
User can submit report at pop-up view
Search key: maximum 128 characters
- Login Page	
    - User can input email and password 
    - Can login to the system by clicking submit button 
    - If user provide wrong email and/or password, an error message is shown
    - User can see a link to register new user 
    - email: maximum 256 characters, Regex(******(1 - 64 chars) + "@" + ******(more than 1 chars))
    - Password: 8-32 characters, MUST be used capital, small letter and [0-9]
    - Not Blank
    - email and Password
    - Registration Page	
    - New user can register
    - email: maximum 256 characters, Regex(******(1 - 64 chars) + "@" + ******(more than 1 chars)),
    - userName: maximum 16 characters
    - Password:
    - 8-32 characters, MUST be used capital, small letter and [0-9]
    - deny weak pass (ex. "Password", "12345" and "qwerty")
    - Confirm pass: same as Password
    - Positive Result Date: before the day
    - Not Blank
    - email, (First/Last) Name, Password, Confirm pass and Age Group
 - User My Page	
    - User can see his/her own basic information (password is hidden)
    - User can see his/her past journal that they posted
    - User can see journals that they liked
    - All the information will be switched by tab function
    - User can see there FRT stats
- Edit User Profile Page	
    - User can see his/her own basic information
    - User can edit his/her own basic information
    - email: maximum 256 characters, Regex(******(1 - 64 chars) + "@" + ******(more than 1 chars))
    - userName: maximum 16 characters
    - Password:
    - 8-32 characters, MUST be used capital, small letter and [0-9]
    - deny weak pass (ex. "Password", "12345" and "qwerty")
    - Confirm pass: same as Password
    - Positive Result Date: before the day
    - Not Blank
    - email, userName, Password, Confirm pass and Age Group
- About Page	
    - User can see introduction of the app.
- New Journal Page	
    - User can post new Journal
    - Title: maximum 128 characters
    - Content: maximum 4096 characters
    - Not Blank
    - Title and content
    - NG words in title or contents
- Edit Journal Page	
    - User can edit journals that they have posted
    - Title: maximum 128 characters
    - Content: maximum 4096 characters
    - Not Blank
    - Title and content
    - NG words in title or contents
 - Journal Detail Page	
    - User can see the whole content of the journal
    - User can see the comments
    - Logged in user can submit a comment
    - Logged in user can Like the Journal
    - Logged in user can report the Journal
    - Comment: maximum 1024 characters
    - Report: maximum 256 characters
    - Not Blank
    - Comment and Report
- Admin Main Page	
    - Admin can see Reports that were sent from the Users
    - Admin can see Food Item Request sent from the Users
    - All the information will be switched by tab function
    - The reports will be sorted by the number of the reports received respectively
    - Clickable button
    - Leading to Admin Food Item List Page
    - Leading to Admin new Food Page
    - Leading to Analytics Page
- FRT Food Item Detail Page	
    - User can see basic information of the food
    - User can see the result of the votes that was made
    - Logged in user can vote on the flavor
    - Logged in user can comment to the flavor ratings
    - User can see comments done to the flavor ratings
    - Comment: 1024 characters
    - Not Blank
    - Comment
- Food Item List
    - Display Food Items 
