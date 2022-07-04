# EHN-Empowering-Health-Network

### Overview:

EHN (Empowering Health Network) is a project I developed with international teammates in Tokyo, Japan during a month-long Hacakthon style coding exercise. Our team was tasked with developing an application to help people navigate the COVID-19 pandemic. Therefore the purpose of EHN is to support mental health during COVID isolation by connecting and empowering people through relatable experiences. 

EHN is a blog style social media platform that is catered towards helping individuals navigate their Covid-19 isolation by allowing affected people to post, comment and learn about other experiences. Additionally, some people who suffer from COVID-19 develop a condition called Parosmia, where their taste and smell are altered. Therefore, we also created a Parosmia flavor rating tool (Foomy) that allows users to input and share what foods now taste different to help people affected by Parosmia connect and discover what foods they can and can't eat. 

## Detailed Overview:
#### Personal Contributions 
Within this project I filled the role of Back-end Team leader. As the lead Back-End developer I led two talented Back-End Japanese developers in creating a Rest-ful API as well as SQL database. The responsibilities indcluded leading Back-End discussion meetings, assigning tasks, helping team-mates with bugs or questions, working with the front-end team and product manager to collaboratively determine and implement the structure and features of the REST-ful API. The discussion topics included but were not limited to what API endpoints were to be implemented, security, QA testing and general questions that would help the team produce the best product. These discussions took place in both Japanese and English in order to make sure the team was communicating effectively. Additionally, I helped code and develop the REST-ful API. 

## Back-End 

The back-end of this project consisted of a REST-ful API created with Spring Boot and a locally run SQL database created using mySQL. 

#### The API Controllers and Endpoints are as follows: 
##### Journal Post Controller

1. Create a Journal Post	POST	/journal	
    - User creates a new journal post.
2. Edit a Journal Post PATCH
    - User can edit a pre-existing journal entry that was created by them. 
3. Delete a Journal Post	DELETE	/journal/{journalId}
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
10.	Like a Journal Post 	POST	/journal/like	
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

## Front-end 
