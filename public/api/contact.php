<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit();
}

// Simple session-based rate limit: max 5 submissions per 10 minutes
session_start();
$window = 600;
$maxAttempts = 5;
$now = time();
if (!isset($_SESSION["contact_attempts"])) {
    $_SESSION["contact_attempts"] = [];
}
$_SESSION["contact_attempts"] = array_values(array_filter(
    $_SESSION["contact_attempts"],
    fn($t) => ($now - $t) < $window
));
if (count($_SESSION["contact_attempts"]) >= $maxAttempts) {
    http_response_code(429);
    echo json_encode(["success" => false, "message" => "Too many submissions. Please try again later."]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "No data provided."]);
    exit();
}

// Strip CR/LF and control characters to prevent header injection
$clean = function ($value) {
    if (!is_string($value)) return "";
    $value = preg_replace('/[\r\n\0]/', '', (string) $value);
    $value = preg_replace('/[^\x20-\x7E\x80-\xFF]/', '', $value);
    return trim($value);
};

$name = $clean($data["name"] ?? "");
$email = $clean($data["email"] ?? "");
$phone = $clean($data["phone"] ?? "");
$subject = $clean($data["subject"] ?? "General Inquiry");
$message = $clean($data["message"] ?? "");

// Honeypot: bots fill hidden fields
if (!empty($data["website"]) || !empty($data["company_website"])) {
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);
    exit();
}

// Server-side validation
if ($name === "" || $email === "" || $message === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Name, email, and message are required fields."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide a valid email address."]);
    exit();
}

if (strlen($message) < 10) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Message must be at least 10 characters."]);
    exit();
}

$to = "sales@amtechcranes.com";
$subject = "New Inquiry from Amtech Website: " . substr($subject, 0, 120);

$body = "You have received a new contact form submission.\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . ($phone !== "" ? $phone : "N/A") . "\n\n";
$body .= "Message:\n" . $message . "\n";

$headers = "From: noreply@amtechcranes.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n"; // email validated above, safe for header use

if (@mail($to, $subject, $body, $headers)) {
    $_SESSION["contact_attempts"][] = $now;
    echo json_encode(["success" => true, "message" => "Email sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send email. Mail server issue."]);
}
?>
