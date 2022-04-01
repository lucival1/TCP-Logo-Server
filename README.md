# LOGO Server

For the Architecture I have chosen to use the Strategy Pattern to build the Commands awhile separating the 
Canvas and Cursor to its own Objects.

The App index (_./app_) is where the three object (Canvas, Cursor & CommandManager) are initialized. The isolation 
on those parts make so the Server file have no information about the business logic and also enable the 
separation of concerns for each object. This approach also enables the dependency inversion where the `doAction` 
method relies on the `commandManager` to fetch correct implementation.

The `Canvas` class only know how to deal with canvas details (initialization, drawing and erasing characters). Some 
canvas functions also feature private functions since those are only meant to be accessed by their parent functions. 

The `Cursor` class is concerned with the position of the object and the moving directions. Being that the 
current direction changes or how many steps the cursor is moving in the canvas. The class also features 
access methods to get/set the public cursor attributes.

The `CommandManager` class import and initialize all available commands that have a business logic. Each command is an extension 
of the `CommandStrategy` interface that defines its sub-classes should implement the `doAction()` method.
The reason for the Strategy pattern is do to the similarity of each command having just their behavior 
being different from each other.

To start the server simply type npm install on the terminal and follow with npm start. The Server has an environment 
variable for the PORT. If the user wishes to change from the default Port, it should create a `.env` file and populate 
with desired Port number. A `.env.sample` is also on the directory to show how is should be. 

I have used telnet ([install telnet](https://support.code42.com/Incydr/Agent/Troubleshooting/Test_your_network_connection#Install_Telnet_on_Macintosh)) 
to connect to the server. Once the server start and the TCP connection is made the user can send commands in 
and expect the server to respond promptly.

There are 10 commands that the Server will recognize and the server accepts one at a time:

`steps <n>`: move the cursor n steps in the current direction.

`left <n>`: change the direction to the left.

`right <n>`: change the direction to the right.

`hover, draw, eraser`: set the brush mode.

`coord`: print the current coordinates of the cursor with the format (x,y).

`render`: print the current canvas.

`clear`: erase the current canvas, while keeping the current cursor and direction.

`quit`:closes the current connection.

The commands are case-sensitive so avoid using capitalized letters. If any order commands are issued the server 
will respond with the following message `X command not recognized.`


