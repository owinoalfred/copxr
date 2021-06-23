<?php

if ($_SERVER['APP_ENV'] !== 'production') {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: content-type');
}

/* Cleaning user inputs */
function clean_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return !empty($data) ? $data : false;
}

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
  $field_name    = clean_input($_POST['cf_name']);
  $field_email   = clean_input($_POST['cf_email']);
  $field_region  = clean_input($_POST['cf_region']);
  $field_message = clean_input($_POST['cf_message']);
  $field_contact = clean_input($_POST['cf_contact']);
} else {
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Invalid request"]);
  exit();
}

if (!$field_email) {
  // ERR
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Email is required"]);
  exit();
}
if (!filter_var($field_email, FILTER_VALIDATE_EMAIL)) {
  // ERR
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Invalid email"]);
  exit();
}

if ($_SERVER['APP_ENV'] === 'production') {
  if ($field_contact === "webmasters") {
    $mail_to = 'globalsite@rebellion.global';
  } else {
    $mail_to = 'contact@rebellion.global';
  }
  $subject = 'Message from a site visitor '.$field_name;
} else {
  // Change this to your own e-mail...
  $mail_to = 'test@illyism.com';
  $subject = 'Sandbox - Message from a site visitor ' . $field_name;
}


$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
$body_message .= 'Region: '.$field_region."\n";
$body_message .= 'Message: '.$field_message;

$headers = 'From: '.$field_email."\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

header('Content-Type: application/json;charset=utf-8');

if ($mail_status) {
  // OK
  echo json_encode(['message' => "Message sent"]);
} else {
  // ERR
  echo json_encode(['error' => "Invalid request"]);
}
