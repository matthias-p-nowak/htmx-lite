# Purpose

Based on the nice tutorials by [</>htmx](https://htmx.org/), I decided to create an even smaller version for my other projects. Minified it is about 1kbyte but has the functionality i require.

## Which problems it solves

Often, web UI are programmed using a stack of frameworks. Projects with package managers are used to build executable code for the web-browser. These frameworks require server-side API in order to function. Sometimes, several design patters are employed and there is only one approved way to achieve a result. Even updating a single component requires study of programming techniques, intimate knowledge of all the frameworks and awareness of all quirks.

Web-sites should be responsible. The necessary minimum are the pictures and all text segments with their styling in addition to the rules for the layout.
The employed complex javascript frameworks often require downloads equivalent to one or more copies of the computer game Doom - without offering similar functionality.

# Design philosophy

Studying `</>htmx` and the published essays, I came to realise that MVC for a web-application is somewhat wrong. There are 2 models, one that captures the state and stored in a database, the other related to the display of some data. *Javascript* in the web-browser should only control the display and support the controller on the backend that works with the first model.

## Deviation from *</>htmx*

Taking `</>htmx` approach to the extreme, the *javascript* code running on the page does not know which parts need to be updated. Moreover, all submissions are by forms and using the post method. The answer from the server determines which parts (yes, plural) of the DOM have to be modified using plain javascript DOM functions.

## Behavior

The initial page contains one or more forms. New data are processed by a server side controller, which URL is specified in the forms *action* attribute. We set the relevant attribute like "onClick" to the call of the javascript function `hxl_submit_form(event)`. 
This function will *POST* the form data to the controller specified in the *action* attribute. The returned *HTML* document is parsed and based on attributes, the dom-tree is modified.

> **NOTE**: The returned string is loaded into a *div* element, hence, it should be valid *HTML* for that place. For instance, a returned *tr* needs to be place inside a table in order to survive. 

## Class changes

While sending the request, the *event-target* gets the class `requested` switched on, which again gets removed on success. When the request failed, `failed` is added. This is done to ensure immediate user notification.

## Necessary markups

As this is not `</>htmx`, i am not re-using their symbols. The approach here is different, the changes in the DOM-tree are controlled by the backend and only decided after data is submitted. Also, i am not hiding that javascript is driving the changes.

### Client side

For the sending side, the form element and the initiating element need to be annotated with the *action* and the *onXX* attribute as described above. Here, it is clear that a javascript function is called in which situations. 

## Server side

The server considers the request and in response sends back a sequence of html element nodes (like div, span, etc). Elements like `tr` and similar need to be wrapped inside appropriate parent nodes. 

The first step upon reception is to add it as *innerHTML* to a *div* node. If the nodes are not appropriate, the tags go missing. 

Then, all nodes with the attribute `x-action` are considered, and they go into the places as indicated or they remove a dom element.

attribute | meaning | possible values
--- | --- | ---
id | element id as usual |
x-action | what to do with this element | replace, remove, append ...
x-id | the related element id |

Implemented so far:
~~~JS
switch (attr) {
    case 'after':
        otherId.after(n);
        break;
    case 'append':
        otherId.append(n);
        break;
    case 'before':
        otherId.before(n);
        break;
    case 'prepend':
        otherId.prepend(n);
        break;
    case 'remove':
        sameId.remove();
        break;
    case 'replace':
        sameId.replaceWith(n);
        break;
    default:
        console.log('had no action defined for ', n);
}
~~~