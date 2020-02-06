<?php
include_once './config/database.php';
require "./constants/header_status.php"; // header_status(200)

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$databaseService = new DatabaseService();
$pdo = $databaseService->getConnection();

if(strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') != 0){ // idk about method POST or GET
//    http_response_code(405);
    header('HTTP/1.1 401 Unauthorized', true, 401); // idk about status code 
    echo json_encode(
        array(
            "Status"=>http_response_code(),
            "Message"=>'Request method must be GET!'
        )
    );
    die();
}

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if(strcasecmp($contentType, 'application/json') != 0){
//    http_response_code(405);
    header('HTTP/1.1 405 Unauthorized', true, 401)
    echo json_encode(
        array(
            "Status"=>http_response_code(),
            "Message"=>'Content type must be: application/json'
        )
    );
    die();
}

$content = trim(file_get_contents("php://input"));
$email = '';
$decoded = json_decode($content,true); // email is req body pasiima
if(!is_array($decoded)){
    throw new Exception('Received content contained invalid JSON!');
}
// https://thisinterestsme.com/sending-json-via-post-php/
// https://thisinterestsme.com/receiving-json-post-data-via-php/
$data = $decoded;
var_dump($data);
$email = $data->email;

$table_name = 'Users';
$query = "SELECT id FROM " . $table_name . " WHERE email= :email";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':email', $email);
$stmt->execute();
$num = $stmt->rowCount();
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if($num > 0){
    http_response_code(200);
    $id = $row['id'];
    echo json_encode(
        array(
            "id" => $id,
            "email" => $email
        )
    );
} else {
    http_response_code(404);
    echo json_encode(
        array(
            "Status"=>http_response_code(),
            "Message"=>"User not found ".$email
        )
    );
}

