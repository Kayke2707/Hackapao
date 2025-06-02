<?php

include __DIR__ . "/../db/database.php";

class LoginController{

    private $conn;


    public function __construct(){
        $banco = new Database();
        $this->conn = $banco->connect();
    }


    public function ValidaLogin($nome,$senha){
        $sql = "SELECT * FROM usuarios WHERE nome = :nome AND senha = :senha";
        $db = $this->conn->prepare($sql);
        $db->bindParam(":nome",$nome);
        $db->bindParam(":senha",$senha);
        $db->execute();
        $usuario = $db->fetchAll(PDO::FETCH_ASSOC);
        if($usuario){
            session_start();
            $_SESSION["id_usuario"] = $usuario[0]["id"];
            return true;
        }else{
            return false;
        }

    }

}