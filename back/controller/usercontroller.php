<?php

include __DIR__ . "/../db/database.php";

class UserController{

    private $conn;


    public function __construct(){
        $banco = new Database();
        $this->conn = $banco->connect();
    }

    public function getAllUser(){
        try {
            $sql = "SELECT * FROM usuarios";
            $db = $this->conn->prepare($sql);
            $db->execute();
            $usuario = $db->fetchAll(PDO::FETCH_ASSOC);
            return $usuario;
        } catch (\Throwable $th) {
        }
    }

    public function CriarUsuario($nome,$senha){
        try {
            $sql = "INSERT INTO usuarios(nome,senha) VALUES(:nome,:senha)";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":nome",$nome);
            $db->bindParam(":senha",$senha);

            if($db->execute()){
                
                $idUsuario = $this->conn->lastInsertId();
                return true;
            }else{
                return false;
            }
        } catch (\Throwable $th) {

        }
    }
    public function getUserById($id){
        try {
            $sql = "SELECT * FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id",$id);
            $db->execute();
            $usuario = $db->fetch(PDO::FETCH_ASSOC);

            if($usuario){
                return $usuario;
            }else{
                return false;
            }
            
        } catch (\Throwable $th) {

        }
    }

    public function UpdateUsuario($id,$nome,$senha){
        try {
            $sql = "UPDATE usuarios SET nome = :nome, senha=:senha WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":nome",$nome);
            $db->bindParam(":senha",$senha);
            $db->bindParam(":id",$id);

            if($db->execute()){
                return true;
            }else{
                return false;
            }
        } catch (\Throwable $th) {

        }
    }
    public function DeleteUser($id){
        try {
            $sql = "DELETE FROM usuarios WHERE id = :id";
            $db = $this->conn->prepare($sql);
            $db->bindParam(":id",$id);
            if($db->execute()){
                return true;
            }else{
                return false;
            }
        } catch (\Throwable $th) {
            
        }
    }
}


