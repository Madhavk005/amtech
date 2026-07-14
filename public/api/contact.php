<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    echo json_encode(["success" => false, "message" => "No data provided."]);
    exit();
}

$to = "sales@amtechcranes.com";
$subject = "New Inquiry from Amtech Website: " . ($data["subject"] ?? "General");

$message = "You have received a new contact form submission.\n\n";
$message .= "Name: " . ($data["name"] ?? "N/A") . "\n";
$message .= "Email: " . ($data["email"] ?? "N/A") . "\n";
$message .= "Phone: " . ($data["phone"] ?? "N/A") . "\n\n";
$message .= "Message:\n" . ($data["message"] ?? "N/A") . "\n";

$headers = "From: noreply@amtechcranes.com\r\n";
if (!empty($data["email"])) {
    $headers .= "Reply-To: " . $data["email"] . "\r\n";
}

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send email. Mail server issue."]);
}
?>
