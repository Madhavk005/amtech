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
$loadCapacity = $data["loadCapacity"] ?? "Unknown";
$typeId = isset($data["typeId"]) ? strtoupper(str_replace("-", " ", $data["typeId"])) : "Unknown Type";
$subject = "New Quote Request: {$loadCapacity}T {$typeId}";

$message = "You have received a new quotation request from the Configurator.\n\n";

$message .= "--- CUSTOMER DETAILS ---\n";
$message .= "Name: " . ($data["name"] ?? "N/A") . "\n";
$message .= "Email: " . ($data["email"] ?? "N/A") . "\n";
$message .= "Phone: " . ($data["phone"] ?? "N/A") . "\n";
$message .= "Company: " . ($data["company"] ?? "N/A") . "\n";
$message .= "Timeline: " . ($data["timeline"] ?? "N/A") . "\n\n";

$message .= "--- CRANE SPECIFICATIONS ---\n";
$message .= "Type: {$typeId}\n";
$message .= "Load Capacity: {$loadCapacity} Tons\n";
$message .= "Span: " . ($data["span"] ?? "N/A") . " meters\n";
$message .= "Lift Height: " . ($data["liftHeight"] ?? "N/A") . " meters\n";
$message .= "Duty Class: " . ($data["dutyClass"] ?? "N/A") . "\n\n";

$message .= "--- ADDITIONAL OPTIONS ---\n";
$message .= "Hoist Type: " . ($data["hoistType"] ?? "Standard") . "\n";
$message .= "Control System: " . ($data["controlSystem"] ?? "Standard") . "\n";
$message .= "Environment: " . ($data["environment"] ?? "Standard") . "\n";
$message .= "Features: " . (isset($data["features"]) && is_array($data["features"]) ? implode(", ", $data["features"]) : "None") . "\n";

$headers = "From: noreply@amtechcranes.com\r\n";
if (!empty($data["email"])) {
    $headers .= "Reply-To: " . $data["email"] . "\r\n";
}

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Quote request sent successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to send quote request. Mail server issue."]);
}
?>
