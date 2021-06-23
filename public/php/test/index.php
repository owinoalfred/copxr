<?php
if ($_SERVER['APP_ENV'] === 'production') {
    $mail_to = 'contact@rebellion.global';
} else {
    $mail_to = 'test@illyism.com';
}
print_r($mail_to . "<br>");
print_r($_SERVER['APP_ENV']);
?>