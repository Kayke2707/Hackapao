<?php
include __DIR__ . "/../controller/userController.php";

$userController = new UserController();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_GET["acao"]) {
        case 'Cadastrar':
            if (!(empty($_POST['nome']) || empty($_POST["senha"]))) {
                $resultado = $userController->CriarUsuario($_POST["nome"], $_POST["senha"]);
                if ($resultado) {
                    header("Location: ../../pages/home/index.php");
                } else {
                    header("Location: ../../pages/cadastro/index.php?erro=true");
                }
            }else{
                header("Location: ../../pages/cadastro/index.php?erro=true");
            }
            break;

        case "Editar":
            if (!(empty($_POST['nome']) || empty($_POST["senha"]))) {
                $resultado = $userController->UpdateUsuario($_POST["usuarioId"],$_POST["nome"], $_POST["senha"]);
                if ($resultado) {
                    header("Location: ../../pages/home/index.php");
                } else {
                    header("Location: ../../pages/cadastro/index.php?erro=true");
                }
            }else{
                header("Location: ../../pages/cadastro/index.php?erro=true");
            }
            break;
    
        case "Deletar":
            $resultado = $userController->DeleteUser($_POST["idUsuario"]);
            if ($resultado) {
                header("Location: ../../pages/home/index.php");
            } else {
                header("Location: ../../pages/home/index.php?error=true");
            }
            break;
        default:
            echo "Não achei";
            break;
    }
}
