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

$output = [];

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
  $operation = $_POST['operation'];
  $name = $_POST['name'];
  $code = $_POST['code'];
  $email = clean_input($_POST['email']);
  $publiciseEmail = clean_input($_POST['publiciseemail']);
  $coordinatorContact = clean_input($_POST['coordinator-contact']);
  $message = clean_input($_POST['message']);
  $group = clean_input($_POST['group']);
  $country = clean_input($_POST['country']);
  $city = clean_input($_POST['city']);
  $groupType = clean_input($_POST['group-type']);
  $groupsContacted = clean_input($_POST['groups-contacted']);
} else {
  // ERR
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Invalid request"]);
  exit();
}

if (!$email) {
  // ERR
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Email is required"]);
  exit();
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  // ERR
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Invalid email"]);
  exit();
}

$body_message = "<h3>Create or Update: " . $operation . "</h3>";
$body_message .= "<h3>Group Name: " . $name . "</h3>";
$body_message .= "<h3>Country: " . $country . "</h3>";
$body_message .= "<h3>City/Town/Village: " . $city . "</h3>";
$body_message .= '<hr/><pre>' . $code . "</pre><hr/>";
$body_message .= '<p/>Group\'s generic email for GS contact :<br> ' . $email . "</p><br>";
$body_message .= '<p/>Would you like this email to be shown publicly as a contact for your group:<br> ' . $publiciseEmail . "</p><br>";
$body_message .= '<p/>Phone number, email, or Mattermost handle of one of the group’s coordinators:<br>' . $coordinatorContact . "</p><br>";
$body_message .= '<p/>Group Type (national, regional or group):<br>' . $groupType . "</p><br>";
$body_message .= '<p/>Have you connected with your XR national coordinators and/or regional liaisons:<br>' . $groupsContacted . "</p><br>";
$body_message .= '<p/>Optional message:<br>' . $message . "</p><br>";

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: ' . $email . "\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";

if ($_SERVER['APP_ENV'] === 'production') {
  $mail_to = 'contact@rebellion.global';
  $subject = 'group ' . $name . ', ' . $country . ' validation for rebellion.global';
  
} else {
  // Change this to your own e-mail...
  $mail_to = 'test@illyism.com';
  $subject = 'Sandbox - group ' . $name . ', ' . $country . ' validation for rebellion.global';
}

$mail_status = mail($mail_to, $subject, $body_message, $headers);

header('Content-Type: application/json;charset=utf-8');

if ($mail_status) {
  // OK
  echo json_encode(['message' => "Message sent"]);
}
else {
  // ERR
  echo json_encode(['error' => "Invalid request"]);
}
