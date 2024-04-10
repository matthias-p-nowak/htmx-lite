# Purpose

Based on the nice tutorials by [</>htmx](https://htmx.org/), I decided to create an even smaller version for my other projects. Minified it is about 1kbyte but has the functionality i require.

# Design philosophy

Taking `</>htmx` approach to the extreme, the code on the page does not know which parts need to be updated. Moreover, all submissions are by forms and using the post method. The answer from the server determines which parts (yes, plural) of the DOM have to be modified using plain javascript DOM functions.

## Inner workings

The function 'hxl_submit_form' takes 2 arguments, the first one is the *server page* while the second one is the *event* variable, which contains the target. This function takes the *closest* form and submits the data to the specified page. On success, the function `hxl_process_body` updates the DOM. 

### Class changes

The *target* gets the class `requested` switched on, which again gets removed on success. When the request failed, `failed` is added.

# Necessary markup

Just a tiny bit is necessary.

## Client side
The appropriate element in the form gets the appropriate event function added like shown in `index.html`. 

## Server side
The server considers the request and in response sends back a sequence of html element nodes (like div, span, etc). They have one or more attributes

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