# calls
Unicorn Systems' homework assignment

Build application for creating TODO list of calls
You should create simple application to create TODO list of today's calls. Application consists of just one page and there is no need for some middleware or backend.
You can use any Javascript frameworks and libraries (MVC frameworks prefered) you prefer. Application stores all the data to local storage. Graphical design is up to the programmer, also some CSS framework can be used (Javascript quality is the most important).
Ideally you should also write documentation and some tests for the application.
For application behavior description see description and wireframe:

### Add call
Section to add new record of call. It consists of these inputs:
* name ­validate for max. of 30 characters
* phone number ­see phone number validation below
* time ­just time, in mm:ss format
Phone number validation ­- each phone number should start with '+' or '00' string followed by digits or characters '(', ')', '­'. You should ignore all whitespaces when storing the record and convert '+' to '00' (there should be just one format to display phone number). Characters '(',')' and '­' can be used just once and should be just on position 2 to 8 in the string.
Example of valid phone numbers:
* +(420) 111 222 333
* +(420)­111222333
* +420111222333
* 00420111222333
Stored and display format of phone number -­ 00XXX XXX XXX
Store all data to local storage.

### List of calls
Display list of calls stored by user as shown in wireframe.
Header consists of name (sortable), phone number, time (sortable).
Each row consists of these columns:
* name
* phone number
* time
* delete action (deletes this record from the storage)
* checkbox (disabled; checked if the time of call < current time)
Default sort of list is by time ASC. User can sort by name and time.
Below the table are 3 buttons
* all -­ display all records in list
* next ­- display just calls in future
* finished -­ display just calls in past

### Next call
This section should show to the user the next call of the day.
In the ordered list of calls (by time ASC) find first record where time of call > current time and display that record.