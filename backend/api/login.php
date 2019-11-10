<?php
include_once './config/database.php';
require "../vendor/autoload.php";
use \Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$email = '';
$password = '';

$databaseService = new DatabaseService();
$pdo = $databaseService->getConnection();



$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$table_name = 'Users';

$query = "SELECT id, password FROM " . $table_name . " WHERE email = ? LIMIT 0,1";

$stmt = $pdo->prepare( $query );
$stmt->bindParam(1, $email);
$stmt->execute();
$num = $stmt->rowCount();

if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['id'];
    $password2 = $row['password'];

    if(password_verify($password, $password2))
    {
        $secret_key = "YOUR_SECRET_KEY";
        $issuedat_claim = time(); // issued at
        $expire_claim = $issuedat_claim + 3600; // expire time in seconds
        $token = array(
            "iat" => $issuedat_claim,
            "exp" => $expire_claim,
            "id" => $id,
            "email" => $email
        );

        http_response_code(200);

        $jwt = JWT::encode($token, $secret_key);
        echo json_encode($jwt);
    }
    else{

        http_response_code(401);
        echo json_encode(array("message" => "Login failed.", "password" => $password));
    }
}
?>