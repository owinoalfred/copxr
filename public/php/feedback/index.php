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
  $field_handle  = clean_input($_POST['ff_handle']);
  $field_message = clean_input($_POST['ff_message']);
  $field_rating = clean_input($_POST['ff_rating']);
  $ff_path = clean_input($_POST['ff_path']);

} else {
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Invalid request"]);
  exit();
}

if (!$field_handle) {
  // ERR
  header('Content-Type: application/json;charset=utf-8');
  echo json_encode(['error' => "Mattermost handle is required"]);
  exit();
}

$body_message = 'From: '.$field_handle."\n";
$body_message .= 'Path: ' . $ff_path . "\n";
$body_message .= 'Rating: ' . $field_rating . "\n";
$body_message .= 'Message: '.$field_message."\n";

$url = "https://organise.earth/hooks/3b1zbjec93fufe6f7cfoe3zope";
$content = json_encode(["text" => $body_message]);

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER,
        array("Content-type: application/json"));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

$json_response = curl_exec($curl);

if ($json_response) {
  // OK
  echo json_encode(['message' => "Thank you for your feedback"]);
} else {
  // ERR
  echo json_encode(['error' => "Invalid request"]);
}
