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
if (!isset($_SESSION["quote_attempts"])) {
    $_SESSION["quote_attempts"] = [];
}
$_SESSION["quote_attempts"] = array_values(array_filter(
    $_SESSION["quote_attempts"],
    fn($t) => ($now - $t) < $window
));
if (count($_SESSION["quote_attempts"]) >= $maxAttempts) {
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
$company = $clean($data["company"] ?? "");
$timeline = $clean($data["timeline"] ?? "");
$typeId = $clean($data["typeId"] ?? "");
$loadCapacity = $clean($data["loadCapacity"] ?? "");
$span = $clean($data["spanLength"] ?? "");
$liftHeight = $clean($data["liftHeight"] ?? "");
$dutyClass = $clean($data["dutyClass"] ?? "");
$environment = $clean($data["environment"] ?? "");
$industry = $clean($data["industry"] ?? "");
$hoistType = $clean($data["hoistType"] ?? "");
$controlSystem = $clean($data["controlSystem"] ?? "");
$features = isset($data["features"]) && is_array($data["features"])
    ? implode(", ", array_map($clean, $data["features"]))
    : "None";

// Honeypot: bots fill hidden fields
if (!empty($data["website"]) || !empty($data["company_website"])) {
    echo json_encode(["success" => true, "message" => "Quote request sent successfully."]);
    exit();
}

// Server-side validation
if ($name === "" || $email === "" || $typeId === "" || $loadCapacity === "") {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete quotation data. Name, email, and technical specs are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Please provide a valid email address."]);
    exit();
}

if (!is_numeric($loadCapacity) || (float) $loadCapacity <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Load capacity must be a positive number."]);
    exit();
}

$to = "sales@amtechcranes.com";
$typeLabel = strtoupper(str_replace("-", " ", $typeId));
$subject = "New Quote Request: {$loadCapacity}T {$typeLabel}";

$message = "You have received a new quotation request from the Configurator.\n\n";

$message .= "--- CUSTOMER DETAILS ---\n";
$message .= "Name: " . $name . "\n";
$message .= "Email: " . $email . "\n";
$message .= "Phone: " . ($phone !== "" ? $phone : "N/A") . "\n";
$message .= "Company: " . ($company !== "" ? $company : "N/A") . "\n";
$message .= "Timeline: " . ($timeline !== "" ? $timeline : "N/A") . "\n\n";

$message .= "--- CRANE SPECIFICATIONS ---\n";
$message .= "Type: " . $typeLabel . "\n";
$message .= "Load Capacity: {$loadCapacity} Tons\n";
$message .= "Span: " . ($span !== "" ? $span : "N/A") . " meters\n";
$message .= "Lift Height: " . ($liftHeight !== "" ? $liftHeight : "N/A") . " meters\n";
$message .= "Duty Class: " . ($dutyClass !== "" ? $dutyClass : "N/A") . "\n\n";

$message .= "--- ADDITIONAL OPTIONS ---\n";
$message .= "Industry: " . ($industry !== "" ? $industry : "N/A") . "\n";
$message .= "Hoist Type: " . ($hoistType !== "" ? $hoistType : "Standard") . "\n";
$message .= "Control System: " . ($controlSystem !== "" ? $controlSystem : "Standard") . "\n";
$message .= "Environment: " . ($environment !== "" ? $environment : "Standard") . "\n";
$message .= "Features: " . $features . "\n";

$headers = "From: noreply@amtechcranes.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n"; // email validated above, safe for header use

if (@mail($to, $subject, $message, $headers)) {
    $_SESSION["quote_attempts"][] = $now;
    echo json_encode(["success" => true, "message" => "Quote request sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to send quote request. Mail server issue."]);
}
?>
