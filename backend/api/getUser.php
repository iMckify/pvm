<?php
include_once './config/database.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$databaseService = new DatabaseService();
$pdo = $databaseService->getConnection();

$email = '';
$data = file_get_contents("php://input"); // email is req body pasiima
echo $data;


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
?>
