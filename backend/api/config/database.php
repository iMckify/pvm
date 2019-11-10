<?php
// used to get mysql database connection
class DatabaseService{

    private $db_host = "localhost";
    private $db_name = "pvm";
    private $db_user = "root";
    private $db_password = "";
    private $charset = 'utf8mb4';
    private $pdo;

    public function getConnection(){

        $this->pdo = null;
        $dsn = "mysql:host=".$this->db_host.";dbname=".$this->db_name.";charset=".$this->charset;
        try{
            $this->pdo = new PDO($dsn, $this->db_user, $this->db_password);
        }catch(PDOException $e){
            echo "Connection failed: ".(int)$e->getCode().",".$e->getMessage();
        }

        return $this->pdo;
    }
}
?>