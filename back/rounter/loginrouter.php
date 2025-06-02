<?php
include __DIR__ . "/../controller/loginController.php";

$loginController = new LoginController();

if($_SERVER["REQUEST_METHOD"] == "POST"){
    switch ($_GET["acao"]) {
        case 'validarLogin':
            $resultado = $loginController->ValidaLogin($_POST["nome"], $_POST["senha"]);

            
            if($resultado){
                header("Location: ../../pages/home/index.php");
            }else{
                header("Location: ../../index.php?erro=true");
            }

            break;
        
        default:
            echo "Não achei";
            break;
    }
}


