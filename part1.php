<?php
error_log(print_r($_POST,true));
sleep(1);
// http_response_code(500);
// exit(1);
?>
<div x-action="replace" id="top">yellow</div>
<div x-action="append" id="c1" x-id="content">this gets appended</div>
<div x-action="before" id="c2" x-id="c1">this gets inserted before the appended</div>
<table><tr id="tab1" x-action="replace"><td>Replaced</td></tr></table>
<div><table> <tr id="tab2" x-action="remove"><th>X</th></tr></table></div>


